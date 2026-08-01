-- AddProductSkuSpecifications

-- Product.sku and Product.specifications were added to schema.prisma but
-- never captured in a migration; apply them here so a fresh database
-- matches the Prisma schema and the admin product editor can persist specs.
ALTER TABLE "Product" ADD COLUMN IF NOT EXISTS "sku" TEXT;
ALTER TABLE "Product" ADD COLUMN IF NOT EXISTS "specifications" TEXT;
CREATE UNIQUE INDEX IF NOT EXISTS "Product_sku_key" ON "Product"("sku");
