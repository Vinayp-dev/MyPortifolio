# Vinay Purilla — Portfolio

A minimalist portfolio with doodle accents and scroll-driven storytelling. Built with vanilla HTML, CSS, and GSAP — no build step required.

## Design

- **Minimalism** — clean typography, generous whitespace, limited palette
- **Doodle UI** — hand-drawn badges, sketch borders, Caveat font accents
- **Scrollytelling** — pinned narrative section that unfolds as you scroll

## Quick start

Open `index.html` in your browser:

```bash
# Windows
start index.html

# Or use a local server (recommended)
python -m http.server 3000
# Then visit http://localhost:3000
```

## Project structure

```
vinay-portfolio/
├── index.html      # Main page
├── css/styles.css  # Design system + layout
├── js/main.js      # GSAP scrollytelling animations
└── README.md
```

## Sections

1. Hero — intro with doodle SVG
2. Story — scrollytelling (who / what / where)
3. Education — B.Tech AI & Data Science
4. Skills — languages, tools, cloud
5. Experience — Oasis Infobyte internship
6. Projects — 3 featured projects
7. Achievements & Certifications
8. Contact — email, phone, GitHub, LinkedIn

## Future: Next.js version

Node.js wasn't available during initial setup. To migrate to Next.js + Framer Motion:

1. Install [Node.js](https://nodejs.org/)
2. Run `npx create-next-app@latest . --typescript --tailwind --app`
3. Port components from this static version

## Deploy

Deploy to [Vercel](https://vercel.com), [Netlify](https://netlify.com), or [GitHub Pages](https://pages.github.com) by uploading this folder or connecting the repo.

## License

Personal portfolio — © Vinay Purilla 2026
