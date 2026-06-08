# Rohith Ranganadham — Portfolio Website

Dark futuristic AI-themed personal portfolio.

## Files

```
rohith-portfolio/
├── index.html          ← Main HTML file (open this in browser)
├── css/
│   └── style.css       ← All styles
├── js/
│   └── main.js         ← Animations, typed text, canvas, scroll effects
├── resume.pdf          ← Place your resume PDF here
└── README.md
```

## Usage

1. **Open locally**: Double-click `index.html` to preview in browser.
2. **Add resume**: Place your resume PDF as `resume.pdf` in the root folder.
3. **Deploy**: Upload all files to any static host (GitHub Pages, Netlify, Vercel).

## Deploy to GitHub Pages

```bash
# 1. Create a repo at github.com/Rohith4361/Rohith4361.github.io
# 2. Upload all files
# 3. Enable GitHub Pages in Settings → Pages → main branch
# Site will be live at: https://rohith4361.github.io
```

## Deploy to Netlify (Drag & Drop)

1. Go to https://app.netlify.com
2. Drag the entire `rohith-portfolio` folder onto the page
3. Your site goes live in seconds

## Features

- Animated particle network canvas background
- Glitch text effect on name
- Typed headline animation
- Scroll-triggered reveal animations
- Skill bars animated on scroll
- Stat counters animated on scroll
- Custom cursor glow (desktop)
- Live GitHub stats via github-readme-stats API
- Fully responsive (mobile, tablet, desktop)
- Active nav link highlighting
- Mobile hamburger menu
- Terminal UI in contact section

## Customization

All colors are CSS variables in `:root` (css/style.css):
- `--cyan`: Primary accent (#00f0ff)
- `--pink`: Secondary accent (#ff4e6a)
- `--green`: Success/highlight (#00ff88)
- `--purple`: Tertiary (#a855f7)
