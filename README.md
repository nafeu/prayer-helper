# Prayer Helper

A simple HTML/CSS/JS mobile-first web application to help Muslims perform proper prayer rituals (Salat) in the Sunni-Muslim tradition.

## Features

The app contains 4 main tabs:

1. **How To Pray** - Step-by-step guide with Arabic text, transliteration, translation, and explanations
2. **Surah Guide** - Collection of short surahs perfect for daily prayers with translations and significance
3. **Pre-Prayer Quiz** - Interactive quiz to test your knowledge about prayer rituals and Quranic verses
4. **Prayer Breakdown** - Complete table showing the number of rakats (Sunnat, Fard, Witr) for each prayer

## Project Structure

```
prayer-helper/
├── content/              # Markdown source files
│   ├── how-to-pray.md
│   ├── surah-guide.md
│   ├── quiz.md
│   └── prayer-breakdown.md
├── template.html         # HTML template
├── build.js             # Build script
├── index.html           # Generated output (do not edit directly)
├── package.json
└── README.md
```

## Build Instructions

### Prerequisites

- Node.js (version 12 or higher)

### Building the App

1. Install dependencies (none required - uses only Node.js built-in modules)

2. Run the build script:
   ```bash
   npm run build
   ```

   Or directly:
   ```bash
   node build.js
   ```

3. The `index.html` file will be generated in the root directory.

## Running Instructions

### Local Development

1. Build the app using the instructions above.

2. Open `index.html` in your web browser:
   - Simply double-click the file, or
   - Use a local server (recommended):
     ```bash
     # Using Python 3
     python3 -m http.server 8000
     
     # Using Node.js (if you have http-server installed)
     npx http-server -p 8000
     ```
   - Then visit `http://localhost:8000` in your browser

### Mobile Testing

The app is designed mobile-first. To test on mobile:
- Use browser developer tools to simulate mobile devices
- Or access the local server from your mobile device on the same network

## Editing Content

All content is written in Markdown format for easy editing:

- Edit `content/how-to-pray.md` for prayer instructions
- Edit `content/surah-guide.md` for surah information
- Edit `content/quiz.md` for quiz questions
- Edit `content/prayer-breakdown.md` for prayer breakdown table

After editing any markdown file, run `npm run build` to regenerate `index.html`.

## Deploying to GitHub Pages

### Option 1: Deploy to `nafeu.com/prayer-helper`

1. **Build the app:**
   ```bash
   npm run build
   ```

2. **Commit and push to GitHub:**
   ```bash
   git add .
   git commit -m "Build prayer-helper app"
   git push origin main
   ```

3. **Set up GitHub Pages:**
   - Go to your repository on GitHub
   - Navigate to Settings → Pages
   - Under "Source", select "Deploy from a branch"
   - Choose "main" branch and "/ (root)" folder
   - Click Save

4. **Configure for custom domain subdirectory:**
   Since you want to deploy to `nafeu.com/prayer-helper`, you have two options:

   **Option A: Use a separate branch for the subdirectory**
   - Create a new branch called `gh-pages`
   - In that branch, create a `prayer-helper` folder
   - Copy `index.html` to `prayer-helper/index.html`
   - Configure GitHub Pages to deploy from the `gh-pages` branch
   - Update your custom domain settings if needed

   **Option B: Use GitHub Actions (Recommended)**
   - Create `.github/workflows/deploy.yml` (see below)
   - This will automatically build and deploy to the `gh-pages` branch

### Option 2: GitHub Actions Workflow (Automated)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Build
        run: npm run build
      
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: .
          destination_dir: prayer-helper
```

This workflow will:
- Build the app on every push to main
- Deploy to the `gh-pages` branch
- Make it available at `nafeu.github.io/prayer-helper`

### Custom Domain Configuration

If `nafeu.com` is already configured with GitHub Pages:
- The app will be available at `nafeu.com/prayer-helper` once deployed
- Make sure your `CNAME` file (if any) is configured correctly
- GitHub Pages will automatically serve the content from the `prayer-helper` subdirectory

## Notes

- The build script uses only Node.js built-in modules (fs, path) - no external dependencies required
- All styling is inline in the HTML template for simplicity
- The app is fully client-side - no backend required
- Mobile-first responsive design works on all screen sizes

## License

MIT

