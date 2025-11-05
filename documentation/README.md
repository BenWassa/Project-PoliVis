# PoliVis

PoliVis is a mobile-first Progressive Web App (PWA) designed to make politics personal, visual, and immediately understandable. It presents Canadian political figures through a clean, stylized interface that merges profiles, policies, and perspectives—giving users the ability to explore who's shaping their world and how.

Think of it as a "Pokédex for politics"—approachable, aesthetic, and data-driven.

## 🎯 Vision

**Tone:** Calm, intelligent, and apolitical—no outrage bait, no bias.

**Style:** Minimalist, data-driven cards with color cues (party tones, issue tags).

**UX Principles:**
- Tap once → Learn something valuable
- Swipe → Discover context
- Long-press → Access depth (news, sources, analysis)

**Target Audience:** Young professionals, students, and civic newcomers who want to feel competent and confident about politics—not overwhelmed.

**User Promise:** "Get up to speed on who's running your province or country—at a glance."

## ✨ Features

- **Politicians View:** Browse Canadian political figures with detailed profiles, career history, and policy positions
- **Parties View:** Explore political parties and their representatives
- **Issues View:** Discover key policy areas and related politicians
- **Search & Filter:** Find politicians by name, party, or issues
- **Mobile-First Design:** Optimized for mobile devices with responsive layout
- **Progressive Web App:** Installable on mobile devices, works offline
- **Static Data:** No API dependencies, fully self-contained

## 🛠 Tech Stack

- **Frontend:** React 18 + TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Icons:** Custom SVG icons
- **PWA:** Service Worker for offline functionality
- **Deployment:** Static hosting (GitHub Pages, Netlify, etc.)

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher) - **Current tested version: v22.20.0**
- npm (v6 or higher) - **Current tested version: v10.9.3**

### Installation

1. Clone the repository:
```bash
git clone https://github.com/BenWassa/Project-PoliVis.git
cd Project-PoliVis
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment to any static hosting service.

### Preview Production Build

After building, you can preview the production build locally:
```bash
npm run preview
```

This will serve the built files from `dist/` on [http://localhost:4173](http://localhost:4173)

## 🌐 Deployment

### GitHub Pages (Automated)

This project is configured for automatic deployment to GitHub Pages:

1. **Enable GitHub Pages** in your repository settings:
   - Go to Settings → Pages
   - Source: "GitHub Actions"

2. **Automatic Deployment**: 
   - Push to `main` branch triggers automatic build and deploy
   - Built files are deployed to `gh-pages` branch
   - Site available at: `https://BenWassa.github.io/Project-PoliVis/`

3. **Manual Deployment** (if needed):
   - Go to Actions tab → "Deploy to GitHub Pages" → "Run workflow"

### Manual Deployment

For other hosting services (Netlify, Vercel, etc.):

```bash
npm run build
```

Then upload the `dist/` folder contents to your hosting provider.

## 📋 Available Scripts

| Command | Description | Port |
|---------|-------------|------|
| `npm run dev` | Start development server with hot reload | 3000 |
| `npm run build` | Build for production (outputs to `dist/`) | - |
| `npm run preview` | Preview production build locally | 4173 |

## 🔧 Troubleshooting

### Windows PowerShell: "cannot be loaded because running scripts is disabled"

**Problem:** PowerShell execution policy prevents npm from running.

**Solution:** Use `cmd` instead of PowerShell, or run commands with `cmd /c`:
```bash
cmd /c npm install
cmd /c npm run dev
cmd /c npm run build
```

**Alternative:** Change PowerShell execution policy (admin required):
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### "Refused to apply style" or 404 errors when previewing index.html

**Problem:** You're trying to preview the raw `index.html` file directly (e.g., with VS Code's Live Server).

**Solution:** This HTML file is a Vite template that needs processing. Use the Vite dev server instead:

```bash
npm run dev
```

Then visit http://localhost:3000/ in your browser.

**Why this happens:** The raw HTML references built assets and expects React components to be injected by Vite.

### Port 3000 already in use

If you see "Port 3000 is already in use", either:
- Stop the existing dev server (Ctrl+C)
- Or run on a different port: `npm run dev -- --port 3001`

### Build fails

- Ensure Node.js v16+ is installed: `node --version`
- Clear node_modules and reinstall:
  - Windows: `rmdir /s /q node_modules && npm install`
  - macOS/Linux: `rm -rf node_modules && npm install`
- Check for TypeScript errors: `npm run build`
- Try clearing Vite cache: delete the `node_modules/.vite` folder

## �📱 Usage

- **Browse Politicians:** Tap on any politician card to view detailed information
- **Explore Parties:** See all politicians grouped by political party
- **Discover Issues:** Find politicians associated with specific policy areas
- **Search:** Use the global search bar to find specific politicians or topics
- **Install as PWA:** On mobile devices, add to home screen for native app experience

## 📁 Project Structure

```
Project-PoliVis/
├── components/         # React components
│   ├── GlobalSearchBar.tsx
│   ├── IssuesView.tsx
│   ├── KeyIssuesCloud.tsx
│   ├── PartiesView.tsx
│   ├── PartySelector.tsx
│   ├── PoliticianCard.tsx
│   ├── PoliticianDetailModal.tsx
│   ├── PoliticiansView.tsx
│   ├── SearchBar.tsx
│   ├── SideNav.tsx
│   └── icons.tsx
├── lib/
│   └── genai.ts        # AI integration stub
├── hooks/              # Custom React hooks
├── constants.ts        # Static data (politicians, issues)
├── types.ts            # TypeScript interfaces
├── App.tsx             # Main app component
├── index.tsx           # App entry point
├── index.html          # HTML template
├── manifest.json       # PWA manifest
├── service-worker.js   # Service worker for PWA
├── package.json        # Dependencies and scripts
├── vite.config.ts      # Build configuration
├── tsconfig.json       # TypeScript configuration
└── documentation/      # Project documentation
    ├── Vision.md       # Design philosophy and vision
    ├── PoliVis setup.md # Setup instructions
    └── README.md       # This file
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make your changes
4. Test thoroughly
5. Commit: `git commit -m 'Add some feature'`
6. Push: `git push origin feature/your-feature`
7. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by the need for accessible civic information
- Built with modern web technologies for maximum reach
- Designed for citizens who want to engage meaningfully with politics

---

**PoliVis** - Making politics personal and understandable.
