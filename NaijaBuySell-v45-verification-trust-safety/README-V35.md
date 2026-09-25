# NaijaBuy&Sell V35 — Seller Dashboard

Adds the authenticated seller listing workflow:
- Seller Dashboard
- Create listings with price/category/condition/location/description
- Up to 8 photos, 5MB each
- Supabase Storage upload helper
- Listing image records
- Seller listing history/status
- New listings default to pending moderation
- Mobile-friendly interface

Required: private Supabase Storage bucket `listing-images` and appropriate Storage RLS. Never expose a service-role key in browser code.

V35 does not add live payment/escrow processing.