# NaijaBuy&Sell V42
Added:
- Full buyer/seller messaging inbox
- Conversation list with unread state
- Message composer
- Read/unread handling
- Realtime message subscription foundation
- Marketplace notifications page
- Mark-all-as-read
- Notifications database table and RLS foundation

Production notes:
- Enforce conversation participant access with Supabase RLS.
- Validate message length/rate limits server-side.
- Notification inserts should come from trusted backend functions/server logic.
- Do not expose private user contact information publicly.
