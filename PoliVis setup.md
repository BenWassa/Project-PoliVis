Perfect — here’s a **complete, practical plan** for your **Civic Lens static MVP**, built on the GEMINI React + TypeScript codebase, fully free and offline-ready.
No API calls, no Gemini costs — but still structured so AI can drop back in later.

---

## 🧭 1. Goal

✅ Single-page React app
✅ All political data hard-coded in `constants.ts`
✅ All components (Politicians, Parties, Issues, Modal) work off static data
✅ Gemini integration stubbed → off by default

---

## 🧩 2. Folder / File Structure

```
src/
 ├── App.tsx
 ├── constants.ts            # all static data here
 ├── types.ts                # type definitions for data
 ├── components/
 │    ├── PoliticiansView.tsx
 │    ├── PartiesView.tsx
 │    ├── IssuesView.tsx
 │    ├── PoliticianDetailModal.tsx
 │    ├── GlobalSearchBar.tsx
 │    ├── SideNav.tsx
 │    ├── icons.tsx
 │    └── ...
 ├── lib/
 │    └── genai.ts           # stub for later use
 ├── index.tsx
 ├── index.html
 └── vite.config.ts
```

---

## ⚙️ 3. Static Data Setup

### **types.ts**

You already have this file — make sure it defines:

```ts
export enum Party {
  Conservative = "Conservative",
  Liberal = "Liberal",
  NDP = "NDP",
  BlocQuébécois = "Bloc Québécois",
  Green = "Green",
}

export interface KeyIssue {
  id: number;
  title: string;
  description: string;
}

export interface CareerEntry {
  year: number;
  role: string;
  description: string;
}

export interface Politician {
  id: number;
  name: string;
  party: Party;
  position: string;
  termInfo: string;
  bio: string;
  photoUrl: string;
  keyIssues: number[];
  policies: string[];
  relatedPoliticianIds: number[];
  socials: { twitter?: string; website?: string };
  career: CareerEntry[];
  committeeMemberships: { name: string; role: string }[];
  notableQuotes: { text: string; source: string }[];
  aiSummary?: string;              // NEW: optional static text
}
```

---

### **constants.ts**

Keep all static data here:

```ts
import { Party, Politician, KeyIssue } from "./types";

export const KEY_ISSUES: KeyIssue[] = [
  { id: 1, title: "Housing", description: "Affordable housing, development, and supply policy." },
  { id: 2, title: "Climate Change", description: "Environmental policy and clean-energy transition." },
  { id: 3, title: "Economy", description: "Fiscal, trade, and job creation priorities." },
];

export const POLITICIANS: Politician[] = [
  {
    id: 1,
    name: "Mark Carney",
    party: Party.Liberal,
    position: "Prime Minister",
    termInfo: "2025 – Present",
    bio: "Former central-bank governor turned Prime Minister focusing on fiscal prudence and unity.",
    photoUrl: "/images/carney.jpg",
    keyIssues: [1, 2, 3],
    policies: [
      "National economic-security strategy",
      "Build 500 000 homes per year by 2035",
    ],
    relatedPoliticianIds: [2, 3],
    socials: { twitter: "markcarney", website: "https://pm.gc.ca" },
    career: [
      { year: 2013, role: "Bank of England Governor", description: "Led monetary policy until 2020." },
      { year: 2025, role: "Prime Minister of Canada", description: "Elected Liberal leader after Freeland resigned." },
    ],
    committeeMemberships: [],
    notableQuotes: [
      { text: "We build when others hesitate.", source: "2025 Budget Speech" },
    ],
    aiSummary: "Carney’s government emphasizes stability, housing supply, and climate investment under an economic-security lens.",
  },
  // add others here …
];
```

You can copy data from the CLAUDE HTML’s `politicianData` object, trimming to your key fields.

---

## 🧠 4. Disable Gemini Completely for MVP

### **lib/genai.ts**

Create a harmless stub:

```ts
export const CONFIG = {
  enableGemini: false,
};

export async function askGemini(prompt: string): Promise<string> {
  console.warn("Gemini disabled. Returning empty string.");
  return "";
}
```

---

### **PoliticianDetailModal.tsx**

Replace the live call:

```ts
// OLD
// const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
// const response = await ai.models.generateContent({...});

// NEW
import { CONFIG, askGemini } from "../lib/genai";

// inside component
const handleFactCheck = async () => {
  if (!CONFIG.enableGemini) {
    setAiSummary({ loading: false, data: politician.aiSummary ?? "No live AI summary available.", error: null });
    return;
  }

  setAiSummary({ loading: true, data: null, error: null });
  try {
    const text = await askGemini(`Summarize ${politician.name}’s recent policies.`);
    setAiSummary({ loading: false, data: text, error: null });
  } catch (e: any) {
    setAiSummary({ loading: false, data: null, error: e.message });
  }
};
```

Now the button will just show the static `aiSummary` text, not call an API.

---

## 🧰 5. App Integration

In `App.tsx`, import your static data:

```tsx
import { POLITICIANS, KEY_ISSUES } from "./constants";

// pass to main views
<PoliticiansView
  politicians={POLITICIANS}
  onSelectPolitician={handleSelectPolitician}
/>

<PartiesView
  politicians={POLITICIANS}
  onSelectPolitician={handleSelectPolitician}
/>

<IssuesView issues={KEY_ISSUES} />
```

---

## 🌐 6. Deployment & Usage

1. **Install deps**

   ```bash
   npm install
   ```
2. **Run dev**

   ```bash
   npm run dev
   ```
3. **Build for static deploy**

   ```bash
   npm run build
   ```

   Then upload the `dist/` folder to GitHub Pages or Netlify.

✅ No API keys
✅ No network calls
✅ Fully static, deployable anywhere

---

## 🪶 7. When Ready for AI Phase 2

To re-enable Gemini later:

1. Set `enableGemini: true` in `lib/genai.ts`.
2. Add `.env.local` with `VITE_GEMINI_API_KEY=your_key`.
3. Replace stub `askGemini` with real SDK calls.

---

### **Summary**

| Goal             | Approach                          |
| ---------------- | --------------------------------- |
| Free, static MVP | Use GEMINI React TS structure     |
| Data source      | Hard-coded `constants.ts`         |
| AI integration   | Disabled; fallback to static text |
| Build / deploy   | `vite build` → static hosting     |
