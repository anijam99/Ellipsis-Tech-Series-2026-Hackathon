# Deploying Ice Kaching

The app is a static site — no backend, no database. `npm run build` produces a `dist/`
folder of plain files, and any static host will serve it. That makes this genuinely easy;
most of the steps below are account setup.

One exception: the "Talk to Ice Kaching" chat calls the OpenRouter API directly from the
browser, using a `VITE_OPENROUTER_API_KEY` baked in at build time (see the README's Setup
section). Every other screen works fine without it — set it before building only if you
want that one chat to give real answers instead of its "could not connect" fallback. Note
that Vite inlines `VITE_`-prefixed variables into the shipped JS bundle, so whatever key
you build with is visible to anyone who opens dev tools on the deployed site. Fine for a
free-tier hackathon key; not a place to put a production secret.

**Recommended host: Cloudflare Pages.** Free, unlimited bandwidth, and no commercial-use
restriction. The alternatives are fine too — see *Other hosts* at the bottom for the
trade-offs, which are real but small.

---

## Option A — Get a URL in about three minutes (no Git)

Use this today so the team can look at it. Drag-and-drop, nothing to configure.

1. **Build it.**
   ```bash
   npm install
   npm run build
   ```
   You now have a `dist/` folder.

2. **Sign up** at <https://dash.cloudflare.com/sign-up> (free, no card).

3. In the sidebar choose **Workers & Pages → Create → Pages → Upload assets**.

4. **Name it** `ice-kaching` (this becomes the URL).

5. **Drag the entire `dist` folder** onto the upload area. Drag the folder itself, not the
   files inside it.

6. Click **Deploy**. You get a live URL like `https://ice-kaching.pages.dev`.

Share that link. It works on your team's phones — which is the point, since this is a
mobile app in a phone frame.

> To publish a change later, run `npm run build` again and re-upload `dist`. That gets
> old quickly, which is why Option B exists.

---

## Option B — Auto-deploy on every push (recommended for the week)

Once this is set up, `git push` publishes. No more manual uploads.

### 1. Get the code

```bash
git clone https://github.com/Slyf0xXX/soju-ice-kaching.git
cd soju-ice-kaching
```

The app lives at the repo root now — there's no subfolder to `cd` into.

### 2. Connect Cloudflare Pages to the repo

1. **Workers & Pages → Create → Pages → Connect to Git**, and authorise GitHub. When it
   asks which repositories, you can grant access to just `soju-ice-kaching`.

2. Pick the repo, then set **exactly** these:

   | Setting | Value |
   |---|---|
   | Production branch | `main` |
   | Framework preset | `Vite` |
   | Build command | `npm run build` |
   | Build output directory | `dist` |
   | Root directory | `/` (default) |

3. **Add the environment variable** (optional — skip if you don't need the live chat): under
   **Settings → Environment variables**, add `VITE_OPENROUTER_API_KEY` with your OpenRouter
   key, for both Production and Preview.

4. **Save and Deploy.** First build takes a couple of minutes; later ones are quicker.

Every push to that branch now redeploys. Pull requests get their own preview URL, so you
can review a change on a real phone before it reaches the main link.

---

## Sharing with the team right now, with no deploy at all

If everyone is on the same Wi-Fi, this is instant:

```bash
npm run dev -- --host
```

Vite prints a **Network:** address like `http://192.168.1.42:5173`. Anyone on the same
network can open it on their phone. Good for a working session; not good for a link you
send someone, and not what you should demo from.

---

## Useful links once it's live

The app reads two query parameters, which makes it easy to point people at exactly the
screen you mean:

- `?tab=home` · `journey` · `support` · `spending` · `feed`
- `?state=healthy` · `slipping` · `melting` · `melted`

So `…pages.dev/?tab=home&state=melting` opens straight onto the melting companion.

---

## Other hosts

All three are free and all three will work. The differences only matter at the edges:

- **Netlify** — same drag-and-drop flow at <https://app.netlify.com/drop>. One caveat: on
  the free plan, exceeding the bandwidth allowance **suspends the site for the rest of the
  calendar month**. Unlikely at demo scale, but a bad failure mode if the project gets
  attention during judging.
- **Vercel** — the best preview-deploy experience of the three. But the Hobby plan
  prohibits commercial use, and Vercel defines that to include work by a paid employee or
  consultant. For a hackathon with prize money that's a question worth not having.
- **GitHub Pages** — free and fine, but a project site is served from
  `username.github.io/repo-name/`, and this build uses absolute asset paths (`/assets/…`).
  You would need to set `base: '/soju-ice-kaching/'` in `vite.config.ts` and rebuild, or
  every stylesheet and script 404s. Only worth it if you specifically want Pages.

---

## If a build fails

**`Cannot find module @rollup/rollup-win32-x64-msvc`** — Windows Application Control blocks
rollup's native binary on some machines. `package.json` already carries an override onto
`@rollup/wasm-node` which fixes it. Keep it: it costs a few seconds of build time and
guarantees the build runs anywhere.

**TypeScript errors** — `npm run build` runs `tsc` first, so a type error stops the deploy.
Run `npx tsc --noEmit` locally to see the same errors faster.

**Colours look wrong after a change** — run `npm run check:contrast`. It checks every
foreground/background pairing against WCAG AA and exits non-zero if one drops below.
