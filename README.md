# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`


---

## Deploy Options

### Netlify (recommended for SPAs)
1. Create a new site from your Git repo or drag & drop the folder.
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Ensure `_redirects` exists with `/* /index.html 200` (already included).

### Cloudflare Pages
1. Create a project → connect the repo or upload.
2. Build command: `npm run build`
3. Build output directory: `dist`
4. `_redirects` file (included) handles SPA routing.

### GitHub Pages
1. Push to a repo with this project on a `main` branch.
2. GitHub → Settings → Pages → Source: "GitHub Actions".
3. The included workflow `.github/workflows/deploy-gh-pages.yml` will build and publish.

### Docker (serve built files)
```bash
docker build -t mannex .
docker run -p 4173:4173 mannex
# open http://localhost:4173
```

### Environment Variables
- Set `GEMINI_API_KEY` in `.env.local` (local dev) or in your host’s dashboard.
- Vite injects it as `process.env.GEMINI_API_KEY` (already wired).