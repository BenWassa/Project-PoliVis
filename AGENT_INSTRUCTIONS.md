# AI Agent Instructions for PoliVis

> **Purpose:** This document helps AI agents navigate, understand, and modify the PoliVis codebase safely and effectively.

## 🎯 Project Overview

**PoliVis** is a mobile-first Progressive Web App (PWA) for exploring Canadian politics through clean, data-driven interfaces. Built with React + TypeScript + Vite, designed for GitHub Pages deployment.

**User's working style:** Vibe coding with AI agents in VS Code workspaces. Iterative, conversational development with frequent agent collaboration.

---

## ✅ Allowed Actions

### Code Modifications
- ✅ Edit TypeScript/TSX files in root and subdirectories
- ✅ Create/modify React components in `components/`
- ✅ Update hooks in `hooks/`
- ✅ Modify utility functions in `lib/`
- ✅ Update types in `types.ts` and `constants.ts`
- ✅ Edit styling (Tailwind classes, `src/index.css`)
- ✅ Update documentation in `documentation/`

### Build & Test Operations
- ✅ Run `npm run dev` for local development
- ✅ Run `npm run build` to test production builds
- ✅ Run `npm run preview` to preview production builds locally
- ✅ Inspect `dist/` folder after builds
- ✅ Check console errors and fix them

### Configuration Changes
- ✅ Update `vite.config.ts` for build settings
- ✅ Modify `tailwind.config.js` for styling
- ✅ Update `tsconfig.json` for TypeScript settings
- ✅ Edit `postcss.config.js` for CSS processing
- ✅ Update `package.json` dependencies (with user approval for major changes)

### Git Operations
- ✅ Check `git status` and `git diff`
- ✅ Stage changes with `git add`
- ✅ Commit with descriptive messages
- ✅ Push to remote (when user explicitly requests)

---

## 🚫 Forbidden Actions

### Security & Secrets
- 🚫 **NEVER** read, expose, or log contents of `.env.local`
- 🚫 **NEVER** commit API keys or secrets to git
- 🚫 **NEVER** share `GEMINI_API_KEY` or other credentials
- 🚫 **NEVER** bypass security configurations

### Destructive Operations
- 🚫 **DO NOT** delete the `dist/` folder manually (let build tools handle it)
- 🚫 **DO NOT** force push to remote (`git push --force`)
- 🚫 **DO NOT** delete configuration files without explicit user request
- 🚫 **DO NOT** make breaking changes without discussion

### Data & Deployment
- 🚫 **DO NOT** modify `metadata.json` without user approval (source of truth for data)
- 🚫 **DO NOT** deploy to production environments automatically
- 🚫 **DO NOT** modify GitHub Actions workflows without review
- 🚫 **DO NOT** change GitHub Pages settings

---

## 📁 Key Files & Entrypoints

### Core Application Files
```
App.tsx                          # Main app component with routing/state
index.tsx                        # React root rendering & service worker init
index.html                       # HTML entry point with meta tags
constants.ts                     # App-wide constants and configuration
types.ts                         # TypeScript type definitions
```

### Components (UI Building Blocks)
```
components/
├── GlobalSearchBar.tsx          # Main search interface
├── PoliticianCard.tsx           # Politician display card
├── PoliticianDetailModal.tsx    # Detailed politician view
├── PartiesView.tsx              # Party listing view
├── PoliticiansView.tsx          # Politician listing view
├── IssuesView.tsx               # Issues/policy view
├── KeyIssuesCloud.tsx           # Tag cloud visualization
├── PartySelector.tsx            # Party filter component
├── SearchBar.tsx                # Search input component
├── SideNav.tsx                  # Side navigation menu
└── icons.tsx                    # Icon components
```

### Hooks & Utilities
```
hooks/
└── useBodyScrollLock.ts         # Body scroll lock for modals

lib/
├── genai.ts                     # Gemini AI integration
└── serviceWorkerManager.ts      # Service worker lifecycle management
```

### Configuration Files
```
vite.config.ts                   # Vite bundler config (base path for GitHub Pages)
tsconfig.json                    # TypeScript compiler settings
tailwind.config.js               # Tailwind CSS configuration
postcss.config.js                # PostCSS/Tailwind processing
package.json                     # Dependencies & npm scripts
```

