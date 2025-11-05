# Tech Stack - PoliVis

> **Quick reference for AI agents and developers** - What we're using and why

---

## 🎯 Core Technologies

### Frontend Framework
- **React 19.2.0** - UI library for component-based architecture
- **TypeScript ~5.8.2** - Type-safe JavaScript for better DX and fewer bugs
- **TSX/JSX** - React components with TypeScript

### Build Tool & Bundler
- **Vite 6.2.0** - Fast build tool and dev server
  - Config: `vite.config.ts`
  - Dev server: `http://localhost:3000`
  - HMR (Hot Module Replacement) enabled
  - Optimized production builds

### Styling
- **Tailwind CSS v4.1.16** - Utility-first CSS framework
  - **v4 breaking change**: Uses `@import "tailwindcss"` syntax instead of v3's `@tailwind` directives
  - **Configuration**: Now done in CSS using `@theme {}` blocks (not `tailwind.config.js`)
  - PostCSS plugin: `@tailwindcss/postcss@4.1.16`
  - Autoprefixer for browser compatibility
  - Main CSS entry: `src/index.css` (must be imported in `index.tsx`)
  - **Important**: CSS must be imported in entry file: `import '/src/index.css'` in `index.tsx`
- **Google Fonts** - Inter font family (400, 500, 600, 700, 800 weights)

### CSS Processing
- **PostCSS** - CSS transformation pipeline
  - Config: `postcss.config.js` (ESM) + `postcss.config.cjs` (CommonJS fallback)
  - Plugins: `@tailwindcss/postcss`, `autoprefixer`
  - **Note**: Project uses `"type": "module"` in package.json, so .cjs fallback ensures compatibility

---

## 📦 Key Dependencies

### Production Dependencies
```json
{
  "react": "^19.2.0",           // UI framework
  "react-dom": "^19.2.0"        // React DOM rendering
}
```

### Development Dependencies
```json
{
  "@tailwindcss/postcss": "^4.1.16",  // Tailwind v4 PostCSS plugin
  "@types/node": "^22.14.0",          // Node.js type definitions
  "@vitejs/plugin-react": "^5.0.0",   // Vite React plugin
  "autoprefixer": "^10.4.21",         // CSS autoprefixer
  "postcss": "^8.5.6",                // CSS transformation
  "tailwindcss": "^4.1.16",           // CSS framework (v4)
  "typescript": "~5.8.2",             // TypeScript compiler
  "vite": "^6.2.0"                    // Build tool
}
```

---

## 🏗️ Project Structure

```
PoliVis/
├── App.tsx                     # Main app component
├── index.tsx                   # React root entry
├── index.html                  # HTML entry point
├── constants.ts                # App constants (parties, colors, config)
├── types.ts                    # TypeScript type definitions
├── metadata.json               # Politician data (source of truth)
├── version.ts                  # Auto-generated version info
│
├── components/                 # React components
│   ├── GlobalSearchBar.tsx
│   ├── PoliticianCard.tsx
│   ├── PoliticianDetailModal.tsx
│   ├── PartiesView.tsx
│   ├── PoliticiansView.tsx
│   ├── IssuesView.tsx
│   ├── KeyIssuesCloud.tsx
│   ├── PartySelector.tsx
│   ├── SearchBar.tsx
│   ├── SideNav.tsx
│   └── icons.tsx
│
├── hooks/                      # Custom React hooks
│   └── useBodyScrollLock.ts
│
├── lib/                        # Utilities & libraries
│   ├── genai.ts               # Gemini AI integration
│   └── serviceWorkerManager.ts # Service worker lifecycle
│
├── src/                        # Source assets
│   └── index.css              # Main CSS with Tailwind directives
│
├── public/                     # Static assets (copied to dist/)
│   ├── manifest.json          # PWA manifest
│   ├── service-worker.js      # Service worker
│   └── assets/                # Icons (to be added)
│
├── dist/                       # Build output (generated, don't edit)
│
├── documentation/              # Project documentation
│   ├── README.md
│   ├── Vision.md
│   ├── WORKFLOWS.md
│   ├── VERSIONING.md
│   └── PoliVis setup.md
│
├── scripts/                    # Build scripts
│   └── update-version.mjs     # Version auto-update script
│
├── archive/                    # Old versions/experiments
│
├── vite.config.ts             # Vite configuration
├── tsconfig.json              # TypeScript configuration
├── tailwind.config.js         # Tailwind configuration
├── postcss.config.js          # PostCSS configuration
├── package.json               # Dependencies & scripts
├── .env.local                 # Local environment variables (not in git)
└── .gitignore                 # Git ignore patterns
```

