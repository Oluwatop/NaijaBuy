alter table if exists listings add column if not exists amenities text;
create index if not exists listings_property_verification_status_idx on listings(property_verification_status);
