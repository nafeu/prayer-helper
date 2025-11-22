# GitHub Pages Deployment Guide

This guide explains how to deploy the Prayer Helper app to GitHub Pages by serving `index.html` directly from the `main` branch.

## How It Works

GitHub Pages will serve the `index.html` file from the root of your `main` branch. This is the simplest setup - no separate deployment branch or build automation needed.

## Step-by-Step Setup

### 1. Build the App Locally

First, build the app to generate `index.html`:

```bash
npm run build
```

This creates `index.html` in the root directory.

### 2. Commit and Push to GitHub

Make sure `index.html` is committed and pushed to your `main` branch:

```bash
# Check if index.html exists and is tracked
git status

# If index.html is not tracked, add it
git add index.html
git commit -m "Add built index.html"
git push origin main
```

**Important:** Make sure `index.html` is committed to your repository. You may want to remove it from `.gitignore` if it's currently ignored.

### 3. Enable GitHub Pages

1. Go to your repository on GitHub: `https://github.com/nafeu/prayer-helper`
2. Click on **Settings** (top menu)
3. Scroll down to **Pages** in the left sidebar
4. Under **Source**, select:
   - **Deploy from a branch**
   - Branch: **main**
   - Folder: **/ (root)**
5. Click **Save**

### 4. Access Your App

After a few moments (GitHub Pages can take 1-2 minutes to update), your app will be available at:
- `https://nafeu.github.io/prayer-helper`

If your custom domain `nafeu.com` is configured with GitHub Pages, it will also be available at:
- `https://nafeu.com/prayer-helper`

## Updating Your App

Whenever you make changes:

1. **Edit the markdown files** in the `content/` directory
2. **Rebuild the app:**
   ```bash
   npm run build
   ```
3. **Commit and push the updated `index.html`:**
   ```bash
   git add index.html
   git commit -m "Update prayer helper content"
   git push origin main
   ```
4. **Wait 1-2 minutes** for GitHub Pages to update

## Custom Domain Setup

### If `nafeu.com` is already your main GitHub Pages site:

If `nafeu.com` is already configured to serve from another repository (like `nafeu.github.io`), you have a few options:

**Option A: Serve from subdirectory in main repo**
- If your main site is in a different repo, you could add this as a subdirectory there
- Create a `prayer-helper` folder in that repo
- Copy `index.html` to `prayer-helper/index.html` in that repo

**Option B: Use a separate subdomain**
- Set up `prayer-helper.nafeu.com` as a subdomain
- Point it to this repository's GitHub Pages

**Option C: Serve from this repo's root**
- Access it at `https://nafeu.github.io/prayer-helper` (without custom domain)

### Setting up a custom domain for this repository:

1. In repository **Settings** → **Pages**
2. Under **Custom domain**, enter your domain (e.g., `prayer-helper.nafeu.com`)
3. Follow GitHub's instructions to add DNS records:
   - Add a CNAME record pointing to `nafeu.github.io`
   - Or add A records for GitHub Pages IP addresses
4. GitHub will create a `CNAME` file in your repository

## Important Notes

### Committing `index.html`

Since we're serving directly from the main branch, you need to commit `index.html`:

1. **Remove from `.gitignore`** if it's currently ignored:
   ```bash
   # Edit .gitignore and remove or comment out the index.html line
   ```

2. **Add and commit:**
   ```bash
   git add index.html
   git commit -m "Add built index.html"
   ```

### Build Before Committing

Always run `npm run build` before committing to ensure `index.html` is up to date with your latest markdown changes.

## Troubleshooting

### Site Shows 404 Error

- Wait 1-2 minutes after enabling GitHub Pages (it takes time to propagate)
- Verify GitHub Pages is enabled in Settings → Pages
- Check that `index.html` exists in the root of your `main` branch
- Clear your browser cache

### Changes Not Appearing

- Make sure you ran `npm run build` after editing markdown files
- Verify `index.html` was committed and pushed to the `main` branch
- Wait 1-2 minutes for GitHub Pages to update
- Hard refresh your browser (Ctrl+F5 or Cmd+Shift+R)

### Custom Domain Not Working

- Check DNS settings (CNAME or A records)
- Verify the `CNAME` file exists in your repository root
- Wait up to 24 hours for DNS propagation
- Check GitHub Pages settings show your custom domain

### Build Errors

- Ensure Node.js is installed: `node --version`
- Check that all markdown files exist in `content/` directory
- Review error messages from `npm run build`

## Workflow Summary

```
Edit markdown files → npm run build → git add index.html → git commit → git push → Wait 1-2 min → Site updated!
```

This simple workflow means you have full control over when updates are deployed, and you can see exactly what's being served by checking the `index.html` file in your repository.
