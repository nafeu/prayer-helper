# GitHub Pages Deployment Guide

This guide explains how to deploy the Prayer Helper app to GitHub Pages using GitHub Actions, making it available at `nafeu.com/prayer-helper`.

## How It Works

The GitHub Actions workflow (`.github/workflows/deploy.yml`) automatically:
1. Builds the app when you push to the `main` branch
2. Deploys the built `index.html` to the `gh-pages` branch
3. Places it in the `prayer-helper` subdirectory for your custom domain

## Step-by-Step Setup

### 1. Ensure Your Repository is on GitHub

Make sure your `prayer-helper` repository is pushed to GitHub:
```bash
git remote -v  # Check if you have a remote
# If not, add one:
git remote add origin https://github.com/nafeu/prayer-helper.git
git push -u origin main
```

### 2. Enable GitHub Pages

1. Go to your repository on GitHub: `https://github.com/nafeu/prayer-helper`
2. Click on **Settings** (top menu)
3. Scroll down to **Pages** in the left sidebar
4. Under **Source**, select:
   - **Deploy from a branch**
   - Branch: `gh-pages`
   - Folder: `/ (root)`
5. Click **Save**

### 3. Configure GitHub Actions Permissions

GitHub Actions needs permission to write to the repository:

1. In the same **Settings** page, go to **Actions** → **General**
2. Scroll down to **Workflow permissions**
3. Select **Read and write permissions**
4. Check **Allow GitHub Actions to create and approve pull requests** (optional, but recommended)
5. Click **Save**

### 4. Push Your Code

The workflow file (`.github/workflows/deploy.yml`) is already in your repository. Simply push your code:

```bash
git add .
git commit -m "Add GitHub Actions workflow for deployment"
git push origin main
```

### 5. Monitor the Deployment

1. Go to your repository on GitHub
2. Click on the **Actions** tab
3. You should see a workflow run called "Deploy to GitHub Pages"
4. Click on it to see the build progress
5. Wait for it to complete (usually takes 1-2 minutes)

### 6. Access Your App

Once the workflow completes successfully:
- The app will be available at: `https://nafeu.github.io/prayer-helper`
- If your custom domain is configured, it will also be at: `https://nafeu.com/prayer-helper`

## How the Workflow Works

The workflow file (`.github/workflows/deploy.yml`) does the following:

```yaml
1. Triggers on every push to the `main` branch
2. Checks out your code
3. Sets up Node.js
4. Runs `npm run build` to generate index.html
5. Deploys to the `gh-pages` branch in the `prayer-helper` subdirectory
```

The `destination_dir: prayer-helper` setting ensures the files are placed in a subdirectory, which is necessary for your custom domain setup.

## Custom Domain Configuration

If `nafeu.com` is already configured with GitHub Pages:

1. The workflow will deploy to `gh-pages` branch
2. GitHub Pages will serve it from the `prayer-helper` subdirectory
3. Your custom domain will automatically serve it at `nafeu.com/prayer-helper`

If you need to configure the custom domain:
1. In repository **Settings** → **Pages**
2. Add your custom domain under **Custom domain**
2. Follow GitHub's instructions to add DNS records if needed

## Automatic Deployments

After the initial setup, every time you:
- Push to the `main` branch
- Merge a pull request to `main`

The workflow will automatically:
1. Build the latest version
2. Deploy it to GitHub Pages
3. Your site will be updated within 1-2 minutes

## Troubleshooting

### Workflow Fails to Run

- Check that the workflow file is in `.github/workflows/deploy.yml`
- Ensure GitHub Actions is enabled in repository settings
- Check the Actions tab for error messages

### Site Not Updating

- Wait a few minutes (GitHub Pages can take 1-2 minutes to update)
- Clear your browser cache
- Check the Actions tab to ensure the workflow completed successfully

### 404 Error

- Ensure GitHub Pages is enabled and pointing to the `gh-pages` branch
- Check that the `destination_dir: prayer-helper` is correct
- Verify your custom domain DNS settings if using `nafeu.com`

### Build Errors

- Check the Actions tab for specific error messages
- Ensure `package.json` has the build script: `"build": "node build.js"`
- Verify all markdown files exist in the `content/` directory

## Manual Deployment (Alternative)

If you prefer to deploy manually instead of using GitHub Actions:

1. Build locally: `npm run build`
2. Create/checkout `gh-pages` branch: `git checkout -b gh-pages`
3. Create `prayer-helper` directory: `mkdir -p prayer-helper`
4. Copy `index.html`: `cp index.html prayer-helper/`
5. Commit and push: `git add . && git commit -m "Deploy" && git push origin gh-pages`
6. Switch back to main: `git checkout main`

However, the GitHub Actions workflow is recommended as it automates this process.