### Build & Static Assets
```
public/                          # Static assets copied to dist/
├── manifest.json                # PWA manifest
├── service-worker.js            # Service worker for offline support
└── assets/                      # Icons (to be added)

src/
└── index.css                    # Main CSS with Tailwind directives

dist/                            # Build output (DO NOT EDIT - regenerated on build)
```

### Documentation
```
documentation/
├── README.md                    # Project overview
├── Vision.md                    # Product vision & goals
├── WORKFLOWS.md                 # Development workflows
├── VERSIONING.md                # Version management strategy
└── PoliVis setup.md             # Setup instructions
```

---

## 🛠️ Common Commands

### Development
```bash
npm run dev              # Start dev server at http://localhost:3000
npm run build            # Build for production (creates dist/)
npm run preview          # Preview production build locally
```

### Versioning (Auto-managed)
```bash
npm run version:update   # Update version.ts (safe to run before/after build)
npm run version:patch    # Bump patch version (1.0.0 -> 1.0.1)
npm run version:minor    # Bump minor version (1.0.0 -> 1.1.0)
npm run version:major    # Bump major version (1.0.0 -> 2.0.0)
```

### Git Workflow (Use cmd /c on Windows due to security constraints)
```bash
git status               # Check what's changed
git diff                 # See detailed changes
git add .                # Stage all changes
git commit -m "message"  # Commit with message
git push origin main     # Push to GitHub
```

---

## 🏗️ Architecture & Data Flow

### Application Structure
```
User Request
    ↓
GlobalSearchBar (search input)
    ↓
App.tsx (state management)
    ↓
├─→ PartiesView (party data from constants.ts)
├─→ PoliticiansView (politician data from metadata.json)
├─→ IssuesView (issue/policy data)
└─→ PoliticianDetailModal (detailed view)
```

### State Management
- React state hooks (`useState`, `useEffect`) in `App.tsx`
- No Redux/external state library
- Component props for data passing
- Local storage for user preferences (future)

### Data Sources
- **Static data:** `constants.ts` (parties, colors, config)
- **Politician data:** `metadata.json` (source of truth)
- **AI features:** Gemini API via `lib/genai.ts`

### Styling Approach
- **Tailwind CSS** for utility-first styling
- Build-time processing (PostCSS)
- Custom animations defined in `tailwind.config.js`
- Inter font family from Google Fonts

---

## 🔍 How to Navigate This Codebase

### When User Asks to Add a Feature
1. **Identify affected components** (check `components/` folder)
2. **Check if types need updating** (`types.ts`)
3. **See if constants are involved** (`constants.ts`)
4. **Update relevant component(s)**
5. **Test with `npm run dev`**
6. **Build to verify** (`npm run build`)

### When User Reports a Bug
1. **Ask for console errors** or check browser console
2. **Check recent git changes** (`git diff`)
3. **Inspect the component mentioned** in error stack
4. **Test fix locally** before committing
5. **Verify build still works**

### When User Wants to Deploy
1. **Run `npm run build`** to ensure clean build
2. **Check `dist/` folder** for correct asset paths
3. **Verify manifest and service worker** are present
4. **Commit changes** with descriptive message
5. **Push to GitHub** (`git push origin main`)
6. **GitHub Pages auto-deploys** from main branch

### When User Wants to Style Something
1. **Use Tailwind classes** (check `tailwind.config.js` for custom config)
2. **Add custom animations** to `tailwind.config.js` if needed
3. **Avoid inline styles** unless absolutely necessary
4. **Test responsive behavior** (mobile-first design)

---

## 🎨 Design Patterns & Conventions

### File Naming
- Components: PascalCase (`PoliticianCard.tsx`)
- Utilities: camelCase (`serviceWorkerManager.ts`)
- Hooks: camelCase with `use` prefix (`useBodyScrollLock.ts`)
- Config: kebab-case or dot notation (`vite.config.ts`, `postcss.config.js`)

