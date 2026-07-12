"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { useCartStore, CURRENCY_SYMBOLS, CURRENCY_RATES } from "@/store/useCartStore";
import { useUserStore } from "@/store/useUserStore";
import { getApiErrorMessage } from "@/lib/utils";
import { Plus, Minus, ArrowLeft, ShieldCheck, ChevronLeft, ChevronRight } from "lucide-react";
import CurtainButton from "@/components/CurtainButton";

interface ProductDetailClientProps {
  product: {
    id: string;
    name: string;
    subtitle: string;
    priceUSD: number;
    image: string;
    hoverImage?: string | null;
    description?: string | null;
    inventory: number;
  };
  recommendations: any[];
}

export default function ProductDetailClient({ product, recommendations }: ProductDetailClientProps) {
  const router = useRouter();
  const { addItem, currency } = useCartStore();

  const images = [
    ...(product.image ? product.image.split(",") : []),
    ...(product.hoverImage && !product.image.includes(product.hoverImage) ? [product.hoverImage] : [])
  ];

  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState<string>(images[0] || product.image);
  const [activeTab, setActiveTab] = useState<string>("science");

  // Reviews Integration
  const { user, isLoggedIn } = useUserStore();
  const [reviewsList, setReviewsList] = useState<any[]>([]);
  const [reviewStats, setReviewStats] = useState({ count: 0, average: 0 });

  const [newRating, setNewRating] = useState(5);
  const [newName, setNewName] = useState("");
  const [newComment, setNewComment] = useState("");
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [reviewError, setReviewError] = useState<string | null>(null);

  const fetchReviews = async () => {
    try {
      const res = await fetch(`/api/products/${product.id}/reviews`);
      if (res.ok) {
        const data = await res.json();
        setReviewsList(data.reviews || []);
        setReviewStats(data.stats || { count: 0, average: 0 });
      }
    } catch (err) {
      console.error("Error loading reviews:", err);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [product.id]);

  useEffect(() => {
    if (isLoggedIn && user?.email) {
      const prefillName = user.email.split("@")[0];
      setNewName(prefillName);
    }
  }, [isLoggedIn, user]);

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newComment.trim()) {
      setReviewError("Please fill out both Name and Comment fields.");
      return;
    }
    setIsSubmittingReview(true);
    setReviewError(null);
    try {
      const res = await fetch(`/api/products/${product.id}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userName: newName,
          rating: newRating,
          comment: newComment,
          userId: null,
        }),
      });
      const resJson = await res.json();
      if (!res.ok) {
        throw new Error(getApiErrorMessage(resJson, "Failed to submit review."));
      }
      setNewComment("");
      setNewRating(5);
      await fetchReviews();
    } catch (err: any) {
      setReviewError(err.message || "Failed to submit review.");
    } finally {
      setIsSubmittingReview(false);
    }
  };

  const handlePrevImage = () => {
    const currentIndex = images.indexOf(activeImage);
    if (currentIndex > 0) {
      setActiveImage(images[currentIndex - 1]);
    } else {
      setActiveImage(images[images.length - 1]);
    }
  };

  const handleNextImage = () => {
    const currentIndex = images.indexOf(activeImage);
    if (currentIndex < images.length - 1) {
      setActiveImage(images[currentIndex + 1]);
    } else {
      setActiveImage(images[0]);
    }
  };

  const getVolumeText = (id: string) => {
    switch (id) {
      case "hydra-foam-cleanser":
        return "3.38 Fl.Oz / 100 ml";
      case "hydra-nutrition-essence":
        return "1.01 Fl.Oz / 30 ml";
      case "exfoliating-body-wash":
        return "10.14 Fl.Oz / 300 ml";
      default:
        return "13.52 Fl.Oz / 400 ml";
    }
  };

  const volumeText = getVolumeText(product.id);

  const convertedPrice = product.priceUSD * CURRENCY_RATES[currency];
  const priceString = `${CURRENCY_SYMBOLS[currency]}${convertedPrice.toLocaleString(
    undefined,
    {
      minimumFractionDigits: currency === "KRW" ? 0 : 2,
      maximumFractionDigits: currency === "KRW" ? 0 : 2,
    }
  )}`;

  const handleAdd = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.priceUSD,
        image: product.image,
        subtitle: product.subtitle,
      });
    }
    setQuantity(1);
  };

  const handleBuyNow = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.priceUSD,
        image: product.image,
        subtitle: product.subtitle,
      });
    }
    useCartStore.setState({ isCartOpen: false });
    router.push("/checkout");
  };

  const productTabs = [
    {
      id: "science",
      label: "Formula Science",
      content:
        product.id === "men-body-wash"
          ? "Formulated specifically for the structural thickness and higher sebum indices of male skin. Contains activated charcoal minerals and lipid-replenishing ceramides that lock in moisture post-exercise. Accelerates surface restoration while neutralizing stress parameters."
          : product.id === "women-body-wash"
          ? "Designed for delicate barrier membranes prone to thermal moisture loss. Infused with micro-nutrients, rose hydrosol, and Phyto-Stem Cells to stimulate collagen recovery and cellular density. Repairs moisture depletion within 14 days."
          : product.id === "exfoliating-body-wash"
          ? "A biochemical dual-action exfoliating wash. Utilizes non-abrasive fruit enzymes and fine volcanic mineral dust to dissolve keratin bonds, smooth roughness, and trigger cellular speed. Perfect for hyperkeratosis and textured skin profiles."
          : "A universal pH-balanced skin recovery formula. Contains high-potency marine PDRN, amino acids, and centella extract. Operates at a molecular level to calm inflammation and secure the cellular structure of dry and sensitive skin.",
    },
    {
      id: "ingredients",
      label: "Full Disclosures",
      content:
        "Active Compounds: Wild Marine PDRN (1.8%), Micro-Ceramides (3.0%), Phyto-Stem Cell Cultures (2.5%), Amino Acid Complex (4.0%), Centella Asiatica Extract (12.5%). Free from: Sulfates, parabens, silicones, micro-plastics, synthetic colorants, and synthetic fragrances. 100% Biodegradable surfactants.",
    },
    {
      id: "protocol",
      label: "Usage Protocol",
      content:
        "Lather 2-3 pumps onto wet body skin. Massage continuously for 60 seconds, allowing the bio-active molecules to bind with cellular lipids and deposit moisture barriers. Rinse thoroughly with lukewarm water. Follow immediately with body serum to lock in recovery.",
    },
    {
      id: "reviews",
      label: `Reviews (${reviewStats.count})`,
      content: "",
    },
  ];

  return (
    <>
      <Nav />
      <main className="bg-bg text-ink min-h-screen pt-32 pb-24 font-sans">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-semibold text-muted">
              <li>
                <Link href="/" className="hover:text-accent transition-colors">Home</Link>
              </li>
              <li aria-hidden="true" className="text-line">/</li>
              <li>
                <Link href="/shop" className="hover:text-accent transition-colors">Shop</Link>
              </li>
              <li aria-hidden="true" className="text-line">/</li>
              <li aria-current="page" className="text-ink">{product.name}</li>
            </ol>
          </nav>

          {/* Back button */}
          <Link
            href="/shop"
            className="flex items-center space-x-2 text-xs uppercase tracking-widest font-bold text-muted hover:text-accent transition-colors mb-12 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Collection</span>
          </Link>

          {/* Product Layout Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Gallery Column */}
            <div className="lg:col-span-6 space-y-6">
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-card-bg border border-line rounded-2xl flex items-center justify-center p-8 select-none">
                {/* Brand Overlay Badge */}
                <div className="absolute top-4 left-4 bg-bg/90 backdrop-blur-sm px-3 py-1 border border-line/45 text-[8px] md:text-[9px] tracking-[0.25em] font-bold text-ink uppercase z-10 rounded-[2px]">
                  BODYBARREL
                </div>

                <img
                  src={activeImage}
                  alt={`BODYBARREL - ${product.name}`}
                  width={800}
                  height={800}
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />

                {/* Navigation Chevrons Overlay (Image 2 design) */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-bg/75 border border-line rounded-[3px] hover:bg-bg transition-colors cursor-pointer"
                      aria-label="Previous Image"
                    >
                      <ChevronLeft className="w-4 h-4 text-ink" />
                    </button>
                    <button
                      onClick={handleNextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-bg/75 border border-line rounded-[3px] hover:bg-bg transition-colors cursor-pointer"
                      aria-label="Next Image"
                    >
                      <ChevronRight className="w-4 h-4 text-ink" />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnails indicator */}
              {images.length > 1 && (
                <div className="flex gap-2 justify-center pt-2">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(img)}
                      className={`w-12 h-16 rounded border overflow-hidden transition-all ${
                        activeImage === img ? "border-accent scale-105" : "border-line opacity-60 hover:opacity-100"
                      }`}
                    >
                      <img src={img} alt={`${product.name} thumbnail`} width={48} height={64} loading="lazy" decoding="async" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Configuration Column */}
            <div className="lg:col-span-6 space-y-8 lg:sticky lg:top-32">
              <div className="space-y-4">
                <h1 className="font-display font-semibold text-3xl sm:text-5xl uppercase tracking-tight text-ink leading-none">
                  {product.name}
                </h1>
                
                <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-ink/75 block leading-relaxed max-w-lg">
                  {product.subtitle}
                </span>

                {/* Star rating summary */}
                <div className="flex items-center space-x-2 text-xs font-semibold pt-1">
                  <div className="flex text-accent">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i} className="text-sm">
                        {i < Math.round(reviewStats.average) ? "★" : "☆"}
                      </span>
                    ))}
                  </div>
                  <span className="text-ink/80 pt-0.5">
                    {reviewStats.average > 0 ? `${reviewStats.average} (${reviewStats.count} reviews)` : "No reviews yet"}
                  </span>
                </div>

                <div className="pt-2">
                  <span className="text-2xl font-semibold text-ink">{priceString}</span>
                </div>
              </div>

              {/* Volume Selection Pill */}
              <div className="space-y-2">
                <span className="text-[9px] text-muted uppercase tracking-widest font-semibold block">Volume:</span>
                <span className="inline-block text-[10px] font-semibold px-4 py-2 bg-[#e8c5c1]/10 text-accent border border-[#e8c5c1]/35 rounded-[3px] select-none uppercase tracking-widest">
                  {volumeText}
                </span>
              </div>

              {/* Stepper and Add to Cart Action Row */}
              <div className="pt-6 border-t border-line/45">
                <div className="flex items-center space-x-4">
                  {/* Rectangular Stepper matching screenshot */}
                  <div className="flex items-center border border-line rounded-[3px] overflow-hidden bg-transparent h-[46px]">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="px-4 text-ink hover:text-accent font-semibold transition-colors h-full flex items-center justify-center cursor-pointer border-r border-line bg-transparent"
                      aria-label="Decrease Quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-12 text-center text-xs font-semibold text-ink select-none font-mono h-full flex items-center justify-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="px-4 text-ink hover:text-accent font-semibold transition-colors h-full flex items-center justify-center cursor-pointer border-l border-line bg-transparent"
                      aria-label="Increase Quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <CurtainButton
                    onClick={handleAdd}
                    className="flex-1 text-ink border border-ink bg-transparent text-[11px] font-semibold py-4.5 px-4 rounded-[3px] uppercase tracking-[0.2em] h-[46px] flex items-center justify-center cursor-pointer"
                  >
                    <span>ADD TO BAG</span>
                  </CurtainButton>

                  <CurtainButton
                    onClick={handleBuyNow}
                    className="flex-1 text-[#2d1c14] border border-[#2d1c14] bg-transparent text-[11px] font-semibold py-4.5 px-4 rounded-[3px] uppercase tracking-[0.2em] h-[46px] flex items-center justify-center cursor-pointer"
                  >
                    <span>BUY NOW</span>
                  </CurtainButton>
                </div>
              </div>

              {/* Product Sourcing Description (below actions) */}
              <div className="pt-6 border-t border-line/45 space-y-4">
                <p className="text-xs sm:text-sm text-muted leading-relaxed max-w-xl">
                  {product.description || "With 0.5% Microspherized PDRN, hyaluronic acid, and natural plant based ingredients, it lifts sweat, oil, and buildup while calming, hydrating, and supporting the skin barrier."}
                </p>
              </div>

              {/* Accordion Tabs */}
              <div className="pt-8 border-t border-line/45 space-y-4">
                <div className="flex space-x-6 border-b border-line pb-2">
                  {productTabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`text-xs uppercase tracking-widest font-semibold pb-2 border-b-2 bg-transparent border-none transition-all cursor-pointer ${
                        activeTab === tab.id
                          ? "border-accent border-b-2 text-accent font-bold"
                          : "border-transparent text-muted hover:text-ink"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
                <div className="text-xs sm:text-sm text-muted leading-relaxed min-h-[80px] animate-fade-in">
                  {activeTab === "reviews" ? (
                    <div className="space-y-8 py-4">
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                        {/* Left: Reviews List */}
                        <div className="md:col-span-7 space-y-6">
                          <h4 className="text-xs uppercase tracking-widest font-bold text-ink mb-4">
                            Customer Reviews ({reviewsList.length})
                          </h4>
                          
                          {reviewsList.length === 0 ? (
                            <p className="text-xs text-muted italic">No reviews yet for this product. Be the first to share your experience!</p>
                          ) : (
                            <div className="space-y-5 max-h-[450px] overflow-y-auto pr-2 divide-y divide-line/35">
                              {reviewsList.map((rev) => (
                                <div key={rev.id} className="pt-5 first:pt-0 space-y-2">
                                  <div className="flex items-center justify-between text-xs">
                                    <span className="font-semibold text-ink uppercase tracking-wide">{rev.userName}</span>
                                    <span className="text-[10px] text-muted">{new Date(rev.createdAt).toLocaleDateString()}</span>
                                  </div>
                                  <div className="flex text-accent text-xs">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                      <span key={i} className="text-sm">
                                        {i < rev.rating ? "★" : "☆"}
                                      </span>
                                    ))}
                                  </div>
                                  <p className="text-xs text-muted leading-relaxed whitespace-pre-wrap">{rev.comment}</p>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Right: Submit Review Form */}
                        <div className="md:col-span-5 border border-line/65 rounded-xl p-5 bg-card-bg/25 space-y-5">
                          <h4 className="text-xs uppercase tracking-widest font-bold text-ink">
                            Write a Review
                          </h4>

                          <form onSubmit={handleReviewSubmit} className="space-y-4">
                            {reviewError && (
                              <p className="text-rose-600 font-medium text-[10px] uppercase tracking-wider">{reviewError}</p>
                            )}

                            {/* Name */}
                            <div className="space-y-1">
                              <label className="text-[9px] uppercase tracking-widest font-semibold text-muted block">Your Name</label>
                              <input
                                type="text"
                                required
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                                placeholder="e.g. Arjun S."
                                className="w-full bg-bg/50 border border-line rounded px-3 py-2 text-xs text-ink focus:outline-none focus:border-accent"
                              />
                            </div>

                            {/* Rating Stars Selection */}
                            <div className="space-y-1">
                              <label className="text-[9px] uppercase tracking-widest font-semibold text-muted block mb-1">Your Rating</label>
                              <div className="flex items-center space-x-1 text-lg">
                                {Array.from({ length: 5 }).map((_, idx) => {
                                  const starVal = idx + 1;
                                  return (
                                    <button
                                      key={idx}
                                      type="button"
                                      onClick={() => setNewRating(starVal)}
                                      className="hover:scale-110 transition-transform cursor-pointer border-none bg-transparent p-0 text-accent text-sm"
                                    >
                                      {starVal <= newRating ? "★" : "☆"}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>

                            {/* Comment */}
                            <div className="space-y-1">
                              <label className="text-[9px] uppercase tracking-widest font-semibold text-muted block">Thoughts</label>
                              <textarea
                                required
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                placeholder="Share your experience with the body wash texture, foaming, or skin feels..."
                                rows={4}
                                className="w-full bg-bg/50 border border-line rounded p-3 text-xs text-ink focus:outline-none focus:border-accent"
                              />
                            </div>

                            <CurtainButton
                              type="submit"
                              disabled={isSubmittingReview}
                              className="w-full py-3 text-bg border-accent bg-accent text-[9px] font-bold tracking-widest uppercase rounded-[3px] flex items-center justify-center cursor-pointer"
                            >
                              <span>{isSubmittingReview ? "Submitting..." : "Submit Review"}</span>
                            </CurtainButton>
                          </form>
                        </div>
                      </div>
                    </div>
                  ) : (
                    productTabs.find((t) => t.id === activeTab)?.content
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Related/Recommendations row */}
          <section className="mt-28 border-t border-line/60 pt-20">
            <div className="mb-12">
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-accent block mb-2">
                Biological Layering
              </span>
              <h2 className="font-display font-semibold text-2xl md:text-3xl uppercase tracking-tight text-ink">
                COMPLETE YOUR SKIN REGIMEN
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {recommendations.map((recProduct) => (
                <ProductCard key={recProduct.id} {...recProduct} />
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
