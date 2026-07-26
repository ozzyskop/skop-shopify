# SKOP Project Instructions

This repository contains the in-progress Shopify implementation for SKOP.

Before making changes:

1. Read `docs/handoff/2026-07-26-next-agent.md`.
2. Read `docs/superpowers/specs/2026-07-26-skop-shopify-store-design.md`.
3. Read `docs/superpowers/plans/2026-07-26-skop-shopify-store.md`.
4. Continue from the first incomplete task in the handoff. Do not restart the project or repeat discovery already recorded there.

## Non-negotiable constraints

- The store remains unpublished until the owner explicitly approves publication.
- Never commit credentials, tokens, recovery codes, supplier secrets, payment data, or authenticated preview URLs.
- Treat product names, supplier links, SKUs, pricing, discounts, claims, evidence, and final legal text as pending until explicitly approved.
- One-time purchase is the default. Subscription must never be preselected.
- Subscription intervals are exactly 4, 6, and 8 weeks.
- The initial storefront is English for the United States and Canada. Québec launch remains subject to legal review.
- Use the approved five formulation families and their sport-specific positioning.
- Preserve Shopify-hosted checkout and progressive enhancement.
- Validate changes before claiming completion.

## Repository workflow

- Main implementation branch: `feature/skop-store-build`
- Shopify-connected deployment branch: `shopify-preview` after it is created
- Theme source in the implementation branch: `theme/`
- Do not connect `feature/skop-store-build` directly to Shopify. Shopify requires theme directories at the branch root.
- Do not publish the connected theme. Keep it in the theme library for preview until the launch gates pass.
