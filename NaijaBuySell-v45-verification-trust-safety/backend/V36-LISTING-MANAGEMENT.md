# V36 Listing Management + Moderation

Added:
- Seller My Listings page
- Edit listing
- Delete listing using a soft-delete status
- Editing returns a listing to `pending` so material changes can be moderated
- Admin moderation queue
- Approve/reject actions
- Client-side admin-role check

Production security:
- Enforce ownership and admin permissions with Supabase RLS, not only browser code.
- Consider separate `approved_at`, `approved_by`, `rejection_reason`, and moderation audit-event fields.
- Public marketplace queries should return approved listings only.
- Add server-side validation and image cleanup when listings are deleted.
