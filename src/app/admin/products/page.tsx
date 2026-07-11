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
  const [newProductInventory, setNewProductInventory] = useState("100");
  const [newProductDescription, setNewProductDescription] = useState("");
  const [newProductCategory, setNewProductCategory] = useState("skincare");
  const [newProductImage, setNewProductImage] = useState("");
  const [newProductHoverImage, setNewProductHoverImage] = useState("");
  const [newProductImages, setNewProductImages] = useState<string[]>([]);
  const [uploadingImage, setUploadingImage] = useState(false);

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

    if (files.length + newProductImages.length > 5) {
      showToast("Error: Maximum of 5 photos allowed per product.");
      return;
    }

    // Client-side validation: format and size
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp", "image/jpg"];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
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
    for (let i = 0; i < files.length; i++) {
      formData.append("file", files[i]);
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

      const data = resJson.data;
      const uploadedUrls = data.urls || [data.url];
      
      // Append new uploaded images to existing list
      setNewProductImages((prev) => [...prev, ...uploadedUrls]);
      showToast(`Uploaded ${uploadedUrls.length} photo(s) successfully.`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      showToast(`Upload failed: ${msg}`);
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
      const payload = {
        sku: newProductSku,
        name: newProductName,
        subtitle: newProductSubtitle,
        priceUSD: parseFloat(newProductPrice),
        inventory: parseInt(newProductInventory),
        description: newProductDescription,
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
      setNewProductInventory("100");
      setNewProductDescription("");
      setNewProductCategory("skincare");
      setNewProductImages([]);
    } catch {
      // toast is already displayed inside context helpers
    }
  };



  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-line pb-4 gap-3 text-left">
        <div>
          <h3 className="font-display font-semibold text-base uppercase text-ink">Catalog & Inventory</h3>
          <p className="text-[11px] text-muted mt-0.5">Manage skincare formulas and add new custom products.</p>
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
          {editingProduct ? `Edit Formulation (ID: ${editingProduct.id})` : "Inject New Formulation"}
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
              <label className="text-[8px] uppercase tracking-widest font-bold text-ink block">Price (USD)</label>
              <input
                type="number"
                step="0.01"
                required
                value={newProductPrice}
                onChange={(e) => setNewProductPrice(e.target.value)}
                placeholder="45.00"
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
              <label className="text-[8px] uppercase tracking-widest font-bold text-ink block">System category</label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full bg-bg border border-line rounded-xl px-3.5 py-2.5 text-xs uppercase tracking-wider h-10 justify-between items-center cursor-pointer">
                    <span>{newProductCategory === "skincare" ? "Skincare System" : "Bodycare System"}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-full">
                  <DropdownMenuItem onClick={() => setNewProductCategory("skincare")}>Skincare System</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setNewProductCategory("bodycare")}>Bodycare System</DropdownMenuItem>
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

          {/* Image Previews Box */}
          {newProductImages.length > 0 && (
            <div className="flex flex-wrap gap-4 items-center p-3 bg-bg border border-line rounded-xl w-full">
              {newProductImages.map((imgUrl, idx) => (
                <div key={idx} className="flex gap-3 items-center p-2.5 bg-bg border border-line rounded-xl relative">
                  <div className="w-14 h-16 border border-line rounded overflow-hidden relative shrink-0">
                    <img src={imgUrl} className="w-full h-full object-cover" alt={`Preview ${idx + 1}`} />
                  </div>
                  <div className="text-[9px] uppercase tracking-wider text-muted space-y-1">
                    <span className="font-bold text-ink block">Photo {idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => setNewProductImages((prev) => prev.filter((_, i) => i !== idx))}
                      className="text-red-500 hover:text-red-600 font-bold block cursor-pointer transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
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
                  setNewProductInventory("100");
                  setNewProductDescription("");
                  setNewProductImages([]);
                  setNewProductCategory("skincare");
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
              <span>{editingProduct ? "Save Product Changes" : "Inject Product to Catalog"}</span>
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
                <img src={prod.image} className="w-full h-full object-cover" alt={prod.name} />
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
                      setNewProductPrice(String(prod.priceUSD));
                      setNewProductInventory(String(prod.inventory));
                      setNewProductDescription(prod.description || "");
                      const imgs = prod.image ? prod.image.split(",") : [];
                      setNewProductImages(imgs);
                      setNewProductCategory(prod.Category?.slug || "skincare");
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
