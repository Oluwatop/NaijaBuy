-- V41: property enquiry/favorites hardening
create index if not exists conversations_listing_idx on conversations(listing_id);
create index if not exists favorites_listing_idx on favorites(listing_id);
-- Production RLS should ensure conversation participants can read/write only their conversations and messages.
