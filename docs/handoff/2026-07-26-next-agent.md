# SKOP Shopify Project Handoff

**Handoff date:** July 26, 2026

**Repository:** `https://github.com/ozzyskop/skop-shopify`

**Store:** `mvjhef-9f.myshopify.com`

**Domain:** `skop.us`

**Current branch:** `main`

## Start here

Continue the existing implementation. Do not restart discovery, recreate the repository, or replace the approved architecture.

Read, in order:

1. This handoff
2. `docs/superpowers/specs/2026-07-26-skop-shopify-store-design.md`
3. `docs/superpowers/plans/2026-07-26-skop-shopify-store.md`
4. `docs/runbooks/admin-security.md`
5. `docs/runbooks/github-shopify-connection.md`

Use the implementation plan task by task. Preserve focused commits and verify each task before marking it complete.

## Product and business decisions

### Brand

- Working brand: `SKOP`
- Domain: `skop.us`
- Positioning: premium, technical, evidence-led, and broadly affordable
- Product format: 50 ml tube
- Product is a gel, not chalk or cream
- Product temporarily reduces hand perspiration and improves grip through another mechanism
- Product claims include better sweat reduction, stronger or more controlled grip, longer duration, cleaner equipment, gentler ingredients, faster drying, and patented technology, but claims remain inactive until evidence and labels approve them

### Five formulation families

1. Shooting
2. Racket sports
3. Climbing, CrossFit, weightlifting, and ninja
4. Pole dancing
5. Drumming and gaming

Each family uses a different formulation, product variant, accent color, and sport-specific message.

### Commerce model

- Direct-to-consumer first
- Lightweight wholesale support in the same store
- One-time purchase is the default
- Automatic replenishment options: every 4, 6, or 8 weeks
- Final product names, supplier links, supplier SKUs, prices, subscription discounts, bundle discounts, and wholesale pricing remain pending
- Supplier will fulfill directly to customers in the United States and Canada
- Prefer the supplier's native Shopify or dropshipping app integration

### Markets and language

- Initial markets: United States and Canada
- Initial language: English
- Québec is included in English only while the owner obtains legal advice
- French localization and expanded Québec compliance remain future work unless counsel requires them before launch

### Evidence planned

- Laboratory and comparative test results
- Ingredient and safety documentation
- Athlete or expert endorsements
- Customer trials and testimonials
- Demonstration videos

## Approved architecture

- Shopify Basic
- Native Online Store 2.0 theme based on Dawn
- Liquid, JSON templates, CSS, and minimal vanilla JavaScript
- Shopify-hosted checkout
- Structured product metafields and metaobjects
- First-party Shopify apps where practical
- Supplier's native Shopify integration
- One blended DTC and lightweight-wholesale store
- Upgrade path to advanced B2B, additional markets, French localization, and premium subscription or bundle tooling

## Confirmed Shopify state

The owner confirmed:

- Store owner authentication uses a passkey or two-factor authentication
- Storefront password protection is enabled
- The store is a trial and unpublished
- No paid plan purchase has been authorized

These confirmations were not independently observed in the original cloud browser because Shopify repeatedly presented a human-verification challenge.

Pending owner-controlled gates:

- Approved primary business contact email
- Named implementation collaborator or staff account if needed
- Paid plan selection and purchase
- Shopify Payments identity and business verification
- Payout bank connection
- Domain registrar access and DNS changes
- Supplier app installation and authorization
- Final catalog, pricing, discounts, evidence, labels, policies, and legal approval
- Production-theme publication

## Repository state at handoff

Completed commits before this handoff:

```text
80b26c9 chore: ignore isolated worktrees
73394a3 chore: establish SKOP Shopify theme baseline
8608e6c fix: scope theme check to Dawn directory
0b07269 docs: define SKOP Shopify admin security controls
```

Task status:

- Task 1, repository, toolchain, and Dawn theme baseline: complete and review-clean
- Task 2, store and administrative security: runbook implemented, with external owner gates deferred
- Tasks 3 through 16: not yet implemented

Task 1 verification uses the explicit repository-root theme path because the original nested-directory command failed with the available Shopify CLI. Preserve the verified command in `package.json`.

The theme directories are at the repository root so Shopify can connect directly to `main`.

## Shopify access issue and selected workaround

The original workspace could reach the Shopify store hostname but could not reach Shopify's account authentication service through its proxy. Shopify CLI authentication therefore failed at the OAuth device authorization or token exchange.

Do not spend time retrying the same CLI flow from that environment.

On the new machine:

1. Authenticate GitHub normally.
2. Clone this repository and use `main`.
3. Authenticate Shopify CLI locally if desired.
4. Prefer the native GitHub theme integration for durable synchronization.
5. Follow `docs/runbooks/github-shopify-connection.md`.

## Exact next actions

1. Confirm this handoff exists on `origin/main`.
2. Connect `main` as an unpublished Shopify theme.
3. Verify bidirectional synchronization.
4. Capture a normal unpublished preview URL for testing, but do not commit credential-bearing URLs.
5. Run:

   ```bash
   npm ci
   npm run format:check
   npm run theme:check
   ```

6. Resume the implementation plan at Task 3.

## Safety boundaries

- Do not publish the production theme without explicit owner approval.
- Do not purchase a Shopify plan, install a paid app, connect a bank account, change DNS, send marketing, or approve supplier terms without explicit owner approval at the relevant gate.
- Do not store credentials, session data, tokens, recovery material, supplier secrets, or payment data in GitHub or chat.
- Do not activate unverified product claims.
- Do not preselect subscriptions.
- Keep all work compatible with the five approved formulation families.