---

## 🚀 NPM Scripts

### Development
```bash
npm run dev                    # Start dev server (localhost:3000)
npm run build                  # Build for production
npm run preview                # Preview production build locally
```

### Versioning
```bash
npm run version:update         # Update version.ts (safe to run before/after build)
npm run version:patch          # Bump patch version (1.0.0 → 1.0.1)
npm run version:minor          # Bump minor version (1.0.0 → 1.1.0)
npm run version:major          # Bump major version (1.0.0 → 2.0.0)
```

### Build Pipeline
```bash
npm run version:update         # Update version.ts (safe to run before build)
npm run build                  # Full build: version update + vite build + postbuild
npm run postbuild              # Update service worker in dist/ (runs after build)
```

**Build Flow:**
1. `npm run version:update` - Updates `version.ts` with current version & build date (can run before build)
2. `vite build` - Bundles app for production → `dist/` (copies `public/` files)
3. `npm run postbuild` - Updates service worker version in `dist/service-worker.js`

---

## ⚙️ Configuration Files

### `vite.config.ts`
```typescript
// Key settings:
base: '/PoliVis/'      // GitHub Pages subpath
server.port: 3000              // Dev server port
plugins: [react()]             // Vite React plugin
define: {
  'process.env.API_KEY': ...   // Inject Gemini API key from .env.local
}
resolve.alias: {
  '@': path.resolve(__dirname, '.')  // Import alias
}
```

### `tsconfig.json`
```json
// Key settings:
"target": "ES2020"             // Modern JavaScript
"module": "ESNext"             // ES modules
"jsx": "react-jsx"             // React JSX transform
"strict": true                 // Strict type checking
"moduleResolution": "bundler"  // Vite-compatible resolution
```

### `tailwind.config.js`
**⚠️ DEPRECATED in Tailwind v4** - Configuration now done in CSS using `@theme` blocks.

Legacy v3 config (not used by v4):
```javascript
// Content paths (where to look for classes):
content: [
  "./index.html",
  "./App.tsx",
  "./index.tsx",
  "./components/**/*.{js,ts,jsx,tsx}",
  "./hooks/**/*.{js,ts,jsx,tsx}",
  "./lib/**/*.{js,ts,jsx,tsx}",
]
```

**Tailwind v4 uses CSS-based configuration** in `src/index.css`:
```css
@import "tailwindcss";

@theme {
  --font-family-sans: Inter, sans-serif;
  --color-slate-900: #0f172a;
  --color-slate-200: #e2e8f0;
}
```

### `postcss.config.js`
```javascript
export default {
  plugins: {
    '@tailwindcss/postcss': {},  // Tailwind v4 processing
    'autoprefixer': {}           // Browser prefixing
  }
};
```

**Note**: Also includes `postcss.config.cjs` (CommonJS fallback) for tooling compatibility with `"type": "module"` in package.json.

---

## 🌐 Deployment

### Platform
- **GitHub Pages** - Static site hosting
- **Repository:** https://github.com/BenWassa/PoliVis
- **Live URL:** https://benwassa.github.io/PoliVis/

### Build Configuration for GitHub Pages
- Base path set to `/PoliVis/` in `vite.config.ts`
- Static assets in `public/` folder
- Service worker registered with dynamic base path
- Manifest paths are relative for portability

