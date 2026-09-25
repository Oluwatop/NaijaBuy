# NaijaBuy&Sell V43 — Unified Dashboard

Added:
- Unified buyer/seller/property dashboard
- Account welcome area
- Order count
- Listing count
- Saved property count
- Unread notification count
- Quick links for selling, property listing, messages and notifications
- Buyer orders page foundation
- Responsive mobile layout

Production notes:
- Counts are loaded from Supabase for the signed-in user.
- Keep RLS enabled on every table.
- Order visibility must remain restricted to buyer/seller/admin roles.
- Notification and message permissions must remain participant/recipient scoped.
- Payment/escrow remains disabled until a compliant provider and structure are selected.
