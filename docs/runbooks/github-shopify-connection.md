# GitHub-to-Shopify Theme Connection

## Purpose

Connect the SKOP theme to Shopify through Shopify's native GitHub integration. The repository uses `main` as its only long-lived branch, and the required Shopify theme directories are at the repository root.

## Known values

- GitHub repository: `https://github.com/eladrave/skop-shopify`
- Shopify store hostname: `mvjhef-9f.myshopify.com`
- Shopify-connected branch: `main`

The root of `main` includes:

```text
assets/
config/
layout/
locales/
sections/
snippets/
templates/
```

This is the standard directory structure required by Shopify's GitHub theme integration. Project directories such as `docs/`, `tests/`, and `.github/` remain in the same repository and are ignored by Shopify.

## Connect `main` in Shopify

1. Sign in to the SKOP Shopify owner account.
2. Open **Shopify Admin > Online Store > Themes**.
3. In **Theme library**, select **Add theme > Connect from GitHub**.
4. Install or authorize the official Shopify GitHub app when prompted.
5. For GitHub repository access, choose **Only select repositories** and allow `eladrave/skop-shopify`.
6. Return to Shopify and select:
   - Account: `eladrave`
   - Repository: `skop-shopify`
   - Branch: `main`
7. Connect the branch.
8. Keep the resulting theme unpublished.
9. Use **Preview** or **Customize** to inspect it.

Official reference: <https://shopify.dev/docs/storefronts/themes/tools/github>

## Verify bidirectional synchronization

Shopify automatically commits theme-editor changes back to `main`. This behavior cannot be disabled.

1. In Shopify, open **Customize** on the connected unpublished theme.
2. Make a harmless temporary setting change and save it.
3. Open `main` on GitHub.
4. Verify that a new commit from the Shopify bot appears.
5. Revert the temporary setting in Shopify and verify the corresponding commit.

Also test GitHub-to-Shopify synchronization:

1. Commit and push a harmless theme change to `main`.
2. Confirm the theme card's **Last saved** time updates.
3. Confirm the change appears in the unpublished theme preview.

## Ongoing development workflow

Use `main` for project code, tests, documentation, and theme development:

```bash
git switch main
git pull --ff-only
npm ci
npm run check
git push origin main
```

Because Shopify can commit theme-editor changes directly to `main`, always pull before beginning work and before pushing. Avoid simultaneous edits of the same file in GitHub and Shopify. Prefer durable code changes through Git and use Shopify's editor for store-specific configuration.

## Previous CLI authentication failure

The original workspace could reach `mvjhef-9f.myshopify.com` but could not establish a proxy tunnel to `accounts.shopify.com`.

Observed failures:

```text
request to https://accounts.shopify.com/oauth/token failed
Connection to establish proxy tunnel timed out after 5000ms
```

On a clean retry:

```text
request to https://accounts.shopify.com/oauth/device_authorization failed
Connection to establish proxy tunnel timed out after 5000ms
```

This was an environment-specific network restriction, not evidence of a Shopify account or authorization problem. A different machine with normal access can use Shopify CLI if desired:

```bash
shopify auth login
shopify theme dev --store mvjhef-9f.myshopify.com --path .
```

Do not commit Shopify CLI session files, access tokens, or credential-bearing preview URLs.
