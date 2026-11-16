# BlogPost Hub — Frontend-only React Application

A browser-based blogging application built with React, Vite and React Router. The original interface and main blog workflows are retained, while authentication and blog data are handled locally with React state and the browser's LocalStorage.

## Requirements
- Node.js 20 or newer (Node.js 22 LTS recommended)
- npm

## Run locally

1. Extract this project ZIP.
2. Open the `blogpost` folder in VS Code.
3. Open the terminal in that folder and run:

```bash
npm install
npm run dev
```

4. Open the local URL printed by Vite (usually `http://localhost:5173`).

## Production build

```bash
npm run build
npm run preview
```

The production files are generated in `dist/`.

## Features
- Sign in / registration demo flow with a locally generated four-digit OTP
- Admin and reader roles with protected admin-only post management
- Create, view, edit and delete blog posts
- Cover image upload and preview
- Article details and estimated reading time
- Search and pagination for the locally stored community feed
- Light / dark theme preference saved in LocalStorage
- Responsive UI and existing transitions

## Demo login notes
This is a frontend-only internship/demo project. The OTP is generated in the browser and displayed on screen for auto-fill. The role selector is a demo convenience, not secure authorization. Anyone using the app can select the Admin role.

## Data and limitations
- Blog posts, registered users, login session and theme preference are stored in the current browser's LocalStorage.
- Data is local to that browser and device. It is not shared between visitors, browsers or devices, and clearing browser storage removes it.
- This project has no backend, server, database, real OTP/SMS delivery, secure authentication, or centralized user accounts.
- Large uploaded cover images may exceed browser LocalStorage limits; use reasonably sized images.
- This application is intended as a frontend internship/demo project, not production authentication or multi-user publishing infrastructure.

## GitHub safety
`.env`, `node_modules/`, and `dist/` are ignored by Git. No API keys or backend credentials are needed. Before pushing, run `git status` and check that no private files are staged.
