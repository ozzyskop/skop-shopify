# SKOP Admin Security

## Store record and confirmed state

| Item                           | Value                                                                    | Evidence                                                                                                         |
| ------------------------------ | ------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------- |
| Store name                     | `SKOP`                                                                   | User-provided                                                                                                    |
| Shopify hostname               | `mvjhef-9f.myshopify.com`                                                | User-provided                                                                                                    |
| Store owner                    | User-controlled owner account                                            | User-provided                                                                                                    |
| Owner authentication           | Passkey or two-factor authentication enabled                             | User-confirmed; not independently observed because Shopify Admin browser access is blocked by human verification |
| Storefront password protection | Enabled                                                                  | User-confirmed; not independently observed because Shopify Admin browser access is blocked by human verification |
| Store status                   | Trial and unpublished                                                    | User-confirmed; not independently observed because Shopify Admin browser access is blocked by human verification |
| Paid plan                      | No paid plan purchased or authorized                                     | User-provided                                                                                                    |
| Primary contact email          | Pending user-approved business email                                     | Not yet provided                                                                                                 |
| Implementation collaborator    | Pending named account                                                    | Not yet provided                                                                                                 |
| Shopify CLI preview URL        | Pending `SKOP_PREVIEW_URL` from the active, owner-authorized CLI session | Not yet available                                                                                                |

## Administrative controls

- The store owner retains billing, payout, domain, and user-management control.
- Every administrator uses a separate, named account with a passkey or two-factor authentication enabled. Owner credentials are never shared.
- Implementation access is created only for a named collaborator or staff account after it is supplied and approved. It receives only the permissions required for the active task and must not receive billing or payout permissions.
- Collaborator access is time-bound to the active task and is revoked when the task completes or the collaborator no longer needs access.
- Production-theme publication requires explicit owner confirmation. No production theme may be published while the store remains a trial, unpublished store.
- Storefront password protection remains enabled until the owner explicitly authorizes a launch change.
- Unused staff, collaborators, and apps are reviewed monthly and removed.

## Paid-plan purchase gate

Shopify Basic selection is pending. Before any paid-plan action, the owner must be shown the current Shopify plan terms and must give explicit confirmation immediately before purchase. Record the resulting plan name in Shopify Admin after purchase. Until that gate is completed, do not purchase or authorize a paid plan and do not treat the store as production-ready.

## Monthly access review

The owner performs a review at least monthly and immediately after offboarding, a role change, suspected compromise, or a finished implementation task:

1. Review every staff account, collaborator account, app, and integration in Shopify Admin.
2. Confirm each entry has a named owner, a current business need, and only the minimum permissions required.
3. Confirm implementation accounts still lack billing, payout, domain-transfer, and user-management permissions unless the owner has separately approved a temporary exception.
4. Remove or revoke unused access and uninstall unused apps; reduce excessive permissions before retaining access.
5. Record the review date, reviewer, changes made, and any approved exception outside this repository.

## Credential and recovery handling

- Do not commit passwords, passkeys, recovery codes, API secrets, access tokens, browser-session data, or credential-bearing URLs to source control, issues, pull requests, or this runbook.
- Recovery codes are stored by the owner outside the repository in an owner-controlled secure location. Verify that recovery methods remain available when owner authentication changes.
- Before production launch, the owner must verify that at least one current recovery method works, that recovery codes are stored in an owner-controlled secure location, and that obsolete recovery methods have been removed. Record only the completion date and reviewer outside this public repository, never the recovery material itself.
- Use the existing owner-authorized Shopify CLI device authorization flow only. Do not start a second authentication flow, inspect local credentials, or copy CLI session material into files or chat.
- Use task-specific, revocable credentials where an integration is required, keep them outside the repository, and rotate or revoke them after the task or after a suspected exposure.
- If credentials or recovery material are exposed, revoke or rotate the affected access promptly, remove it from any shared surface where possible, and notify the owner.

## Shopify CLI connectivity note

The original implementation workspace could reach the store hostname but could not establish its proxy tunnel to `accounts.shopify.com`. Authentication failed at OAuth device authorization or token exchange with a 5-second proxy-tunnel timeout. This is an environment-specific network restriction, not a confirmed Shopify account problem. Use a different machine with normal Shopify account connectivity or the native GitHub theme integration. Never copy CLI session material between machines.

## Pending handoff items

- Obtain the user-approved primary contact email.
- Obtain and approve the named implementation collaborator account before granting implementation access.
- Complete the owner-confirmed paid-plan purchase gate before any plan purchase.
- Capture `SKOP_PREVIEW_URL` only from the active owner-authorized Shopify CLI development session; keep it out of source control if it contains credential-bearing query material.
- Verify a current owner recovery method before launch without recording recovery secrets in this repository.

## Wholesale access controls

- The public wholesale page explains eligibility and accepts applications but never exposes wholesale pricing.
- New applicants are reviewed manually before receiving the `wholesale_approved` customer tag or access to an assigned catalog.
- Sensitive resale and tax documents are requested only through an approved secure follow-up channel, never through the theme contact form or repository.
- Anonymous visitors, ordinary customer accounts, and accounts tagged only `wholesale_applicant` must not see wholesale prices or add wholesale-only case packs to cart.
- Approved accounts receive only their assigned catalog, documented minimum order, and eligible case-pack products.
- Wholesale pricing, case quantities, payment terms, and tax treatment remain pending owner and professional approval.

Before launch, test one anonymous visitor, one ordinary customer, one pending applicant, one approved account, and one declined account. Record whether pricing visibility, catalog access, cart authorization, customer tags, notifications, and checkout behavior match the approved state.
