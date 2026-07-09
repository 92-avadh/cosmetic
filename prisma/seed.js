const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seeding...");

  // 1. Create or ensure default category exists
  const skincareCategory = await prisma.category.upsert({
    where: { slug: "skincare" },
    update: {
      name: "Shower & Body Care",
    },
    create: {
      name: "Shower & Body Care",
      slug: "skincare",
    },
  });

  console.log(`✓ Category ensured: ${skincareCategory.name} (${skincareCategory.slug})`);

  // 2. Define core product catalog matching standard store items
  const initialProducts = [
    {
      id: "hydra-foam-cleanser",
      name: "HYDRA-FOAM BODY WASH",
      subtitle: "Active Rejuvenation, Lipid Barrier Support, + 0.5% PDRN & Hyaluronic Acid",
      priceUSD: 40.71856,
      image: "/model.png",
      hoverImage: "/products/texture-gel.png",
      description: "With 0.5% Microspherized PDRN, hyaluronic acid, and pure botanical extracts, it lifts sweat, dirt, and impurities while deeply hydrating, leaving your body skin fresh, supple, and reinforced.",
      inventory: 100,
      categoryId: skincareCategory.id,
    },
    {
      id: "hydra-nutrition-essence",
      name: "HYDRA-NUTRITION BODY GLOW SHOWER OIL",
      subtitle: "Cellular Body Moisture Recovery + PDRN (Salmon DNA) & Amino Acids",
      priceUSD: 75.4491,
      image: "/serum.png",
      hoverImage: "/products/cream-texture.png",
      description: "Advanced cellular recovery shower oil formulated with pure salmon-derived PDRN DNA and bio-active amino acids to lock in moisture and restore dry body skin elasticity during your daily shower.",
      inventory: 80,
      categoryId: skincareCategory.id,
    },
    {
      id: "men-body-wash",
      name: "Derm-Restore Men's Body Wash",
      subtitle: "Deep Cleanse & Lipid Barrier Repair 400ml",
      priceUSD: 38.0,
      image: "/products/men-wash.png",
      hoverImage: "/products/texture-gel.png",
      description: "Advanced lipid barrier recovery body wash formulated specifically for men's thicker skin to cleanse deeply without dryness.",
      inventory: 120,
      categoryId: skincareCategory.id,
    },
    {
      id: "women-body-wash",
      name: "Aura-Glow Women's Body Wash",
      subtitle: "Cellular Recovery & Intense Hydration 400ml",
      priceUSD: 42.0,
      image: "/products/women-wash.png",
      hoverImage: "/products/texture-gel.png",
      description: "Premium pH-balanced body wash infused with micro-nutrients to repair and deeply hydrate women's delicate skin.",
      inventory: 90,
      categoryId: skincareCategory.id,
    },
    {
      id: "unisex-body-wash",
      name: "Bio-Fit Unisex Body Wash",
      subtitle: "Universal Amino Acid Cleanse 400ml",
      priceUSD: 36.0,
      image: "/products/unisex-wash.png",
      hoverImage: "/products/texture-gel.png",
      description: "A universal body wash designed for all skin types, containing natural marine biotics and amino acids for ultimate skin health.",
      inventory: 150,
      categoryId: skincareCategory.id,
    },
    {
      id: "exfoliating-body-wash",
      name: "Dermal-Micro Exfoliating Wash",
      subtitle: "Cellular Resurfacing Body Gel 300ml",
      priceUSD: 40.0,
      image: "/products/exfoliating-wash.png",
      hoverImage: "/products/texture-gel.png",
      description: "A dual-action exfoliating body wash containing biological fruit enzymes and marine minerals to reveal smooth, hydrated skin.",
      inventory: 200,
      categoryId: skincareCategory.id,
    },
  ];

  // 3. Upsert products to prevent duplicates during re-runs
  for (const product of initialProducts) {
    const upserted = await prisma.product.upsert({
      where: { id: product.id },
      update: {
        name: product.name,
        subtitle: product.subtitle,
        priceUSD: product.priceUSD,
        image: product.image,
        hoverImage: product.hoverImage,
        description: product.description,
        inventory: product.inventory,
        categoryId: product.categoryId,
      },
      create: product,
    });
    console.log(`✓ Product upserted: ${upserted.name} (${upserted.id})`);
  }

  // 4. Seed default promo codes
  const defaultPromoCodes = [
    { code: "WELCOME10", discount: 0.10 },
    { code: "FIT20", discount: 0.20 },
    { code: "BODYBARREL30", discount: 0.30 },
  ];

  for (const promo of defaultPromoCodes) {
    const upsertedPromo = await prisma.promoCode.upsert({
      where: { code: promo.code },
      update: {
        discount: promo.discount,
        isActive: true,
      },
      create: promo,
    });
    console.log(`✓ Promo code upserted: ${upsertedPromo.code} (${Math.round(upsertedPromo.discount * 100)}% off)`);
  }

  console.log("✨ Database seeding completed successfully.");
}

main()
  .catch((e) => {
    console.error("❌ Database seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
