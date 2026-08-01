"use client";

import { useState, useRef, useEffect } from "react";
import { useAdminContext, Product } from "../context";
import { Loader2, Upload, Check } from "lucide-react";
import CurtainButton from "@/components/CurtainButton";
import { Button } from "@/components/ui/button";
import { getApiErrorMessage } from "@/lib/utils";
import { useCartStore, CURRENCY_SYMBOLS, CURRENCY_RATES } from "@/store/useCartStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/animate-ui/components/radix/dropdown-menu";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogPopup,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/animate-ui/components/base/alert-dialog";

export default function AdminProductsPage() {
  const {
    products,
    isActionLoading,
    showToast,
    handleCreateProduct,
    handleUpdateProduct,
    handleDeleteProduct,
  } = useAdminContext();

  const { currency } = useCartStore();

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Search local state
  const [productSearch, setProductSearch] = useState("");

  // Product Form states
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newProductSku, setNewProductSku] = useState("");
  const [newProductName, setNewProductName] = useState("");
  const [newProductSubtitle, setNewProductSubtitle] = useState("");
  const [newProductPrice, setNewProductPrice] = useState("");
  const [newProductInventory, setNewProductInventory] = useState("0");
  const [newProductDescription, setNewProductDescription] = useState("");
  const [newProductCategory, setNewProductCategory] = useState("men");
  const [newProductImage, setNewProductImage] = useState("");
  const [newProductHoverImage, setNewProductHoverImage] = useState("");
  const [newProductImages, setNewProductImages] = useState<string[]>([]);
  const [uploadedFileMetadata, setUploadedFileMetadata] = useState<{ name: string; size: number }[]>([]);
  const [uploadingImage, setUploadingImage] = useState(false);
  const STANDARD_PRESETS = [
    { key: "Brand", value: "BODYBARREL" },
    { key: "Product Type", value: "Premium Body Wash" },
    { key: "Volume", value: "300 ml (10.14 fl. oz.)" },
    { key: "Target Audience", value: "Men / Women" },
    { key: "Skin Type", value: "All Skin Types" },
    { key: "Primary Benefits", value: "Deep Cleansing, Hydration, Long-Lasting Freshness, Anti-Tan Care" },
    { key: "Texture", value: "Rich Foaming Gel" },
    { key: "Fragrance", value: "Warm Amber & Woody Notes" },
    { key: "Usage", value: "Apply to wet skin, massage into a rich lather, then rinse thoroughly." },
    { key: "Recommended Use", value: "Daily" },
    { key: "Free From", value: "Parabens, Mineral Oil, Sulfates" },
  ];

  const [specsList, setSpecsList] = useState<{ key: string; value: string }[]>(STANDARD_PRESETS);

  const handleMoveImage = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= newProductImages.length) return;
    const updatedImgs = [...newProductImages];
    const updatedMeta = [...uploadedFileMetadata];

    const [movedImg] = updatedImgs.splice(fromIndex, 1);
    updatedImgs.splice(toIndex, 0, movedImg);

    if (updatedMeta.length === newProductImages.length) {
      const [movedMeta] = updatedMeta.splice(fromIndex, 1);
      updatedMeta.splice(toIndex, 0, movedMeta);
      setUploadedFileMetadata(updatedMeta);
    }

    setNewProductImages(updatedImgs);
  };

  // Sync image and hoverImage whenever newProductImages changes
  useEffect(() => {
    setNewProductImage(newProductImages.join(","));
    setNewProductHoverImage(newProductImages[1] || newProductImages[0] || "");
  }, [newProductImages]);

  const filteredProducts = products.filter((prod) => {
    return (
      prod.name.toLowerCase().includes(productSearch.toLowerCase()) ||
      prod.id.toLowerCase().includes(productSearch.toLowerCase())
    );
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    // 1. Client-side duplicate check
    const filesToUpload: File[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const isDuplicate = uploadedFileMetadata.some(
        (m) => m.name === file.name && m.size === file.size
      );
      if (isDuplicate) {
        showToast(`Warning: '${file.name}' has already been uploaded.`);
        continue;
      }
      filesToUpload.push(file);
    }

    if (filesToUpload.length === 0) return;

    // Filter duplicates in the current selection
    const uniqueFilesToUpload: File[] = [];
    const seenInSelection = new Set<string>();
    for (const file of filesToUpload) {
      const fileKey = `${file.name}-${file.size}`;
      if (seenInSelection.has(fileKey)) {
        continue;
      }
      seenInSelection.add(fileKey);
      uniqueFilesToUpload.push(file);
    }

    // Check count limit
    if (uniqueFilesToUpload.length + newProductImages.length > 5) {
      showToast("Error: Maximum of 5 photos allowed per product.");
      return;
    }

    // 2. Client-side format and size validation
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp", "image/jpg"];
    for (const file of uniqueFilesToUpload) {
      if (file.size > 1 * 1024 * 1024) {
        showToast(`Upload failed: '${file.name}' exceeds the 1 MB size limit.`);
        return;
      }
      if (!allowedTypes.includes(file.type)) {
        showToast(`Upload failed: '${file.name}' has an unsupported format. Only JPEG, PNG, GIF, and WEBP are allowed.`);
        return;
      }
    }

    setUploadingImage(true);
    const formData = new FormData();
    for (const file of uniqueFilesToUpload) {
      formData.append("file", file);
    }

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      let resJson: any;
      try {
        resJson = await res.json();
      } catch {
        resJson = null;
      }

      if (!res.ok) throw new Error(getApiErrorMessage(resJson, "File upload failed"));

      const data = resJson.data || resJson;
      const uploadedUrls = data.urls || (data.url ? [data.url] : []);
      if (uploadedUrls.length === 0) {
        throw new Error(getApiErrorMessage(resJson, "No valid image URL returned from upload."));
      }
      
      // Append new uploaded images and track their metadata
      setNewProductImages((prev) => [...prev, ...uploadedUrls]);
      setUploadedFileMetadata((prev) => [
        ...prev,
        ...uniqueFilesToUpload.map((f) => ({ name: f.name, size: f.size }))
      ]);
      showToast(`Uploaded ${uploadedUrls.length} photo(s) successfully.`);
    } catch (err) {
      console.warn("[UPLOAD FALLBACK]: Using client-side Base64 encoding for storage:", err);
      // Fallback: encode images to Base64 locally so preview and saving never break
      const base64Results: string[] = [];
      for (const file of uniqueFilesToUpload) {
        try {
          const b64 = await new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(file);
          });
          base64Results.push(b64);
        } catch {
          // Ignore single file error
        }
      }
      if (base64Results.length > 0) {
        setNewProductImages((prev) => [...prev, ...base64Results]);
        setUploadedFileMetadata((prev) => [
          ...prev,
          ...uniqueFilesToUpload.map((f) => ({ name: f.name, size: f.size }))
        ]);
        showToast(`Uploaded & encoded ${base64Results.length} photo(s) via Base64.`);
      } else {
        const msg = err instanceof Error ? err.message : String(err);
        showToast(`Upload failed: ${msg}`);
      }
    } finally {
      setUploadingImage(false);
      // Reset input value so same files can be uploaded again if needed
      e.target.value = "";
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProductName || !newProductSubtitle || !newProductPrice || !newProductImage) {
      showToast("Error: Name, subtitle, price and photo are required.");
      return;
    }

    try {
      const validSpecs = specsList.filter((s) => s.key.trim().length > 0 && s.value.trim().length > 0);
      const specsJson = JSON.stringify(validSpecs.length > 0 ? validSpecs : STANDARD_PRESETS);

      // Convert input price in INR (₹) to base USD price for database storage
      const inputPriceINR = parseFloat(newProductPrice);
      const priceUSD = inputPriceINR / CURRENCY_RATES["INR"];

      const payload = {
        sku: newProductSku,
        name: newProductName,
        subtitle: newProductSubtitle,
        priceUSD,
        inventory: parseInt(newProductInventory),
        description: newProductDescription,
        specifications: specsJson,
        image: newProductImage,
        hoverImage: newProductHoverImage,
        categorySlug: newProductCategory,
      };

      if (editingProduct) {
        await handleUpdateProduct({
          id: editingProduct.id,
          ...payload,
        });
        setEditingProduct(null);
      } else {
        await handleCreateProduct(payload);
      }

      // Reset form
      setNewProductSku("");
      setNewProductName("");
      setNewProductSubtitle("");
      setNewProductPrice("");
      setNewProductInventory("0");
      setNewProductDescription("");
      setNewProductCategory("men");
      setNewProductImages([]);
      setUploadedFileMetadata([]);
      setSpecsList(STANDARD_PRESETS);
    } catch {
      // toast is already displayed inside context helpers
    }
  };



  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-line pb-4 gap-3 text-left">
        <div>
          <h3 className="font-display font-semibold text-base uppercase text-ink">Catalog & Inventory</h3>
          <p className="text-[11px] text-muted mt-0.5">Manage body wash formulas and add new custom products.</p>
        </div>
        <input
          type="text"
          placeholder="Search Catalog..."
          value={productSearch}
          onChange={(e) => setProductSearch(e.target.value)}
          className="bg-bg border border-line rounded-xl px-3 py-2 text-[10px] uppercase tracking-wider focus:outline-none focus:border-accent w-48 text-left"
        />
      </div>

      {/* Add/Edit Product Form */}
      <div className="bg-bg/40 border border-line rounded-xl p-5 md:p-6 space-y-6 text-left">
        <h4 className="font-display font-semibold text-xs text-ink uppercase tracking-wider border-b border-line/35 pb-2">
          {editingProduct ? `Edit Formulation (ID: ${editingProduct.id})` : "Upload New Formulation"}
        </h4>

        <form onSubmit={onSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="space-y-2">
              <label className="text-[8px] uppercase tracking-widest font-bold text-ink block">Product Name</label>
              <input
                type="text"
                required
                value={newProductName}
                onChange={(e) => setNewProductName(e.target.value)}
                placeholder="e.g. CELLULAR AMINO BALANCER"
                className="w-full bg-bg border border-line rounded-xl px-3.5 py-2.5 text-xs uppercase tracking-wider focus:outline-none focus:border-accent"
              />
            </div>

            <div className="space-y-2 sm:col-span-2">
              <label className="text-[8px] uppercase tracking-widest font-bold text-ink block">Subtitle / Efficacy Spec</label>
              <input
                type="text"
                required
                value={newProductSubtitle}
                onChange={(e) => setNewProductSubtitle(e.target.value)}
                placeholder="e.g. Skin Barrier Strengthening + 1.2% Lipids and ceramides"
                className="w-full bg-bg border border-line rounded-xl px-3.5 py-2.5 text-xs tracking-wider focus:outline-none focus:border-accent"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-5">
            <div className="space-y-2">
              <label className="text-[8px] uppercase tracking-widest font-bold text-ink block">Price (INR ₹)</label>
              <input
                type="number"
                step="0.01"
                required
                value={newProductPrice}
                onChange={(e) => setNewProductPrice(e.target.value)}
                placeholder="1000"
                className="w-full bg-bg border border-line rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-accent"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[8px] uppercase tracking-widest font-bold text-ink block">Initial Stock Inventory</label>
              <input
                type="number"
                required
                value={newProductInventory}
                onChange={(e) => setNewProductInventory(e.target.value)}
                className="w-full bg-bg border border-line rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-accent"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[8px] uppercase tracking-widest font-bold text-ink block">SKU Code (Optional)</label>
              <input
                type="text"
                placeholder="Auto-generated"
                value={newProductSku}
                onChange={(e) => setNewProductSku(e.target.value)}
                className="w-full bg-bg border border-line rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-accent"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[8px] uppercase tracking-widest font-bold text-ink block">Product Category</label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full bg-bg border border-line rounded-xl px-3.5 py-2.5 text-xs uppercase tracking-wider h-10 justify-between items-center cursor-pointer">
                    <span>
                      {newProductCategory === "men"
                        ? "Men's Collection"
                        : newProductCategory === "women"
                        ? "Women's Collection"
                        : newProductCategory === "unisex"
                        ? "Unisex / Universal"
                        : newProductCategory === "facial"
                        ? "Facial Care"
                        : newProductCategory}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-full">
                  <DropdownMenuItem onClick={() => setNewProductCategory("men")}>Men&apos;s Collection</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setNewProductCategory("women")}>Women&apos;s Collection</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setNewProductCategory("unisex")}>Unisex / Universal</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setNewProductCategory("facial")}>Facial Care</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* File Uploader */}
            <div className="space-y-2">
              <label className="text-[8px] uppercase tracking-widest font-bold text-ink block">Product image photos (Up to 5)</label>
              <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                  ref={fileInputRef}
                />
                <button
                  type="button"
                  disabled={uploadingImage || newProductImages.length >= 5}
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-2 px-3.5 py-2.5 bg-bg border border-line rounded-xl text-[10px] uppercase font-bold tracking-widest hover:border-accent hover:text-accent transition-colors w-full sm:w-auto justify-center cursor-pointer disabled:opacity-50 shrink-0"
                >
                  {uploadingImage ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Upload className="w-3.5 h-3.5" />
                  )}
                  <span>{newProductImages.length > 0 ? `Add Photos (${newProductImages.length}/5)` : "Upload Images"}</span>
                </button>
                <div className="text-[9px] text-muted tracking-wide leading-relaxed text-left">
                  <span className="font-semibold text-ink block">Requirements:</span>
                  <span>JPEG, PNG, GIF, WEBP. Max size: 1 MB per image.</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[8px] uppercase tracking-widest font-bold text-ink block">Description</label>
            <textarea
              value={newProductDescription}
              onChange={(e) => setNewProductDescription(e.target.value)}
              placeholder="Detailed formulation active ingredients, study metrics and clinical results..."
              rows={3}
              className="w-full bg-bg border border-line rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-accent"
            />
          </div>

          {/* Product Specifications Section (Amazon / Flipkart Style) */}
          <div className="space-y-3 border-t border-line/35 pt-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <label className="text-[9px] uppercase tracking-widest font-bold text-ink block">
                  Product Specifications & Features
                </label>
                <p className="text-[10px] text-muted">
                  Add custom key-value features (e.g. Brand, Skin Type, Fragrance, Primary Benefits, Usage).
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setSpecsList(STANDARD_PRESETS)}
                  className="px-3 py-1.5 bg-accent/10 border border-accent/30 text-accent text-[9px] font-bold uppercase tracking-wider rounded-lg hover:bg-accent/20 transition-colors cursor-pointer"
                >
                  Load E-Commerce Presets
                </button>
                <button
                  type="button"
                  onClick={() => setSpecsList((prev) => [...prev, { key: "", value: "" }])}
                  className="px-3 py-1.5 bg-bg border border-line text-ink text-[9px] font-bold uppercase tracking-wider rounded-lg hover:border-accent hover:text-accent transition-colors cursor-pointer"
                >
                  + Add Feature Row
                </button>
                {specsList.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setSpecsList([])}
                    className="px-2.5 py-1.5 bg-red-50/30 border border-red-200 text-red-500 text-[9px] font-bold uppercase tracking-wider rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                  >
                    Clear All
                  </button>
                )}
              </div>
            </div>

            {specsList.length === 0 ? (
              <div className="p-4 bg-bg border border-line/40 rounded-xl text-center">
                <span className="text-[10px] text-muted uppercase tracking-wider block mb-2">
                  No product specifications added yet.
                </span>
                <button
                  type="button"
                  onClick={() => setSpecsList(STANDARD_PRESETS)}
                  className="text-[10px] text-accent font-bold uppercase tracking-widest hover:underline cursor-pointer"
                >
                  Click here to load standard E-Commerce specifications preset
                </button>
              </div>
            ) : (
              <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
                {specsList.map((spec, index) => (
                  <div key={index} className="flex flex-col sm:flex-row gap-2 items-center bg-bg/80 border border-line p-2 rounded-xl">
                    <input
                      type="text"
                      placeholder="Feature Name (e.g. Fragrance)"
                      value={spec.key}
                      onChange={(e) => {
                        const updated = [...specsList];
                        updated[index].key = e.target.value;
                        setSpecsList(updated);
                      }}
                      className="w-full sm:w-1/3 bg-bg border border-line rounded-lg px-3 py-1.5 text-xs font-semibold uppercase tracking-wider focus:outline-none focus:border-accent"
                    />
                    <input
                      type="text"
                      placeholder="Feature Details (e.g. Warm Amber & Woody Notes)"
                      value={spec.value}
                      onChange={(e) => {
                        const updated = [...specsList];
                        updated[index].value = e.target.value;
                        setSpecsList(updated);
                      }}
                      className="w-full sm:w-2/3 bg-bg border border-line rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:border-accent"
                    />
                    <button
                      type="button"
                      onClick={() => setSpecsList(specsList.filter((_, i) => i !== index))}
                      className="px-2 py-1 text-red-500 hover:text-red-600 font-bold text-xs shrink-0 cursor-pointer"
                      title="Remove Row"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Image Previews Box with Re-ordering Controls */}
          {newProductImages.length > 0 && (
            <div className="space-y-3 p-4 bg-bg border border-line rounded-xl w-full">
              <div className="flex items-center justify-between border-b border-line/30 pb-2">
                <span className="text-[9px] uppercase tracking-widest font-bold text-ink">
                  Product Image Order ({newProductImages.length}/5)
                </span>
                <span className="text-[9px] text-muted">
                  Photo 1 is automatically used as the primary main cover image.
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                {newProductImages.map((imgUrl, idx) => (
                  <div
                    key={idx}
                    className={`flex flex-col p-2.5 bg-bg border rounded-xl relative transition-all ${
                      idx === 0 ? "border-accent ring-1 ring-accent/30 bg-accent/5" : "border-line"
                    }`}
                  >
                    <div className="relative aspect-[3/4] w-full border border-line rounded overflow-hidden mb-2 bg-card-bg">
                      <img
                        src={imgUrl}
                        alt={`Photo ${idx + 1}`}
                        width={120}
                        height={160}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover"
                      />
                      <span
                        className={`absolute top-1 left-1 text-[7.5px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${
                          idx === 0 ? "bg-accent text-bg" : "bg-bg/90 text-ink border border-line"
                        }`}
                      >
                        {idx === 0 ? "★ 1st (Main)" : `#${idx + 1} Photo`}
                      </span>
                    </div>

                    <div className="flex flex-col gap-1.5 mt-auto text-[8.5px] uppercase font-bold tracking-wider">
                      <div className="flex items-center justify-between gap-1">
                        <button
                          type="button"
                          disabled={idx === 0}
                          onClick={() => handleMoveImage(idx, idx - 1)}
                          className="px-2 py-1 bg-bg border border-line rounded hover:border-accent hover:text-accent disabled:opacity-30 cursor-pointer flex-1 text-center"
                          title="Move Left"
                        >
                          ← Left
                        </button>
                        <button
                          type="button"
                          disabled={idx === newProductImages.length - 1}
                          onClick={() => handleMoveImage(idx, idx + 1)}
                          className="px-2 py-1 bg-bg border border-line rounded hover:border-accent hover:text-accent disabled:opacity-30 cursor-pointer flex-1 text-center"
                          title="Move Right"
                        >
                          Right →
                        </button>
                      </div>

                      {idx > 0 && (
                        <button
                          type="button"
                          onClick={() => handleMoveImage(idx, 0)}
                          className="w-full px-2 py-1 bg-accent/10 border border-accent/30 text-accent rounded hover:bg-accent/20 cursor-pointer text-center text-[7.5px]"
                        >
                          Set as 1st (Main)
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => {
                          setNewProductImages((prev) => prev.filter((_, i) => i !== idx));
                          setUploadedFileMetadata((prev) => prev.filter((_, i) => i !== idx));
                        }}
                        className="w-full px-2 py-1 text-red-500 hover:text-red-600 font-bold border border-red-200/50 bg-red-50/20 rounded cursor-pointer transition-colors text-center mt-0.5"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="pt-2 flex justify-end gap-3">
            {editingProduct && (
              <button
                type="button"
                onClick={() => {
                  setEditingProduct(null);
                  setNewProductSku("");
                  setNewProductName("");
                  setNewProductSubtitle("");
                  setNewProductPrice("");
                  setNewProductInventory("0");
                  setNewProductDescription("");
                  setNewProductImages([]);
                  setUploadedFileMetadata([]);
                  setNewProductCategory("men");
                  setSpecsList(STANDARD_PRESETS);
                }}
                className="px-6 py-3.5 text-ink border border-line bg-transparent text-[10px] font-bold tracking-widest uppercase cursor-pointer"
              >
                Cancel Edit
              </button>
            )}
            <CurtainButton
              type="submit"
              disabled={isActionLoading || uploadingImage}
              className="px-8 py-3.5 text-ink border border-ink bg-transparent text-[10px] font-bold tracking-widest uppercase flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isActionLoading ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Check className="w-3.5 h-3.5" />
              )}
              <span>{editingProduct ? "Save Product Changes" : "Upload Product to Catalog"}</span>
            </CurtainButton>
          </div>
        </form>
      </div>

      {/* Catalog list */}
      <div className="space-y-4 text-left">
        <h4 className="font-display font-semibold text-xs text-ink uppercase tracking-wider">Catalog Inventory Overview</h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredProducts.map((prod) => (
            <div key={prod.id} className="p-4 bg-bg/40 border border-line rounded-xl flex gap-4 hover:border-accent/40 transition-colors">
              <div className="w-16 h-20 bg-card-bg border border-line/50 rounded overflow-hidden shrink-0 select-none">
                <img src={prod.image} alt={prod.name} width={40} height={48} loading="lazy" decoding="async" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0 flex flex-col justify-between">
                <div className="space-y-1">
                  <div className="flex flex-wrap gap-2 text-[7.5px] uppercase tracking-widest font-bold">
                    <span className="text-accent">ID: {prod.id}</span>
                    {prod.sku && <span className="text-muted">| SKU: {prod.sku}</span>}
                  </div>
                  <h5 className="font-display font-bold text-xs uppercase text-ink truncate leading-tight">{prod.name}</h5>
                  <p className="text-[9px] text-muted truncate">{prod.subtitle}</p>
                </div>

                <div className="border-t border-line/30 pt-2 flex items-center justify-between text-[9px] uppercase font-semibold">
                  <span className="text-ink/80">Stock: <span className="font-bold text-ink">{prod.inventory} units</span></span>
                  <span className="text-accent font-bold">
                    {CURRENCY_SYMBOLS[currency]}
                    {(prod.priceUSD * CURRENCY_RATES[currency]).toLocaleString(undefined, {
                      minimumFractionDigits: currency === "KRW" ? 0 : 2,
                      maximumFractionDigits: currency === "KRW" ? 0 : 2,
                    })}
                  </span>
                </div>
                <div className="flex gap-2 justify-end mt-2 pt-2 border-t border-line/10">
                  <button
                    onClick={() => {
                      setEditingProduct(prod);
                      setNewProductSku(prod.sku || "");
                      setNewProductName(prod.name);
                      setNewProductSubtitle(prod.subtitle);
                      const priceInINR = Math.round(prod.priceUSD * CURRENCY_RATES["INR"]);
                      setNewProductPrice(String(priceInINR));
                      setNewProductInventory(String(prod.inventory));
                      setNewProductDescription(prod.description || "");
                      const imgs = prod.image ? prod.image.split(",") : [];
                      setNewProductImages(imgs);
                      setUploadedFileMetadata([]);
                      setNewProductCategory(prod.Category?.slug || "men");
                      try {
                        if (prod.specifications) {
                          const parsed = typeof prod.specifications === "string" ? JSON.parse(prod.specifications) : prod.specifications;
                          if (Array.isArray(parsed) && parsed.length > 0) {
                            setSpecsList(parsed);
                          } else {
                            setSpecsList(STANDARD_PRESETS);
                          }
                        } else {
                          setSpecsList(STANDARD_PRESETS);
                        }
                      } catch {
                        setSpecsList(STANDARD_PRESETS);
                      }
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="px-3 py-1 bg-bg border border-line rounded text-[8px] font-bold tracking-wider hover:border-accent hover:text-accent transition-colors cursor-pointer"
                  >
                    Edit
                  </button>
                  <AlertDialog>
                    <AlertDialogTrigger
                      render={
                        <button className="px-3 py-1 bg-red-50/20 text-red-500 border border-red-200/55 rounded text-[8px] font-bold tracking-wider hover:bg-red-50 hover:border-red-500 hover:text-red-600 transition-colors cursor-pointer">
                          Delete
                        </button>
                      }
                    />
                    <AlertDialogPopup from="bottom" className="sm:max-w-[425px]">
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete product &ldquo;{prod.name}&rdquo;? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={async () => {
                            await handleDeleteProduct(prod.id, prod.name);
                            if (editingProduct?.id === prod.id) {
                              setEditingProduct(null);
                            }
                          }}
                          className="bg-red-500 hover:bg-red-600 text-white"
                        >
                          Delete Product
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogPopup>
                  </AlertDialog>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
