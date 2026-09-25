# NaijaBuy&Sell V44 — Admin Control Center

Added:
- Protected admin control center
- Admin role check before dashboard access
- User/listing/property/order overview counts
- Protected and disputed order counts
- Links to moderation and verification tools
- Admin security guidance
- Admin audit-log schema foundation

Important:
- Browser role checks are not sufficient by themselves; enforce authorization with RLS and trusted server-side functions/endpoints.
- Do not put service-role keys or payment secrets in the browser.
- Release/refund controls should require appropriate high-level permissions and audit logging.
- Protected payment/escrow remains disabled until a compliant regulated structure/provider is selected.
