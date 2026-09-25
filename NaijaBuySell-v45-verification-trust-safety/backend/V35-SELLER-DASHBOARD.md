# V35 Backend Notes

Seller flow: authenticated seller -> create listing -> pending moderation -> admin approval -> public listing.

Image path:
`listing-images/<user-id>/<listing-id>/<uuid>-<filename>`

Storage policies should verify that the first path segment equals `auth.uid()`. Sellers must not be able to approve their own listings.

Next: edit/delete listings, approved public reads, image management, seller verification, admin moderation queue, and compliant protected-payment integration.