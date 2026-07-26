# GitHub-to-Shopify Theme Connection

## Purpose

Connect the SKOP theme to Shopify through Shopify's native GitHub integration. This avoids the Shopify CLI authentication restriction encountered in the original workspace and creates a bidirectional link between a GitHub branch and an unpublished Shopify theme.

## Known values

- GitHub repository: `https://github.com/eladrave/skop-shopify`
- Shopify store hostname: `mvjhef-9f.myshopify.com`
- Implementation branch: `feature/skop-store-build`
- Theme source directory on the implementation branch: `theme/`
- Recommended Shopify deployment branch: `shopify-preview`

## Important branch requirement

Do not connect `main` or `feature/skop-store-build` directly.

Shopify recognizes a GitHub branch only when the standard theme directories are at the branch root:

```text
assets/
config/
layout/
locales/
sections/
snippets/
templates/
```

The implementation branch stores these directories under `theme/`. Create a deployment branch that exposes the contents of `theme/` at its root.

## Create the deployment branch

Run these commands from a clean clone:

```bash
git fetch origin
git switch feature/skop-store-build
git pull --ff-only
git branch -D shopify-preview 2>/dev/null || true
git subtree split --prefix=theme -b shopify-preview
git push --force-with-lease --set-upstream origin shopify-preview
```

The force-with-lease update is intentional for this generated deployment branch. Do not use it on `main` or `feature/skop-store-build`.

Verify that the deployment branch has the theme directories at its root:

```bash
git ls-tree --name-only origin/shopify-preview
```

Expected output includes `assets`, `config`, `layout`, `locales`, `sections`, `snippets`, and `templates`.

## Connect the branch in Shopify

1. Sign in to the SKOP Shopify owner account.
2. Open **Shopify Admin > Online Store > Themes**.
3. In **Theme library**, select **Add theme > Connect from GitHub**.
4. Install or authorize the official Shopify GitHub app when prompted.
5. For GitHub repository access, choose **Only select repositories** and allow `eladrave/skop-shopify`.
6. Return to Shopify and select:
   - Account: `eladrave`
   - Repository: `skop-shopify`
   - Branch: `shopify-preview`
7. Connect the branch.
8. Keep the resulting theme unpublished.
9. Use **Preview** or **Customize** to inspect it.

Official reference: <https://shopify.dev/docs/storefronts/themes/tools/github>

## Verify bidirectional synchronization

Shopify automatically commits theme-editor changes back to the connected branch. This behavior cannot be disabled.

1. In Shopify, open **Customize** on the connected unpublished theme.
2. Make a harmless temporary setting change and save it.
3. Open the `shopify-preview` branch on GitHub.
4. Verify that a new commit from the Shopify bot appears.
5. Revert the temporary setting in Shopify and verify the corresponding commit.

Also test GitHub-to-Shopify synchronization:

1. Push a harmless theme change to `shopify-preview`.
2. Confirm the theme card's **Last saved** time updates.
3. Confirm the change appears in the theme preview.

## Ongoing development workflow

The implementation branch remains the source for project code, tests, documentation, and theme work.

After theme changes are committed and validated on `feature/skop-store-build`, regenerate the deployment branch:

```bash
git switch feature/skop-store-build
git pull --ff-only
git branch -D shopify-preview 2>/dev/null || true
git subtree split --prefix=theme -b shopify-preview
git push --force-with-lease origin shopify-preview
```

Because Shopify can commit theme-editor changes to `shopify-preview`, inspect and preserve any legitimate Shopify-generated changes before regenerating the branch. Prefer making durable code changes on `feature/skop-store-build`; use the Shopify editor for preview configuration rather than untracked code changes.

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
shopify theme dev --store mvjhef-9f.myshopify.com --path theme
```

Do not commit Shopify CLI session files, access tokens, or credential-bearing preview URLs.
