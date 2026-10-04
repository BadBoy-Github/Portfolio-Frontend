# Portfolio Website

A modern, interactive portfolio website built with React, showcasing projects, blogs, certifications, achievements, and more.

![Portfolio Preview](https://res.cloudinary.com/dz53e3szr/image/upload/v1774279871/Portfolio_head_cd3ap3.png)

## Repository layout

This repository holds **two independent npm projects**. There are no npm workspaces — each folder has its own `package.json` and `node_modules`, and each is installed, run and deployed separately.

```
Portfolio/
├── frontend/   Vite + React single-page app (this README)
└── backend/    Express + Mongoose API, MongoDB, AI chatbot
```

The frontend is **not** standalone: projects, blogs, certificates, achievements, reviews and tech stacks are all fetched from the backend at runtime. Start the API before the frontend or the content sections will render their error state.

## Features

- 🎨 **Hand-drawn design system** - paper/ink palette, wobbly borders and hard offset shadows, driven by Tailwind
- 🎬 **Looping hero video** - muted autoplay, click-to-replay, sound and synced-caption toggles
- 🤖 **AI Q&A terminal** - portfolio-aware chatbot backed by the API
- 📱 **Fully responsive** - verified from 360px up, with a mobile hamburger nav
- 🗂️ **Section navigation** - right-hand scroll-spy dots on the landing page
- ⏩ **Horizontal rails** - swipeable card rails on every detail page, chevron controls on tablet and up
- 💬 **Reviews** - public list plus modal submission
- 🛠️ **Admin dashboard** - JWT-authenticated CRUD for every collection
- ⚡ **Code splitting** - every route is lazy-loaded behind `Suspense`
- 🔍 **SEO** - per-page meta via `react-helmet-async`, JSON-LD, `robots.txt`, `sitemap.xml`

## Tech stack

**Frontend**

| Concern | Library |
| --- | --- |
| UI | React 18.3, React DOM 18.3 |
| Build tool | Vite 6, `@vitejs/plugin-react` |
| Styling | Tailwind CSS 3.4 + PostCSS + autoprefixer |
| Routing | react-router-dom 7 |
| Animation | framer-motion 12, motion 12, GSAP 3 + `@gsap/react` |
| Smooth scroll | lenis 1.3 |
| SEO | react-helmet-async 3 |
| Icons | lucide-react 0.510, react-icons 5.5 |
| Prop types | prop-types 15.8 |

**Backend**

Express 4, Mongoose 8, `jsonwebtoken`, `bcryptjs`, `nodemailer`, `node-fetch`. Runs on `PORT` (defaults to `5000`).

## Getting started

### Prerequisites

- Node.js v18 or higher
- A MongoDB instance (Atlas or local)
- npm

### 1. Backend

```bash
cd backend
npm install
cp .env .env.local   # or edit .env directly
npm run seed         # optional: load data/data.json into MongoDB
npm run dev          # nodemon, http://localhost:5000
```

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

### Environment variables

`frontend/.env`:

| Variable | Purpose |
| --- | --- |
| `VITE_BACKEND_URL` | Base URL of the API, e.g. `http://localhost:5000` |
| `VITE_ADMIN_EMAIL` | Admin credentials used by the login screen |
| `VITE_ADMIN_PASSWORD` | Admin credentials used by the login screen |

`backend/.env` holds `PORT`, the MongoDB connection string, JWT secret, and the SMTP settings used for contact-form and review notifications.

## Scripts

Frontend:

| Command | Action |
| --- | --- |
| `npm run dev` | Vite dev server |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serve the built output locally |
| `npm run lint` | ESLint (flat config) across the project |

> `npm run lint` currently reports 117 pre-existing problems (mostly missing `prop-types` and unused vars in older files). None are in the recently reworked components.

Backend:

| Command | Action |
| --- | --- |
| `npm start` | Run the server |
| `npm run dev` | Run with nodemon |
| `npm run seed` | Seed MongoDB from `data/data.json` |
| `npm run clear` | Wipe seeded documents |

## Project structure

```
frontend/
├── public/                     copied verbatim into dist/
│   ├── favicon.svg
│   ├── icon.webp               favicon + og/twitter/social share image
│   ├── landing_video.mp4       hero video
│   ├── resume.pdf
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── components/
│   │   ├── Header.jsx, Navbar.jsx, Footer.jsx, ScrollToTop.jsx,
│   │   │   ScrollToTopButton.jsx, ErrorBoundary.jsx, RightSideNav.jsx
│   │   ├── Home.jsx, Skill.jsx, SkillCard.jsx, QATerminal.jsx,
│   │   │   Review.jsx, ReviewCard.jsx, ReviewModal.jsx,
│   │   │   HomepageProjects.jsx, HomepageBlogs.jsx,
│   │   │   HomepageCertificates.jsx, HomepageAchievements.jsx
│   │   ├── ProjectCard.jsx, ProjectCardSkeleton.jsx, BlogCard.jsx,
│   │   │   BlogCardSkeleton.jsx, AchievementsCard.jsx,
│   │   │   CertificationsCard.jsx, ProjectFeaturedCard.jsx,
│   │   │   FeaturedProjectGrid.jsx
│   │   ├── Welcome.jsx, AboutTerminal.jsx, Education.jsx, EducationCard.jsx,
│   │   │   Experience.jsx, ExperienceCard.jsx, ExperienceCompoundCard.jsx,
│   │   │   Chat.jsx, Contact.jsx, SocialShare.jsx
│   │   ├── Button.jsx, CountUp.jsx, RotatingText.jsx,
│   │   │   DraggableTagInput.jsx, Skeleton.jsx
│   │   ├── admin/             reserved, currently empty
│   │   └── ui/                Badge, Card, ExpandLink, FilterBar,
│   │                          Logo, SectionHeading, SectionState
│   ├── contexts/              reserved, currently empty
│   ├── hooks/
│   │   └── useCollection.js    fetches a collection from the API
│   ├── pages/
│   │   ├── LandingPage.jsx, AboutPage.jsx, ContactPage.jsx, PageNotFound.jsx
│   │   ├── ProjectsLibrary.jsx, ProjectDetail.jsx
│   │   ├── BlogsLibrary.jsx, BlogDetail.jsx
│   │   ├── CertificatesLibrary.jsx, CertificateDetail.jsx
│   │   ├── AchievementsLibrary.jsx, AchievementDetail.jsx
│   │   ├── AdminLogin.jsx
│   │   └── admin/
│   │       ├── AdminDashboard.jsx, AdminShell.jsx
│   │       └── ProjectsTab, BlogsTab, CertificatesTab, AchievementsTab,
│   │           ExperienceTab, EducationTab, ReviewsTab, TechStacksTab
│   ├── App.jsx                 router, layout, page transitions
│   ├── index.css               Tailwind layers + hand-drawn design system
│   └── main.jsx
├── components.json
├── eslint.config.js
├── index.html                  SEO meta, JSON-LD, fonts, analytics
├── jsconfig.json
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vercel.json                 SPA rewrite + content-type headers
└── vite.config.js
```

### Content is API-driven

There is no `src/data/` directory. Collections are fetched at runtime through `src/hooks/useCollection.js`, which requests `${VITE_BACKEND_URL}${path}` and exposes `{ items, loading, error, reload }`:

| Component | Endpoint |
| --- | --- |
| `Skill.jsx` | `/api/tech-stacks` |
| `FeaturedProjectGrid.jsx` | `/api/projects` |
| `HomepageCertificates.jsx` | `/api/certificates` |
| `HomepageAchievements.jsx` | `/api/achievements` |
| `Review.jsx` | `/api/reviews` |

The API also serves `/api/blogs`, `/api/experience` and `/api/education`, plus a JWT-guarded `/api/admin/*` tree for writes. User-uploaded imagery is hosted on Cloudinary, so no image files live in the repo.

## Routes

| Path | Page |
| --- | --- |
| `/` | Landing page |
| `/about` | About |
| `/contact` | Contact |
| `/projects`, `/project/:id` | Project library and detail |
| `/blogs`, `/blog/:id` | Blog library and detail |
| `/certificates`, `/certificate/:id` | Certificate library and detail |
| `/achievements`, `/achievement/:id` | Achievement library and detail |
| `/admin-login`, `/admin-dashboard` | Admin (protected) |
| `*` | 404 |

## Styling approach

Tailwind utilities plus a single global stylesheet — no CSS Modules and no runtime CSS-in-JS. `tailwind.config.js` defines the palette (`paper`, `ink`, `postit`, `marker`, `ballpoint`, `gold`), the irregular `wobbly-*` border radii, and the hard offset shadows. `index.css` layers on the semantic classes the components share (`.btn`, `.card`, `.nav-link`, `.icon-btn`, `.headline-1`, `.badge`, `.scribble-underline`) and styles the scrollbar as a pencil-on-paper motif.

## Deployment

`vercel.json` rewrites every path to `/` so client-side routing works on refresh, and forces the correct content type for `sitemap.xml` and `robots.txt`. Point `VITE_BACKEND_URL` at the deployed API.

## License

Licensed under the Apache License, Version 2.0. See [LICENSE](LICENSE) for details.

## Contact

- **GitHub:** [https://github.com/BadBoy-Github](https://github.com/BadBoy-Github)
- **LinkedIn:** [https://www.linkedin.com/in/elayabarathi/](https://www.linkedin.com/in/elayabarathi/)
- **Email:** elayabarathiedison@gmail.com

---

© 2026 Elayabarathi M V. All Rights Reserved.