### Component Structure
```tsx
// Imports
import { useState } from 'react';
import type { SomeType } from './types';

// Props interface
interface ComponentProps {
  data: SomeType;
  onAction: () => void;
}

// Component
export default function Component({ data, onAction }: ComponentProps) {
  // State
  const [state, setState] = useState(false);
  
  // Effects
  useEffect(() => {
    // ...
  }, []);
  
  // Handlers
  const handleClick = () => {
    // ...
  };
  
  // Render
  return (
    <div className="...">
      {/* JSX */}
    </div>
  );
}
```

### Import Order
1. React imports
2. Third-party libraries
3. Local components
4. Local utilities/hooks
5. Types
6. Constants

---

## 🐛 Debugging & Troubleshooting

### Build Fails
1. Check error message carefully
2. Verify all imports are correct
3. Check `tsconfig.json` for path resolution
4. Clear `node_modules` and reinstall if needed: `rm -rf node_modules && npm install`
5. Check `vite.config.ts` for base path issues

### GitHub Pages 404s
1. Verify `base: '/Project-PoliVis/'` in `vite.config.ts`
2. Check `dist/index.html` for correct asset paths
3. Ensure static assets are in `public/` folder
4. Verify service worker registration uses `import.meta.env.BASE_URL`

### Service Worker Issues
1. Check `public/service-worker.js` exists
2. Verify version is being updated in builds
3. Check browser dev tools → Application → Service Workers
4. Clear site data and re-register if needed

### Tailwind Not Working
1. Verify `src/index.css` has Tailwind directives
2. Check `postcss.config.js` has `@tailwindcss/postcss`
3. Ensure `tailwind.config.js` content paths include your files
4. Rebuild: `npm run build`

---

## 📊 Expected Outputs & Success Criteria

### Successful Dev Session
- ✅ `npm run dev` starts without errors
- ✅ Hot reload works when files change
- ✅ No console errors in browser
- ✅ UI renders correctly on mobile and desktop

### Successful Build
- ✅ `npm run build` completes without errors
- ✅ `dist/` folder contains all assets
- ✅ `dist/index.html` has correct `/Project-PoliVis/` paths
- ✅ CSS bundle is small (~2-3 KB gzipped)
- ✅ JS bundle is reasonable size (~75 KB gzipped)
- ✅ Service worker and manifest are in `dist/`

### Successful Deploy
- ✅ Changes committed with clear message
- ✅ Pushed to GitHub without conflicts
- ✅ GitHub Pages builds successfully
- ✅ Site loads at https://benwassa.github.io/Project-PoliVis/
- ✅ No 404 errors in console
- ✅ Service worker registers successfully

---

## 🤝 Working with This User (Vibe Coding Style)

### Communication Patterns
- User often explores ideas conversationally
- Expects agent to take initiative on implementation details
- Values clear explanations of what was done and why
- Appreciates when agent identifies potential issues proactively

### Best Practices for This Workflow
1. **Show, don't just tell** - Make the changes, then explain
2. **Test as you go** - Run builds/dev server to verify changes
3. **Be proactive** - If you see a related issue, mention it
4. **Commit frequently** - Small, atomic commits with clear messages
5. **Document as you code** - Update relevant docs when making changes
6. **Ask before destructive changes** - Deleting files, major refactors, etc.

### When to Pause & Ask
- 🤔 Major architectural changes
- 🤔 Breaking changes to public APIs
- 🤔 Modifying data schemas
- 🤔 Adding new dependencies (especially large ones)
- 🤔 Changing deployment configuration
- 🤔 Anything involving secrets or environment variables

---

## 📚 Additional Resources

- **React Docs:** https://react.dev
- **Vite Docs:** https://vitejs.dev
- **Tailwind CSS:** https://tailwindcss.com/docs
- **TypeScript:** https://www.typescriptlang.org/docs
- **GitHub Pages:** https://docs.github.com/en/pages

---

## 🔄 Maintaining This Document

**For AI Agents:** If you make significant architectural changes or add new patterns, update this document to help future agents. Keep it practical and example-driven.

**For Human:** Review this doc periodically (monthly or when onboarding new patterns) to ensure it reflects current project state.

---

**Last Updated:** November 4, 2025  
**Project Version:** 1.0.0  
**Maintained by:** AI agents working with @BenWassa
