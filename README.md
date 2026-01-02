# macOS-Inspired Portfolio Application

A modern, keyboard-first productivity application inspired by macOS Spotlight and system-level design patterns. Built with React, Vite, and Tailwind CSS.

**[Live Demo](https://sasankawrites.in/)** • **[GitHub](https://github.com/Sasanka14/MacOs_Portfolio)** 

---

## 📋 Table of Contents
1. [Features](#features)
2. [Getting Started](#getting-started)
3. [Technology Stack](#technology-stack)
4. [Project Structure](#project-structure)
5. [Accessibility](#accessibility)
6. [Credits & Acknowledgements](#credits--acknowledgements)
7. [Roadmap & Versioning](#roadmap--versioning)

---

## ✨ Features

### 🖥️ Window Management System
- Draggable, resizable windows with minimize/maximize/close controls
- Multiple window instances with persistent positioning
- Task management and window layering
- Smooth animations and transitions

### 🔍 Global Search Palette
- **Shortcut:** `⌘ + Space` (or `Ctrl + Space` on Windows/Linux)
- Unified search across apps, folders, files, commands, and calculations
- Scoped search: `find [query] in [folder]`
- Command execution: `open [app]`
- Calculator: Direct arithmetic expression evaluation
- Keyboard navigation with arrow keys and Enter

### 📁 File System & Folders
- Virtual file system with nested folder hierarchy
- File browser with folder navigation
- Text file editing and preview
- Image gallery browsing
- Document management

### 🎨 Gallery & Media
- Multi-view image gallery (grid, list, carousel)
- Favorite tagging and filtering
- Section-based organization (Library, Memories, Places, People, Favorites)
- Image metadata display
- Responsive image rendering

### 🌙 Theme Management
- Light and dark mode toggle
- System preference detection
- Persistent theme selection
- Glassmorphic design with backdrop blur
- High contrast accessibility support

### ⌨️ Keyboard-First Design
- Full keyboard navigation throughout
- Arrow keys for list/grid navigation
- Tab for focus management
- Enter/Space for activation
- Escape to close modals/dialogs
- ARIA labels for screen readers

### 🌡️ Weather Widget
- Real-time weather display (via OpenWeatherMap API)
- Hourly forecast preview
- Geolocation support with fallback to default city
- Auto-refresh every 30 minutes

### 📅 Calendar Integration
- Date picker with month navigation
- Current date highlighting
- Day-of-week headers
- Today indicator

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Sasanka14/MacOs_Portfolio.git
cd MacOs_Portfolio

# Navigate to frontend folder
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run linter
npm run lint
```

The application will start at `http://localhost:5173`

### Initial Setup
1. Set `VITE_WEATHER_API_KEY` in `frontend/.env.local` for weather functionality:
   ```
   VITE_WEATHER_API_KEY=your_openweathermap_api_key_here
   ```

## 🛠️ Technology Stack

### Frontend
- **React 19.2** — Component-driven UI framework
- **Vite 7.2** — Lightning-fast build tool
- **Tailwind CSS 4.1** — Utility-first styling

### State Management
- **Zustand** — Lightweight global state (window, location)
- **React Hooks** — Local component state

### Animation & Interactions
- **GSAP 3.13** — Professional animation library
- **CSS Transitions** — Smooth property changes

### UI Elements
- **Lucide React** — 500+ beautiful icons
- **React Tooltip** — Accessible tooltip component
- **React PDF** — PDF document rendering

### Utilities
- **Day.js** — Lightweight date formatting
- **expr-eval** — Safe arithmetic expression evaluation
- **Immer** — Immutable state updates
- **clsx** — className utility

## 📦 Project Structure

```
portfolio/                          # Root directory
├── frontend/                        # React application (Vite)
│   ├── src/
│   │   ├── components/             # Reusable React components (10 files)
│   │   │   ├── Navbar.jsx         # Top navigation bar
│   │   │   ├── Dock.jsx           # Bottom taskbar
│   │   │   ├── Welcome.jsx        # Hero section + weather widget
│   │   │   ├── SearchPalette.jsx  # Global search interface
│   │   │   ├── WindowControls.jsx # Window control buttons
│   │   │   └── ...
│   │   ├── windows/                # Window components (11 files)
│   │   │   ├── Photos.jsx         # Image & video gallery
│   │   │   ├── Text.jsx           # Text editor
│   │   │   ├── Safari.jsx         # Browser simulation
│   │   │   ├── Terminal.jsx       # Terminal simulation
│   │   │   ├── Finder.jsx         # File browser
│   │   │   ├── Resume.jsx         # Resume viewer
│   │   │   ├── Teams.jsx          # Team members showcase
│   │   │   ├── Contact.jsx        # Contact form
│   │   │   └── views/             # View components
│   │   │       └── LibraryView.jsx # Keyboard-accessible library
│   │   ├── hooks/                  # Custom React hooks (2 files)
│   │   │   ├── useSearch.js       # Search logic and indexing
│   │   │   └── useTheme.js        # Theme management
│   │   ├── store/                  # Zustand state management (2 files)
│   │   │   ├── window.js          # Window state management
│   │   │   └── location.js        # Navigation state
│   │   ├── hoc/                    # Higher-order components (1 file)
│   │   │   └── WindowWrapper.jsx  # Window container wrapper
│   │   ├── constants/              # App configuration (1 file)
│   │   │   └── index.js           # All data, locations, configs
│   │   ├── index.css               # Global styles + Tailwind
│   │   ├── main.jsx                # React entry point
│   │   └── App.jsx                 # Root component
│   ├── public/                      # Static assets
│   │   ├── icons/                 # SVG and PNG icons
│   │   ├── images/                # Portfolio images
│   │   ├── videos/                # Video files
│   │   ├── files/                 # Document files
│   │   └── macbook.png            # Hero image
│   ├── package.json                # Dependencies and scripts
│   ├── vite.config.js              # Vite build configuration
│   ├── eslint.config.js            # ESLint configuration
│   ├── jsconfig.json               # JavaScript configuration
│   ├── index.html                  # HTML entry point
│   ├── .env.local                  # Environment variables (local)
│   ├── .gitignore                  # Git ignore rules
│   └── node_modules/               # Dependencies (auto-generated)
├── .git/                            # Git version control
├── README.md                        # This file - Complete documentation
└── .gitignore                       # Root git ignore rules
```

### Folder Structure Explanation

**Frontend Monorepo Setup:**
- All source code lives in `frontend/` folder
- Enables future backend addition in separate `backend/` folder
- Each folder is independent and can be deployed separately

## 📖 Key Concepts

### Search Index
The application maintains a unified, in-memory search index containing:
- **Apps:** Launchable applications
- **Folders:** Virtual file system navigation
- **Files:** Documents with metadata
- **Commands:** System-level actions (theme switching, navigation)
- **Calculations:** Safe arithmetic expression evaluation

Search ranking prioritizes exact matches, then keyword matches, then partial matches.

### Window System
Windows are draggable, resizable React components powered by GSAP animations. Each window:
- Can be minimized/maximized/closed
- Maintains position and size in state
- Supports keyboard focus management
- Renders content from dedicated window components

### Keyboard Navigation
Every interactive element is keyboard-accessible:
- Input fields are focusable and support text entry
- Buttons support Enter/Space activation
- Lists support arrow key navigation
- Dialogs can be closed with Escape
- Screen readers receive ARIA labels and descriptions

## 🎯 Version & Roadmap

### Version 1 (Current) ✅
- ✅ Frontend-only application
- ✅ In-memory data
- ✅ UI/UX showcase
- ✅ System interaction patterns

### Version 2 (Planned)
- Backend API integration
- Database persistence
- User authentication
- Real file system access
- Performance optimizations

### Version 3 (Planned)
- Full-stack optimization
- Advanced search indexing
- Production scalability
- Mobile applications

## ♿ Accessibility

This project is built with accessibility as a first-class concern:

- **Keyboard Navigation:** Full keyboard support for all features
- **ARIA Labels:** Semantic HTML with proper ARIA attributes
- **Focus Management:** Visible focus indicators throughout
- **Color Contrast:** WCAG AA compliant contrast ratios
- **Screen Readers:** Support for NVDA, JAWS, VoiceOver
- **Dark Mode:** Comfortable viewing in low-light environments

### Testing Accessibility
- Test with keyboard: Tab, Shift+Tab, Enter, Space, Escape, Arrow Keys
- Test with screen reader: VoiceOver (Mac), NVDA (Windows), JAWS
- Check with accessibility tools: Axe DevTools, WAVE, Lighthouse

## 📚 Learning Resources

This project demonstrates:
- React Hooks (useState, useEffect, useCallback, useMemo, useContext)
- Component composition and reusability
- Advanced state management patterns
- CSS-in-JS and utility-first styling
- Animation and interaction design
- Keyboard accessibility implementation
- System architecture and design patterns

## 🐛 Known Limitations (v1)

- No actual file system access (simulated)
- No backend data persistence
- No real email/messaging (simulated)
- Search is limited to pre-indexed content
- Window positions reset on page reload
- Weather API requires external key configuration

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

MIT License - Feel free to use this project for your own purposes.

## 🙏 Credits

This project stands on the shoulders of incredible open-source software and design inspiration.

**Key inspirations:**
- **macOS** — System design and interaction patterns
- **Spotlight** — Search interface design
- **Raycast** — Keyboard-first productivity
- **React** — Component architecture
- **Tailwind CSS** — Design system and styling

## 📞 Contact & Links

- **GitHub:** [@Sasanka14](https://github.com/Sasanka14)
- **LinkedIn:** [Sasanka Writes](https://www.linkedin.com/in/sasankawrites/)
- **Instagram:** [@sashank.codes_](https://www.instagram.com/sashank.codes_)
- **Blog:** [Insight Forged](https://insightforgedotcom.wordpress.com/)

---

# Credits & Project Information

## 🙏 Credits & Acknowledgements

This project is built on the shoulders of exceptional open-source tools, libraries, and design inspiration from the broader developer community.

### Frontend Framework & Build
- **[React](https://react.dev)** (v19.2.0) — JavaScript library for building interactive user interfaces with component-driven architecture
- **[Vite](https://vitejs.dev)** (v7.2) — Next-generation frontend build tool providing instant server start and lightning-fast HMR
- **[Node.js](https://nodejs.org)** — JavaScript runtime environment enabling server-side JavaScript execution

### Styling & Design
- **[Tailwind CSS](https://tailwindcss.com)** (v4.1) — Utility-first CSS framework for rapidly building custom designs
- **[@tailwindcss/vite](https://tailwindcss.com)** — Official Tailwind CSS integration for Vite
- **[Glassmorphism](https://glassmorphism.com)** — Design trend inspiration for frosted glass effect UI components

### Icons & Assets
- **[Lucide React](https://lucide.dev)** (v0.554.0) — Beautiful, consistent open-source icon library with 500+ icons
- **[macOS Design System](https://developer.apple.com/design/human-interface-guidelines/macos)** — Official design guidelines inspiring the UI aesthetic

### State Management & Data
- **[Zustand](https://zustand.docs.pmnd.rs)** (v5.0.8) — Lightweight state management library with minimal boilerplate
- **[Immer](https://immerjs.github.io/immer)** (v11.0.0) — Immutable state management utilities for simplified updates
- **[expr-eval](https://github.com/silentmatt/expr-eval)** (latest) — Safe arithmetic expression parser and evaluator

### Animation & Interaction
- **[GSAP](https://gsap.com)** (v3.13.0) — Professional animation library for smooth, performant interactions
- **[@gsap/react](https://gsap.com/react)** (v2.1.2) — Official React integration for GSAP

### UI Components & Utilities
- **[React Tooltip](https://react-tooltip.js.org)** (v5.30.0) — Lightweight tooltip component for accessible hints
- **[React PDF](https://react-pdf.org)** (v10.2.0) — PDF rendering component for document display
- **[Day.js](https://day.js.org)** (v1.11.19) — Minimal JavaScript date library (2KB alternative to Moment.js)
- **[clsx](https://github.com/lukeed/clsx)** (v2.1.1) — Tiny utility for constructing className strings

### Development & Code Quality
- **[ESLint](https://eslint.org)** — Static code analysis tool for identifying problematic patterns
- **[Vite ESLint Plugin](https://github.com/gxmari007/vite-plugin-eslint)** — Eslint integration for Vite dev server
- **[JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)** — Modern JavaScript (ES2020+) with React JSX syntax

### Design Inspiration & Philosophy
- **[macOS](https://www.apple.com/macos)** — Design language, interaction patterns, and system architecture inspiration
- **[Spotlight](https://support.apple.com/en-us/HT204014)** — Quick search and launcher interface
- **[Raycast](https://www.raycast.com)** — Modern productivity launcher with keyboard-first design
- **[Windows 11](https://www.microsoft.com/en-us/windows/windows-11)** — Fluent Design System influences

---

## 🏗️ Tech Stack Overview

### Frontend Architecture
- **Framework:** React 19.2 (with Hooks, Suspense)
- **Build Tool:** Vite 7.2 (ES modules, dev server, HMR)
- **Styling:** Tailwind CSS 4.1 (utility-first, dark mode support)
- **Icons:** Lucide React (500+ SVG icons)

### System Architecture
- **Window Management:** Draggable, resizable window system (GSAP + React)
- **Global Search:** Frontend-only unified search index with fuzzy matching
- **State Management:** Zustand (global window state, location state)
- **In-Memory Data:** Client-side data structures (no backend persistence)

### Design Philosophy
- **macOS-Inspired:** Familiar OS-level interactions and visual hierarchy
- **Glassmorphism:** Frosted glass effect with backdrop blur and transparency
- **Keyboard-First:** Full keyboard navigation and accessibility (a11y)
- **Dark Mode:** Native dark mode support across all components
- **Responsive:** Mobile-friendly design with breakpoint-based layouts

### ✨ Key Features
- Draggable window system with minimize, maximize, and close controls  
- Global search palette (`⌘ + Space`) with scoped search support  
- Unified search across apps, folders, files, commands, and calculations  
- Dark / light theme toggle with system preference detection  
- Full keyboard navigation (Arrow keys, Enter, Space, Escape)  
- Image gallery with grid, list, and carousel view modes  
- Rich text editing with document preview  
- Built-in PDF rendering and viewing  
- Real-time weather widget using live API data  
- Calendar and date utilities  
- Accessible UI with ARIA labels and semantic HTML  

---

## 📦 Project Versioning & Roadmap

### Current Release: **Version 1 (v1)**

**Status:** Production-ready frontend showcase

**Scope:**
- ✅ Frontend-only application
- ✅ No backend server
- ✅ In-memory data (localStorage for user preferences)
- ✅ UI/UX-focused design and interactions
- ✅ System-level behavior simulation (windows, search, widgets)
- ✅ Keyboard-first navigation and accessibility
- ✅ Dark mode support
- ✅ Mobile-responsive design

**What v1 Does NOT Have:**
- ❌ Backend API or database
- ❌ User authentication
- ❌ Persistent data storage
- ❌ Real file system access
- ❌ Real email/chat functionality
- ❌ Advanced search indexing or fuzzy matching

**Best For:**
- Portfolio demonstration
- UX/interaction design showcase
- Learning React + Vite + Tailwind
- System design concepts and patterns

---

### Planned: **Version 2 (v2)**

**Target Timeline:** 2026

**Goals:**
- Backend API (Node.js, Express, or similar)
- Database integration (PostgreSQL or MongoDB)
- User authentication (JWT, OAuth)
- Persistent data storage
- Real file/folder operations
- Email integration (sending/receiving)
- Search indexing optimization
- Performance monitoring

**New Capabilities:**
- 📧 Real email client functionality
- 📁 Actual file management
- 🔐 User accounts and authentication
- 💾 Data persistence across sessions
- 📊 Analytics and usage tracking
- 🔔 Notifications system

---

### Planned: **Version 3 (v3)**

**Target Timeline:** 2026-2027

**Goals:**
- Full-stack optimization
- Production-grade performance
- Advanced search capabilities
- Horizontal scalability
- Containerization (Docker)
- CI/CD pipeline
- Comprehensive testing

**New Capabilities:**
- 🚀 Performance optimizations (caching, lazy loading, code splitting)
- 🔍 Advanced search with Elasticsearch
- 📈 Scalable architecture for multiple users
- 🧪 Full test coverage (unit, integration, e2e)
- 📱 Native mobile apps (React Native)
- ♿ Enhanced accessibility (WCAG 2.1 AA compliance)

---

## 📸 Screenshots & Preview

The following screenshots and demonstrations represent **Version 1** of this project.

### User Interface Highlights
<p align="center">
  <img src="https://github.com/user-attachments/assets/49c42248-86b8-45f7-b184-490ab7adae75" width="48%" />
  <img src="https://github.com/user-attachments/assets/3c665c8b-af48-4b40-8a26-b3047921b1f9" width="48%" />
</p>



### Important Notes
- UI and features will evolve significantly in v2 and v3
- Current design is focused on frontend interaction patterns
- Backend integration will change data flow and architecture
- Performance characteristics will improve with production optimization

**Roadmap for UI/UX:**
- v1: Proof of concept and interaction design
- v2: Feature parity with real backend operations
- v3: Enterprise-grade UI with advanced visualizations

---

## 🤝 Transparency Statement

### What This Project Is
This is an **evolving learning project** that serves dual purposes:

1. **Educational:** Demonstrates React, Vite, Tailwind CSS, and system design patterns
2. **Product-Thinking:** Explores building a cohesive, polished product experience
3. **Portfolio:** Showcases frontend engineering and design skills

### What This Project Is NOT
- ❌ A complete production system (yet)
- ❌ A real macOS replacement
- ❌ A commercial product
- ❌ Overpromised or feature-complete

### Development Philosophy
- **Honest scoping:** Clear distinction between v1, v2, and v3 capabilities
- **Quality over features:** Focused on depth of implementation, not breadth
- **Open to feedback:** Receptive to suggestions and improvements
- **Continuous evolution:** Committed to roadmap and future development

### Learning Outcomes
Through building this project, we've explored:
- ✅ Complex React component hierarchies and state management
- ✅ CSS-in-JS and utility-first styling approaches
- ✅ Advanced animations and interactions (GSAP)
- ✅ Keyboard accessibility and keyboard-first UX
- ✅ Dark mode implementation and theme switching
- ✅ Build tooling and development workflow optimization
- ✅ System design and architecture patterns
- ✅ Design thinking and product development

### Vision
The goal is to evolve this into a **full-featured productivity application** while maintaining the clean, intuitive design that makes v1 special. Each version builds on the previous one, adding depth and capability without losing the focus on user experience.

---

## 📋 License & Attribution

**Project:** macOS-Inspired Portfolio Application

**Author:** [Sasanka](https://github.com/Sasanka14)

**License:** MIT License

**Repository:** [MacOs_Portfolio](https://github.com/Sasanka14/MacOs_Portfolio)

All third-party libraries are used according to their respective licenses. See `package.json` for complete dependency list and versions.

---

## 🙌 Special Thanks

- **The React Community** for continuous innovation and excellent documentation
- **Tailwind CSS Team** for making CSS enjoyable again
- **Lucide Icons** for beautiful, consistent iconography
- **macOS Design** for inspiration and interaction patterns
- **All contributors** and users who provide feedback and improvement suggestions

---

**Last Updated:** January 1, 2026

**Project Status:** Active Development — v1 Complete, v2 Planning Phase

Made with ❤️ by [Sasanka](https://github.com/Sasanka14)