### Deployment Process
1. Build locally: `npm run build`
2. Commit changes: `git commit -m "message"`
3. Push to GitHub: `git push origin main`
4. GitHub Pages auto-deploys from `main` branch

---

## 🔐 Environment Variables

### `.env.local` (Not in Git)
```bash
GEMINI_API_KEY=your_api_key_here    # Gemini AI API key
```

### Usage in Code
```typescript
// In vite.config.ts - injected at build time
define: {
  'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
  'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
}
```

### Security Notes
- ⚠️ Never commit `.env.local` to git
- ⚠️ API keys are injected at build time (visible in client bundle)
- ⚠️ For production, use server-side API proxy or restricted API keys

---

## 🎨 Design System

### Color Palette
- Primary background: `bg-slate-900` (#0f172a)
- Text color: `text-slate-200`
- Accents: Party colors defined in `constants.ts`

### Typography
- Font: Inter (Google Fonts)
- Weights: 400, 500, 600, 700, 800

### Responsive Design
- Mobile-first approach
- Tailwind breakpoints: `sm:`, `md:`, `lg:`, `xl:`, `2xl:`

### Custom Animations
- `animate-fade-in` - Fade in (0.3s ease-out)
- `animate-slide-up` - Slide up from bottom (0.4s cubic-bezier)
- `animate-slide-in-left` - Slide in from left (0.3s ease-out)
- `animate-slide-out-left` - Slide out to left (0.3s ease-out)

---

## 🔌 External Services & APIs

### Gemini AI (Google)
- **Purpose:** AI-powered features (future: politician Q&A, policy analysis)
- **Integration:** `lib/genai.ts`
- **API Key:** Stored in `.env.local`

### Google Fonts
- **Font:** Inter
- **Loaded via:** `<link>` in `index.html`

### CDN Services
- **React & React-DOM:** Loaded via importmap from `aistudiocdn.com`
- **Gemini AI SDK:** Loaded via importmap

---

## 📱 Progressive Web App (PWA)

### Manifest (`public/manifest.json`)
- App name: "PoliVis: Canadian Politics Explorer"
- Short name: "PoliVis"
- Display mode: Standalone
- Theme color: `#1e293b` (slate-900)
- Icons: 192x192, 512x512 (to be added)

### Service Worker (`public/service-worker.js`)
- **Strategy:** Network-first for HTML, stale-while-revalidate for assets
- **Cache name:** `polivis-cache-{version}`
- **Cached resources:** index.html, manifest.json, app bundle
- **Auto-update:** Checks for updates every hour
- **Management:** `lib/serviceWorkerManager.ts`

---

## 🧪 Testing & Quality

### Current State
- ❌ No automated tests yet
- ✅ Manual testing in dev mode
- ✅ Build-time TypeScript checking
- ✅ Vite build validation

### Future Additions (Recommended)
- [ ] Vitest for unit tests
- [ ] React Testing Library for component tests
- [ ] Playwright for e2e tests
- [ ] ESLint for code linting
- [ ] Prettier for code formatting

---

## 🔧 Node.js & Package Manager

### Node Version
- **Recommended:** Node.js 18+ (LTS)
- **Current development:** Node.js 22.20.0

### Package Manager
- **npm** (comes with Node.js)
- Lock file: `package-lock.json`

### Installation
```bash
npm install                    # Install all dependencies
npm ci                         # Clean install (uses lock file)
```

---

## 🐛 Common Issues & Solutions

### Tailwind Classes Not Working
```bash
# Check Tailwind is processing correctly
npm run build
# Inspect dist/assets/*.css for your classes
```

### Service Worker Not Updating
```bash
# Clear browser cache and service workers
# Chrome DevTools → Application → Clear storage
```

### Build Fails with Module Errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### GitHub Pages 404 Errors
```bash
# Verify base path in vite.config.ts
base: '/PoliVis/'

# Check dist/index.html has correct paths
# Should see: /PoliVis/assets/...
```

---

## 📊 Performance Targets

### Build Output
- ✅ CSS: ~11 KB (2-3 KB gzipped)
- ✅ JS: ~246 KB (75 KB gzipped)
- ✅ HTML: ~2 KB (1 KB gzipped)

### Dev Server
- ✅ Cold start: < 1s
- ✅ HMR: < 100ms

### Production
- ⏱️ First Contentful Paint: < 1.5s (target)
- ⏱️ Time to Interactive: < 3s (target)

---

## 🔄 Version Management

### Current Version
- **Version:** 1.0.0 (see `version.ts`)
- **Auto-updated:** On every build

### Version File (`version.ts`)
```typescript
export const APP_VERSION = '1.0.0';
export const BUILD_DATE = '2025-11-04T12:00:00.000Z';
```

### Version Bumping
```bash
npm run version:patch    # Bug fixes (1.0.0 → 1.0.1)
npm run version:minor    # New features (1.0.0 → 1.1.0)
npm run version:major    # Breaking changes (1.0.0 → 2.0.0)
```

---

## 📚 Learning Resources

### Framework Documentation
- React: https://react.dev
- TypeScript: https://www.typescriptlang.org/docs
- Vite: https://vitejs.dev
- Tailwind CSS v4: https://tailwindcss.com/docs (⚠️ Note: v4 has breaking changes from v3)

### Tools & Libraries
- Service Workers: https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API
- PWA: https://web.dev/progressive-web-apps/

---

## 🛠️ Development Troubleshooting

### CSS Not Loading in Dev Server
**Symptoms**: White page, no Tailwind utilities applied, console shows v1.0.x initialized but no styling

**Causes & Solutions**:
1. **CSS import missing in entry file**
   - ✅ Solution: Add `import '/src/index.css'` to `index.tsx`
   - Vite requires CSS to be imported in JS for HMR to work

2. **Tailwind v4 syntax not used**
   - ✅ Solution: Use `@import "tailwindcss"` in `src/index.css` (not `@tailwind base/components/utilities`)
   - v4 changed configuration from JS files to CSS `@theme` blocks

3. **Service Worker caching old assets**
   - ✅ Solution: Unregister SW in dev mode (added check for `import.meta.env.DEV` in `serviceWorkerManager.ts`)
   - Clear browser cache and SW registration:
     ```javascript
     navigator.serviceWorker.getRegistrations().then(regs => 
       regs.forEach(reg => reg.unregister())
     );
     ```

4. **PostCSS config not loading**
   - ✅ Solution: Created both `postcss.config.js` (ESM) and `postcss.config.cjs` (CommonJS fallback)
   - Required because `package.json` has `"type": "module"`

### Windows PowerShell Script Execution Issues
**Symptom**: `npm run dev` fails with "script cannot be loaded" error

**Solution**: Use `npm.cmd` instead of `npm`:
```powershell
npm.cmd run dev
npm.cmd run build
```

Or set execution policy (one-time):
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### PWA Icon 404 Errors
**Symptom**: Browser console shows 404 for icon-192.png, icon-512.png

**Solution**: 
- Add actual icon files to `public/assets/` (e.g., `PoliVis_rounded.png`, `PoliVis_splash.png`)
- Update `manifest.json` and `index.html` to reference correct icon paths
- Icons in `public/` folder are automatically copied to `dist/` during build

---

## 🤖 For AI Agents

### When Starting Work
1. Read this file + `AGENT_INSTRUCTIONS.md`
2. Check `package.json` for current dependencies
3. Run `npm.cmd run dev` (Windows) or `npm run dev` (Mac/Linux) to verify setup

### When Adding Dependencies
1. Justify why (file size, maintenance, alternatives)
2. Install: `npm install <package>`
3. Update this document with new dependency info

### When Changing Build Process
1. Test locally first: `npm run build`
2. Check `dist/` output
3. Update this document if configuration changes
3. Update this document if build config changes

### When Technology Changes
1. Update relevant sections in this file
2. Keep it concise and example-driven
3. Note version numbers and reasons for change

---

**Last Updated:** November 4, 2025  
**Project Version:** 1.0.0  
**Maintained by:** AI agents + @BenWassa
