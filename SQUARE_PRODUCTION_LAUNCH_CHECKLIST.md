# Square production launch checklist — Offbeat Creations Co.

Status: **NOT LIVE**. Do not turn on real payment collection until every launch gate below passes.

## Verified current architecture (2026-11-16)
- Public shop: `shop.html` / `shop.js` calls `catalog-sandbox-checkout`.
- Sandbox checkout calls `https://connect.squareupsandbox.com/v2` using `SQUARE_SANDBOX_ACCESS_TOKEN`.
- Sandbox webhook: `square-sandbox-webhook`, validates Square HMAC signature and checks Square payment/order before recording payment.
- Shipping: USPS preferred; $6.99 separately stated postage, free arranged local pickup.
- Production: 5–7 business days; express by individual quote only.
- Virginia tax: 5.3% configured for standard taxable merchandise in Sandbox; verify actual sourcing and any special rates before launch.
- Out-of-state shipping checkout currently restricted.

## Production isolation (must implement before activation)
- [ ] Create **separate** production checkout and webhook functions; never replace sandbox token or host inside existing sandbox functions.
- [ ] Store live Square access token, location ID, and production webhook signature key **only** in Supabase secrets. Never commit them to GitHub or client-side code.
- [ ] Production checkout uses `https://connect.squareup.com/v2` and a production-specific checkout idempotency key.
- [ ] Verify exact Square API tax, payment-link, and redirect behavior using current documentation.
- [ ] Separate sandbox vs production order/payment identifiers and records so production emails and dashboards cannot mistake a test order for a real sale.
- [ ] Verify production webhook signature against the exact production notification URL and raw body; independently retrieve the order and completed payment from production Square API.
- [ ] Add a server-side `live_checkout_enabled` gate that defaults to false. Require explicit owner approval before changing it.
- [ ] Keep `shop.js` pointed to Sandbox until a deliberate, reviewed production cutover.

## Business and fulfillment checks
- [ ] Confirm Square merchant account is fully verified for production card processing and that the intended location is correct.
- [ ] Confirm Virginia sales tax sourcing, taxable product classes, shipping treatment, and whether sales outside Virginia can be accepted.
- [ ] Verify subtotal, tax, postage, pickup, order snapshots, refunds, and webhook idempotency end-to-end.
- [ ] Confirm 5–7 business-day production disclosure and express-by-request policy.
- [ ] Verify USPS tracking link, customer email templates, cancellation/refund policy, and privacy/terms pages.
- [ ] Test a **real** low-value owner purchase only after explicit approval to activate live checkout. Avoid further test emails before that.
- [ ] Remove Sandbox/test-mode banners and noindex from storefront only at the actual launch.

## Launch decision
**Not approved.** Production credentials not configured by this checklist; real payments must remain OFF.
