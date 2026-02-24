# AMLI Landing Page - Migration Guide

## Moving from Figma Make to Local Development (Cursor/VS Code)

This guide will help you migrate this project from Figma Make to your local IDE and deploy it to Heroku.

---

## 📋 Prerequisites

Before you begin, ensure you have:
- Node.js (v18 or higher) installed
- npm or yarn package manager
- Git installed
- Heroku CLI installed (for deployment)
- Your preferred IDE (Cursor, VS Code, etc.)

---

## 🚀 Step 1: Download and Setup Project

1. **Download the project** from Figma Make and extract it to your local machine

2. **Navigate to the project directory:**
   ```bash
   cd path/to/amli-landing-page
   ```

3. **Initialize the project** (if not already initialized):
   ```bash
   npm init -y
   ```

---

## 📦 Step 2: Install Dependencies

Create a `package.json` file with the following dependencies:

```json
{
  "name": "amli-landing-page",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "start": "vite preview --port $PORT"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "lucide-react": "^0.344.0",
    "motion": "^11.11.17",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.2.1",
    "class-variance-authority": "^0.7.0",
    "sonner": "^1.4.3",
    "@radix-ui/react-accordion": "^1.1.2",
    "@radix-ui/react-alert-dialog": "^1.0.5",
    "@radix-ui/react-aspect-ratio": "^1.0.3",
    "@radix-ui/react-avatar": "^1.0.4",
    "@radix-ui/react-checkbox": "^1.0.4",
    "@radix-ui/react-collapsible": "^1.0.3",
    "@radix-ui/react-context-menu": "^2.1.5",
    "@radix-ui/react-dialog": "^1.0.5",
    "@radix-ui/react-dropdown-menu": "^2.0.6",
    "@radix-ui/react-hover-card": "^1.0.7",
    "@radix-ui/react-label": "^2.0.2",
    "@radix-ui/react-menubar": "^1.0.4",
    "@radix-ui/react-navigation-menu": "^1.1.4",
    "@radix-ui/react-popover": "^1.0.7",
    "@radix-ui/react-progress": "^1.0.3",
    "@radix-ui/react-radio-group": "^1.1.3",
    "@radix-ui/react-scroll-area": "^1.0.5",
    "@radix-ui/react-select": "^2.0.0",
    "@radix-ui/react-separator": "^1.0.3",
    "@radix-ui/react-slider": "^1.1.2",
    "@radix-ui/react-slot": "^1.0.2",
    "@radix-ui/react-switch": "^1.0.3",
    "@radix-ui/react-tabs": "^1.0.4",
    "@radix-ui/react-toast": "^1.1.5",
    "@radix-ui/react-toggle": "^1.0.3",
    "@radix-ui/react-toggle-group": "^1.0.4",
    "@radix-ui/react-tooltip": "^1.0.7",
    "recharts": "^2.12.0",
    "react-day-picker": "^8.10.0",
    "date-fns": "^3.3.1",
    "vaul": "^0.9.0",
    "embla-carousel-react": "^8.0.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.56",
    "@types/react-dom": "^18.2.19",
    "@vitejs/plugin-react": "^4.2.1",
    "vite": "^5.1.4",
    "tailwindcss": "^4.0.0",
    "typescript": "^5.2.2"
  }
}
```

Then run:
```bash
npm install
```

---

## 🖼️ Step 3: Handle Figma Asset Imports

**CRITICAL:** Figma Make uses special `figma:asset/` imports that won't work in a standard React environment. You need to convert these.

### Find all Figma asset imports:

In `App.tsx`, you'll see imports like:
```typescript
import sanofiLogo from 'figma:asset/78469d7a50de702fc7093f6c71ecc38301199875.png';
import drSarahMitchell from 'figma:asset/fe2f7621f7ddfef74729aa24a920ff3c7dad1ce4.png';
import drJamesChen from 'figma:asset/355bee86d3c5d00b67be341cf5d42b5fede7dda4.png';
```

### Steps to fix:

1. **Create an `assets` or `public` directory:**
   ```bash
   mkdir public/images
   ```

2. **Download the images from Figma Make** (they should be in your exported files) or use placeholder images

3. **Move images to the public directory:**
   ```
   public/
   └── images/
       ├── sanofi-logo.png
       ├── dr-sarah-mitchell.jpg
       └── dr-james-chen.jpg
   ```

4. **Update imports in `App.tsx`:**
   ```typescript
   // OLD:
   import sanofiLogo from 'figma:asset/78469d7a50de702fc7093f6c71ecc38301199875.png';
   
   // NEW:
   const sanofiLogo = '/images/sanofi-logo.png';
   const drSarahMitchell = '/images/dr-sarah-mitchell.jpg';
   const drJamesChen = '/images/dr-james-chen.jpg';
   ```

---

## ⚙️ Step 4: Create Vite Configuration

