-- V37: Real Estate + Seller Verification
-- Run after the V32 schema. Adjust enum/check constraints if your existing schema uses enums.

alter table public.listings
  add column if not exists property_type text,
  add column if not exists listing_purpose text,
  add column if not exists bedrooms integer,
  add column if not exists bathrooms numeric,
  add column if not exists land_size text,
  add column if not exists property_address text,
  add column if not exists furnished boolean default false;

alter table public.seller_profiles
  add column if not exists verification_status text default 'unverified',
  add column if not exists verification_level text default 'basic',
  add column if not exists verified_at timestamptz,
  add column if not exists bio text;

create index if not exists listings_property_type_idx on public.listings(property_type);
create index if not exists listings_listing_purpose_idx on public.listings(listing_purpose);
create index if not exists listings_real_estate_idx on public.listings(category) where category = 'Real Estate & Properties';

-- Suggested values:
-- property_type: House, Apartment/Flat, Land, Office/Commercial, Shop, Warehouse, Estate/Development, Short-let
-- listing_purpose: For Sale, For Rent, For Lease
-- verification_status: unverified, pending, verified, failed, suspended
