# Satine Beauté Cloudflare Update

This folder fixes the deployment error caused by Cloudflare attempting to upload the repository’s `.git` history as website assets.

## Upload to GitHub

Replace the contents of your GitHub repository with the contents of this folder. The repository root must contain `wrangler.jsonc`, `.gitignore`, `README.md`, and the `website` folder.

Do not move `index.html` to the repository root. Keep it inside `website/` exactly as supplied.

## Deploy

Cloudflare will run `npx wrangler deploy` as before. The new `wrangler.jsonc` tells it to upload only `./website` as the static asset directory. It will ignore the `.git` folder automatically, so the 167 MiB Git history file will not be uploaded.

After Cloudflare reports a successful deployment, visit https://satinebeaute.com and force-refresh with `Ctrl+Shift+R`.
