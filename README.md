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

### Simple Setup: Serve from Main Branch

1. **Build the app:**
   ```bash
   npm run build
   ```

2. **Commit and push `index.html` to GitHub:**
   ```bash
   git add index.html
   git commit -m "Build prayer-helper app"
   git push origin main
   ```

3. **Configure GitHub Pages:**
   - Go to your repository on GitHub
   - Navigate to **Settings** → **Pages**
   - Under **Source**, select:
     - **Deploy from a branch**
     - Branch: **main**
     - Folder: **/ (root)**
   - Click **Save**

4. **Access your app:**
   - Your app will be available at: `https://nafeu.github.io/prayer-helper`
   - If your custom domain is configured, it will also be at: `https://nafeu.com/prayer-helper`

### Deployment Workflow

After the initial setup, whenever you update content:

1. Edit the markdown files in `content/`
2. Build: `npm run build`
3. Commit and push: `git add index.html && git commit -m "Update content" && git push origin main`
4. GitHub Pages will automatically serve the updated `index.html` from the main branch

### Custom Domain Configuration

If `nafeu.com` is already configured with GitHub Pages:
- The app will be available at `nafeu.com/prayer-helper` once GitHub Pages is enabled
- Make sure your `CNAME` file (if any) is configured correctly in your repository root
- GitHub Pages will serve the content from the root of your main branch

**Note:** Since you want the app at `nafeu.com/prayer-helper` (a subdirectory), you'll need to either:
- Set up the repository as a subdirectory in your main GitHub Pages site, or
- Use a different deployment method if you need the subdirectory structure

## Notes

- The build script uses only Node.js built-in modules (fs, path) - no external dependencies required
- All styling is inline in the HTML template for simplicity
- The app is fully client-side - no backend required
- Mobile-first responsive design works on all screen sizes

## License

MIT

