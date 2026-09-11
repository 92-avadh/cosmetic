-- Add salePriceUSD column to Product table
-- For Diwali offer: salePriceUSD = special price (0 = no sale, use priceUSD)

ALTER TABLE "Product" ADD COLUMN IF NOT EXISTS salePriceUSD FLOAT NOT NULL DEFAULT 0;
