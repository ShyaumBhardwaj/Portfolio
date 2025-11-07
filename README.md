# DevOS — Shyaum's OS-Style Portfolio

A futuristic, OS-like React portfolio with draggable/resizable glass windows, a terminal with easter eggs, command palette, notifications, and a neon theme system.

## Features
- Movable + resizable windows for **Projects**, **About**, **Resume**, **Playground**, **Terminal**, **Settings**
- **Terminal commands**: `help`, `whoami`, `skills`, `projects`, `experience`, `theme <name>`, `rbc`, `konami`, `clear`
- **Command Palette** (⌘/Ctrl + K)
- **Notifications** (e.g., “Currently working at RBC 🚀”)
- **Neon themes** (Cyan, Fuchsia, Lime, Amber, Rose)
- Subtle gradients + glassmorphism + motion
- Konami secret → **rainbow neon mode** ✨

## Quickstart
```bash
# 1) Unzip, then in the folder:
npm install

# 2) Start dev server
npm run dev

# 3) Build for production
npm run build && npm run preview
```

## Deploy (Netlify, Vercel, GitHub Pages)

### Netlify
- New Site → Import from Git or “Deploy manually” by dropping the folder
- Build command: `npm run build`
- Publish directory: `dist`

### Vercel
- New Project → import repo
- Framework preset: **Vite**
- Build: `npm run build`
- Output: `dist`

### GitHub Pages (via static build)
```bash
npm run build
# serve the dist folder via any static host (Pages, Nginx, S3+CloudFront)
```

## Customize
- Edit accent colors in `src/lib/themes.js`
- Add your PDF resume to `public/resume.pdf`
- Projects live in `src/apps/Projects.jsx`
- Terminal commands in `src/components/Terminal.jsx`

Enjoy!
