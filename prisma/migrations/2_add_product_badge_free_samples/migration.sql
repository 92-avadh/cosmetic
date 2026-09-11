-- Add badge and freeSamples columns to Product table
-- For Diwali offer: badge = 'DIWALI' | 'DISCOUNT' | 'FREE' | 'BUNDLE' | 'SAMPLE'
-- freeSamples = comma-separated product IDs included as free 15ml samples

ALTER TABLE "Product" ADD COLUMN IF NOT EXISTS badge TEXT NOT NULL DEFAULT '';
ALTER TABLE "Product" ADD COLUMN IF NOT EXISTS freeSamples TEXT NOT NULL DEFAULT '';