Create a `vite.config.ts` file in the root directory:

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
  server: {
    port: 3000,
  },
});
```

---

## 📝 Step 5: Create Entry HTML File

Create an `index.html` file in the root directory:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>AMLI - Amlitelimab Safety Webinar | Sanofi</title>
    <meta name="description" content="Join our comprehensive webinar on Amlitelimab's safety profile, clinical data, and patient monitoring guidelines." />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

---

## 🔧 Step 6: Create React Entry Point

Create a `src` directory and move your files:

```bash
mkdir src
mv App.tsx src/
mv components src/
mv styles src/
```

Create `src/main.tsx`:

```typescript
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/globals.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

---

## 🎨 Step 7: Update Import Paths

Update all import paths in your components to reflect the new structure:

**In `src/App.tsx`:**
```typescript
// Update relative imports
import { WebinarRegistrationForm } from './components/WebinarRegistrationForm';
import { AmliLogo } from './components/AmliLogo';
// etc...
```

---

## 🧪 Step 8: Test Locally

Run the development server:

```bash
npm run dev
```

Visit `http://localhost:3000` and verify everything works!

---

## 🚢 Step 9: Deploy to Heroku

### Initial Setup

1. **Login to Heroku:**
   ```bash
   heroku login
   ```

2. **Create a new Heroku app:**
   ```bash
   heroku create amli-landing-page
   ```

3. **Create a `static.json` file** in the root directory for routing:
   ```json
   {
     "root": "dist",
     "clean_urls": true,
     "routes": {
       "/**": "index.html"
     },
     "headers": {
       "/**": {
         "Cache-Control": "public, max-age=31536000"
       },
       "/index.html": {
         "Cache-Control": "no-cache, no-store, must-revalidate"
       }
     }
   }
   ```

4. **Add the buildpack:**
   ```bash
   heroku buildpacks:set heroku/nodejs
   heroku buildpacks:add https://github.com/heroku/heroku-buildpack-static
   ```

5. **Update `package.json` scripts:**
   ```json
   {
     "scripts": {
       "dev": "vite",
       "build": "vite build",
       "preview": "vite preview",
       "heroku-postbuild": "npm run build"
     }
   }
   ```

6. **Initialize Git (if not already done):**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - AMLI landing page"
   ```

7. **Deploy to Heroku:**
   ```bash
   git push heroku main
   ```

8. **Open your app:**
   ```bash
   heroku open
   ```

---

## 🔍 Common Issues & Solutions

### Issue: "Module not found" errors
**Solution:** Double-check all import paths are relative to the new `src/` directory structure

### Issue: Images not loading
**Solution:** Ensure images are in `public/` and referenced with leading slash: `/images/photo.jpg`

### Issue: Tailwind styles not applying
**Solution:** Verify `globals.css` is imported in `main.tsx`

### Issue: Motion animations not working
**Solution:** Ensure `motion` package is installed (not `framer-motion`)

### Issue: Heroku build fails
**Solution:** Check that all dependencies are in `dependencies` (not `devDependencies`)

---

## 📱 Optional: Environment Variables

If you need to add analytics or tracking later:

1. **Create `.env` file:**
   ```
   VITE_ANALYTICS_ID=your_id_here
   ```

2. **Add to `.gitignore`:**
   ```
   .env
   .env.local
   ```

3. **Set in Heroku:**
   ```bash
   heroku config:set VITE_ANALYTICS_ID=your_id_here
   ```

---

## ✅ Final Checklist

- [ ] All dependencies installed
- [ ] Figma asset imports converted to regular image paths
- [ ] Images placed in `public/images/`
- [ ] `vite.config.ts` created
- [ ] `index.html` created
- [ ] `src/main.tsx` created
- [ ] Files moved to `src/` directory
- [ ] Import paths updated
- [ ] Local dev server runs successfully
- [ ] Build completes without errors (`npm run build`)
- [ ] Heroku app created and deployed
- [ ] Production site loads correctly

---

## 🎯 Project Structure (Final)

```
amli-landing-page/
├── public/
│   └── images/
│       ├── sanofi-logo.png
│       ├── dr-sarah-mitchell.jpg
│       └── dr-james-chen.jpg
├── src/
│   ├── components/
│   │   ├── AmliAiChat.tsx
│   │   ├── AmliLogo.tsx
│   │   ├── EfficacySection.tsx
│   │   ├── MechanismSection.tsx
│   │   ├── SafetyHighlights.tsx
│   │   ├── WebinarRegistrationForm.tsx
│   │   ├── figma/
│   │   │   └── ImageWithFallback.tsx
│   │   └── ui/
│   │       └── [all shadcn components]
│   ├── styles/
│   │   └── globals.css
│   ├── App.tsx
│   └── main.tsx
├── index.html
├── package.json
├── vite.config.ts
├── static.json
├── tsconfig.json
└── .gitignore
```

---

## 🆘 Need Help?

- **Vite Issues:** https://vitejs.dev/guide/troubleshooting.html
- **Heroku Issues:** https://devcenter.heroku.com/articles/troubleshooting-node-deploys
- **React Issues:** https://react.dev/learn

---

## 🎉 You're All Set!

Your AMLI landing page should now be running locally and deployed to Heroku. The personalized safety content, AI chat widget, and all interactive elements should work perfectly!
