# <img src="logo3.png" alt="YourCSPath" height="35"> YourCSPath

<div align="center">

### 🎓 The Smart Career Guidance Platform for Computer Science Students

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-yourcspath.netlify.app-4169E1?style=for-the-badge)](https://yourcspath.netlify.app)
[![Made With Love](https://img.shields.io/badge/Made_With-❤️-red?style=for-the-badge)](#)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](#license)
[![Status](https://img.shields.io/badge/Status-Live_✅-brightgreen?style=for-the-badge)](#)

<br>

> **Stop guessing. Find your perfect CS career path in 2 minutes.**  
> Personalised roadmaps · Real salary data · Certifications · Remote job boards — all in one place.

<br>

![YourCSPath Hero](https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=900&q=80)

</div>

---

## 📌 Table of Contents

- [About the Project](#-about-the-project)
- [Live Demo](#-live-demo)
- [Features](#-features)
- [Career Paths](#-career-paths)
- [How It Works](#-how-it-works)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Contributors](#-contributors)
- [License](#-license)

---

## 🧠 About the Project

**YourCSPath** is a free, personalised career guidance platform built specifically for Computer Science students. Most CS students spend months — sometimes years — studying the wrong thing simply because they had no clear direction.

YourCSPath solves that with a **2-minute quiz** that analyses your interests, skills, math comfort, and career goals, then instantly scores and ranks the 6 most in-demand CS career paths based on your unique profile.

Each career path comes with:
- ✅ A **9-phase structured learning roadmap** with real courses
- ✅ **Certifications** ranked by tier — Beginner, Intermediate, Advanced
- ✅ **Career growth timelines** with honest salary data per year
- ✅ **Specialisation guides** with tools and market demand
- ✅ **Curated remote job boards** for internships and full-time roles

No account. No spam. No fluff. Just results.

---

## 🚀 Live Demo

🌐 **[https://yourcspath.netlify.app](https://yourcspath.netlify.app)**

| Page | Link |
|------|------|
| 🏠 Homepage | `/index.html` |
| 🎯 Career Quiz | `/quiz.html` |
| 💻 Web Development | `/webdevelopment.html` |
| 🤖 AI / ML Engineering | `/AI-ML.html` |
| 📱 Mobile Development | `/mobile-dev.html` |
| 📊 Data Science | `/data-science.html` |
| 🔐 Cybersecurity | `/cybersecurity.html` |
| ☁️ Cloud Computing | `/cloud-computing.html` |

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🎯 **Smart Career Quiz** | 11 weighted questions that score your profile against 6 CS paths and rank your top 3 matches instantly |
| 🗺️ **9-Phase Roadmaps** | Every career path has a complete snake-layout roadmap with phases, topics, tools, and linked real courses |
| 📈 **Salary Timelines** | Honest career growth timelines from Year 1 to Year 7+ with real salary ranges at every stage |
| 🏅 **Certifications Guide** | Certs ranked by tier (Beginner / Intermediate / Advanced) with cost, description, and official links |
| 🔍 **Specialisations** | Deep-dive into sub-domains within each career path — with skills, tools, and market importance |
| 💼 **Remote Job Boards** | Curated internship and full-time job platforms specific to each career path |
| 🌙 **Dark Mode** | Full dark mode with persistent preference saved to localStorage |
| 📱 **Mobile Responsive** | Fully responsive with hamburger menu and mobile-optimised layouts on all pages |
| ⚡ **No Backend Needed** | Pure HTML, CSS, and JavaScript — zero dependencies, zero build steps |

---

## 🛤️ Career Paths

<div align="center">

| Path | Avg Salary | Growth | Key Skills |
|------|-----------|--------|------------|
| 💻 Web Development | $119K | 16% | React, Node.js, TypeScript |
| 🤖 AI / ML Engineering | $187K | 40% | Python, PyTorch, LangChain |
| 📱 Mobile Development | $126K | 21% | Swift, Kotlin, Flutter |
| 📊 Data Science | $112K | 34% | Python, SQL, Tableau |
| 🔐 Cybersecurity | $120K | 35% | Networking, Pentesting, SIEM |
| ☁️ Cloud Computing | $135K | 23% | AWS, Docker, Kubernetes |

</div>

---

## ⚙️ How It Works

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   1. Answer 11 questions  →  2 minutes, no account needed  │
│                                                             │
│   2. Quiz engine scores your profile against 6 paths       │
│      using a weighted algorithm across 8 question groups   │
│                                                             │
│   3. See your Top 3 matches ranked by score (/8)           │
│      with personalised explanations for each match         │
│                                                             │
│   4. Click any path → Full 9-phase roadmap, certs,         │
│      career timeline, and remote job boards                 │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Quiz Scoring System

The quiz uses a **weighted multi-factor scoring engine** (`form-logic.js`):

- **8 scored questions** each award points to specific career paths
- High-signal questions (e.g. dream project, problem type) award up to **14 points**
- Medium-signal questions (e.g. salary preference, growth mindset) award **6–9 points**
- Scores are **normalised** against the theoretical maximum per path
- Results display as a `/8` rating with animated score bars
- Top 3 paths shown with **rank labels**, **match scores**, and **personalised why text**

---

## 🛠️ Tech Stack

```
Frontend Only — No Framework, No Backend, No Build Tool
```

| Technology | Usage |
|-----------|-------|
| **HTML5** | Semantic structure across all pages |
| **CSS3** | Custom properties, Grid, Flexbox, animations |
| **Vanilla JavaScript** | Quiz logic, scroll animations, dark mode, modals |
| **Google Fonts** | Epilogue (display) + JetBrains Mono (code) |
| **Unsplash** | High-quality images via CDN (no download needed) |
| **Netlify** | Hosting and continuous deployment |

> No React. No Vue. No npm. No build process.  
> Open `index.html` in a browser and it works.

---

## 📁 Project Structure

```
yourcspath/
│
├── index.html                  ← Landing page (homepage)
├── quiz.html                   ← Career quiz + results
├── form-logic.js               ← Quiz scoring engine
│
├── webdevelopment.html         ← Web Dev career path
├── AI-ML.html                  ← AI/ML Engineering path
├── mobile-dev.html             ← Mobile Development path
├── data-science.html           ← Data Science path
├── cybersecurity.html          ← Cybersecurity path
├── cloud-computing.html        ← Cloud Computing path
│
├── homepage-style.css          ← Global styles + nav + hero
├── pages.css                   ← Shared career page styles + footer
├── pages.js                    ← Shared JS (dark mode, scroll, modals, footer)
├── script.js                   ← Auth page script (login/register UI)
│
└── logo3.png                   ← YourCSPath logo
```

---

## 🚀 Getting Started

### Option 1 — Open Directly (Simplest)

```bash
# Clone the repository
git clone https://github.com/sohail-logics/yourcspath.git

# Navigate into it
cd yourcspath

# Open in browser — no server needed
open index.html
```

### Option 2 — Run with Live Server (Recommended for development)

If you use **VS Code**:
1. Install the **Live Server** extension
2. Right-click `index.html`
3. Click **Open with Live Server**
4. Opens at `http://127.0.0.1:5500`

### Option 3 — Deploy Your Own Copy on Netlify

1. Fork this repository
2. Go to [netlify.com](https://netlify.com)
3. Click **Add new site** → **Import from GitHub**
4. Select the forked repo
5. Leave build settings empty — click **Deploy**
6. Live in 30 seconds ✅

---

## 👨‍💻 Contributors

<div align="center">

| | Name | Role | GitHub | LinkedIn |
|-|------|------|--------|----------|
| 👨‍💻 | **Sohail Ahmad** | Co-founder · Lead Developer | [![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat&logo=github&logoColor=white)](https://github.com/sohail-logics) | [![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=flat&logo=linkedin&logoColor=white)](https://linkedin.com/in/sohail-logics) |
| 👨‍💻 | **Zeeshan Ahmad** | Co-founder · Developer | [![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat&logo=github&logoColor=white)](https://github.com/zeeshan-builds) | [![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=flat&logo=linkedin&logoColor=white)](https://linkedin.com/in/zeeshan-builds) |

<br>

> Built with ❤️ by two CS students who were tired of not knowing which path to take.

</div>

---

## 🗺️ Roadmap / Future Plans

- [ ] Add more career paths (Game Dev, Blockchain, DevRel)
- [ ] Add user accounts to save quiz results
- [ ] Add community forum per career path
- [ ] Add mentor matching feature
- [ ] Translate to Urdu for Pakistani students
- [ ] Add progress tracker for roadmap phases
- [ ] Mobile app version (React Native)

---

## 🐛 Found a Bug or Have a Suggestion?

Open an **Issue** on GitHub:

1. Go to the **Issues** tab in this repo
2. Click **New Issue**
3. Describe the bug or suggestion clearly
4. We'll respond within 48 hours

Or use the **Feedback** button built into the website footer.

---

## 📄 License

```
MIT License

Copyright (c) 2025 Sohail Ahmad & Zeeshan Ahmad

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software to use, copy, modify, merge, publish, distribute, sublicense,
and/or sell copies of the Software, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

---

<div align="center">

**⭐ If YourCSPath helped you — please give it a star on GitHub! It means a lot. ⭐**

<br>

[![Star this repo](https://img.shields.io/github/stars/sohail-logics/yourcspath?style=social)](https://github.com/sohail-logics/yourcspath)

<br>

Made with ❤️ by [Sohail Ahmad](https://linkedin.com/in/sohail-logics) & [Zeeshan Ahmad](https://linkedin.com/in/zeeshan-builds)

</div>
