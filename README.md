<div align="center">

# 🚀 Youcef Megoura Portfolio

**A modern, performant, and multilingual portfolio website built with Next.js 16.**

[![Next.js](https://img.shields.io/badge/Next.js-16.2-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-blue?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.2-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](#-license)

[View Live Demo](https://youcefmegoura.online) · [Report Bug](https://github.com/youcefmegoura/youcefmegoura.online/issues) · [Request Feature](https://github.com/youcefmegoura/youcefmegoura.online/issues)
</div>

---

## ✨ Features

- 🌍 **Multilingual**: Seamless French and English support via i18n.
- 🎨 **Responsive & Themed**: Mobile-first design with automatic/manual Dark & Light modes.
- ⚡ **Blazing Fast**: Static site generation (SSG) with Next.js export.
- 📂 **YAML CMS**: Easily manage projects, experience, and skills without touching the code.
- 🪄 **Interactive UI**: Fluid animations with Framer Motion, particle effects, and D3.js client networking graphs.
- 📈 **Built-in Analytics**: Out-of-the-box support for Google Analytics and Microsoft Clarity.

---

## 🛠 Tech Stack

| Category       | Technologies                                  |
|----------------|-----------------------------------------------|
| **Core**       | Next.js 16.2, React 19.2, TypeScript 6.0      |
| **Styling**    | Tailwind CSS 4.2, Framer Motion, Lucide React |
| **Visuals**    | tsParticles, D3.js                            |
| **Deployment** | Docker, Netlify, GitHub Actions               |

---

## 🚀 Quick Start

Get the project up and running locally in under a minute.

```bash
# 1. Clone the repository
git clone https://github.com/youcefmegoura/youcefmegoura.online.git
cd youcefmegoura.online

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

Your site is now running at http://localhost:3000

---

## 📝 Content Management

No database required. All site data is driven by simple YAML files located in the content/ directory.

You can easily toggle entire sections on or off in content/sections.yaml:

```yaml
about: true
experience: true
projects: true
skills: true
```

---

## 🚢 Deployment

### Docker (Recommended)

Deploy instantly using the provided Docker configuration:

```bash
docker-compose up -d
```

### Netlify / Static Hosting

The project is configured for static export. Simply push to the main branch to trigger the GitHub Actions CI/CD pipeline, or build manually:

```bash
npm run build
# Deploy the generated `out/` directory to any static host
```

---

## 🤝 Contributing

Contributions make the open-source community an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'feat: Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
