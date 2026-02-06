# macOS-Inspired Portfolio Application

A modern, keyboard-first productivity application inspired by macOS Spotlight and system-level design patterns. Built with React, Vite, and Tailwind CSS, featuring adaptive desktop and mobile experiences.

**[Live Demo](https://sasankawrites.in/)** • **[GitHub](https://github.com/Sasanka14/MacOs_Portfolio)** 

---

## 📋 Table of Contents
1. [Features](#features)
2. [Architecture Overview](#architecture-overview)
3. [Getting Started](#getting-started)
4. [Technology Stack](#technology-stack)
5. [Project Structure](#project-structure)
6. [Mobile & Platform Support](#mobile--platform-support)
7. [Accessibility](#accessibility)
8. [Development Roadmap](#development-roadmap)
9. [Credits & Acknowledgements](#credits--acknowledgements)

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

### 📱 Mobile & Cross-Platform Support
- **Adaptive Rendering:** Automatic detection and switching between desktop and mobile experiences
- **iOS App Interface:** Dedicated mobile interface (iOS-inspired design)
- **NFC Ready:** Architecture prepared for future NFC functionality integration
- **Responsive Breakpoints:** Optimized layouts for all screen sizes
- **Touch-Friendly:** Mobile-optimized interactions and gestures

## 🏗️ Architecture Overview

### Multi-Platform Design
The application uses a sophisticated architecture to deliver platform-appropriate experiences:

```javascript
// Adaptive rendering based on device detection
const AppRoot = () => {
  const isMobile = window.innerWidth < 768;
  return isMobile ? <IOSApp /> : <DesktopApp />;
};
```

### Desktop Experience (`DesktopApp`)
- Full macOS-inspired windowing system
- Draggable, resizable windows with GSAP animations
- Advanced keyboard navigation and shortcuts
- Complex multi-window management
- Rich desktop interactions (dock, menubar, spotlight search)

### Mobile Experience (`IOSApp`)
- iOS-native interface patterns
- Touch-first interaction design
- Optimized for mobile performance
- Simplified navigation structure
- Mobile-specific UI components

### Shared Infrastructure
- **State Management:** Unified Zustand stores across platforms
- **Component Library:** Reusable UI components with platform variants
- **Search Engine:** Cross-platform search functionality
- **Theme System:** Consistent theming across desktop and mobile

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
- **Immer** — Immutable state updates
- **clsx** — className utility

## 📦 Project Structure

```
MacOs_Portfolio/                     # Root directory
├── backend/                         # Backend API (Version 2)
│   └── .gitkeep                    # Placeholder for future backend
├── frontend/                        # React application (Vite)
│   ├── src/
│   │   ├── AppRoot.jsx             # Platform detection & routing
│   │   ├── main.jsx                # React entry point
│   │   ├── index.css               # Global styles + Tailwind
│   │   ├── app/                    # Platform-specific applications
│   │   │   ├── desktop/            # Desktop experience
│   │   │   │   └── DesktopApp.jsx # Full macOS-inspired interface
│   │   │   ├── mobile/             # Mobile experience
│   │   │   │   └── IOSApp.jsx     # iOS-inspired mobile interface
│   │   │   └── nfc/                # NFC functionality (future)
│   │   ├── components/             # Shared UI components (11 files)
│   │   │   ├── Navbar.jsx         # Top navigation bar
│   │   │   ├── Dock.jsx           # Bottom taskbar (desktop)
│   │   │   ├── Welcome.jsx        # Hero section + weather widget
│   │   │   ├── SearchPalette.jsx  # Global search interface
│   │   │   ├── WindowControls.jsx # Window control buttons
│   │   │   ├── ThemeProvider.jsx  # Theme management context
│   │   │   ├── ThemeMenu.jsx      # Theme switching interface
│   │   │   ├── UserMenu.jsx       # User profile menu
│   │   │   ├── LoadingScreen.jsx  # App initialization screen
│   │   │   ├── Home.jsx           # Main content area
│   │   │   └── index.js           # Component exports
│   │   ├── windows/                # Desktop window components (10 files)
│   │   │   ├── Photos.jsx         # Image & video gallery
│   │   │   ├── Text.jsx           # Text editor
│   │   │   ├── Safari.jsx         # Browser simulation
│   │   │   ├── Terminal.jsx       # Terminal simulation
│   │   │   ├── Finder.jsx         # File browser
│   │   │   ├── Resume.jsx         # Resume viewer
│   │   │   ├── Teams.jsx          # Team members showcase
│   │   │   ├── Contact.jsx        # Contact form
│   │   │   ├── Image.jsx          # Image viewer
│   │   │   ├── index.js           # Window exports
│   │   │   └── views/             # Specialized view components
│   │   │       └── LibraryView.jsx # Keyboard-accessible library
│   │   ├── shared/                 # Cross-platform shared resources
│   │   │   ├── constants/         # App configuration & data
│   │   │   │   └── index.js       # Navigation, apps, files config
│   │   │   └── store/             # Zustand state management
│   │   │       ├── window.js      # Window state (desktop)
│   │   │       └── location.js    # Navigation state (global)
│   │   ├── hooks/                  # Custom React hooks (2 files)
│   │   │   ├── useSearch.js       # Search logic and indexing
│   │   │   └── useTheme.js        # Theme management
│   │   └── hoc/                    # Higher-order components
│   │       └── WindowWrapper.jsx  # Window container wrapper
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
│   ├── .env.local                  # Environment variables
│   └── .gitignore                  # Frontend ignore rules
├── README.md                        # Complete documentation
└── .gitignore                       # Root ignore rules
```

### Folder Structure Explanation

**Multi-Platform Architecture:**
- **AppRoot.jsx:** Platform detection and routing logic
- **app/desktop/:** Full desktop experience with windowing system
- **app/mobile/:** iOS-inspired mobile interface
- **app/nfc/:** Prepared for future NFC functionality
- **shared/:** Cross-platform resources (constants, store)
- **components/:** Reusable UI components for both platforms

**Development Benefits:**
- Clean separation of concerns between platforms
- Shared business logic and state management
- Easy to add new platforms (Android, desktop apps, etc.)
- Modular architecture for future backend integration

## 📱 Mobile & Platform Support

### Current Platform Support
- ✅ **Desktop Web:** Full macOS-inspired experience
- ✅ **Mobile Web:** iOS-inspired responsive interface  
- 🚧 **NFC Integration:** Architecture prepared (feature branch)
- 🔮 **Native Apps:** Planned for Version 3

### Mobile Features
- **Automatic Detection:** Responsive breakpoint at 768px
- **Touch Optimization:** Mobile-friendly interactions
- **Performance:** Optimized rendering for mobile devices
- **iOS Design Language:** Native iOS interface patterns

### Cross-Platform State Management
```javascript
// Shared stores work across all platforms
import { useWindowStore } from '#shared/store/window';
import { useLocationStore } from '#shared/store/location';

// Platform-specific components
const DesktopWindow = () => { /* Desktop windowing */ };
const MobileSheet = () => { /* Mobile bottom sheet */ };
```

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

## 🎯 Development Roadmap

### ✅ Version 1.0 (Current - Desktop Complete)
**Status:** Production-ready desktop experience

**Completed Features:**
- ✅ Desktop macOS-inspired interface
- ✅ Full windowing system with GSAP animations
- ✅ Global search palette (`⌘ + Space`)
- ✅ Advanced keyboard navigation
- ✅ Dark/light theme system
- ✅ Weather API integration
- ✅ PDF rendering and document management
- ✅ Image gallery with multiple view modes
- ✅ Accessibility compliance (WCAG AA)

---

### 🚧 Version 1.5 (Current Development - Mobile Branch)
**Status:** Active development on `feature-mobile` branch

**In Progress:**
- 🚧 iOS-inspired mobile interface (`IOSApp`)
- 🚧 Mobile-optimized touch interactions  
- 🚧 Responsive component variants
- 🚧 Platform detection and routing
- 🚧 NFC infrastructure preparation

**Planned for Mobile:**
- 📱 Touch gestures and mobile navigation
- 📱 Mobile-specific UI patterns
- 📱 Progressive Web App (PWA) features
- 📱 Optimized performance for mobile devices

---

### 🔮 Version 2.0 (Backend Integration - 2026)
**Target:** Full-stack application

**Planned Features:**
- 🔧 Node.js/Express backend API
- 🔧 Database integration (PostgreSQL/MongoDB)
- 🔧 User authentication (JWT, OAuth)
- 🔧 Real-time data persistence
- 🔧 File system operations
- 🔧 Email functionality
- 🔧 Advanced search indexing
- 🔧 Performance monitoring

---

### ✨ Version 3.0 (Enterprise Ready - 2027)
**Target:** Production-grade platform

**Advanced Features:**
- ⭐ Native mobile apps (React Native)
- ⭐ Advanced NFC functionality
- ⭐ Elasticsearch integration
- ⭐ Microservices architecture  
- ⭐ CI/CD pipeline
- ⭐ Comprehensive testing
- ⭐ Docker containerization
- ⭐ Horizontal scalability

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

## 🐛 Known Limitations & Current State

### Version 1.0 (Desktop) Limitations
- ❌ No actual file system access (simulated virtual files)
- ❌ No backend persistence (localStorage only for preferences)  
- ❌ No real email/messaging (frontend simulation)
- ❌ Search limited to pre-indexed content
- ❌ Window positions reset on page reload
- ❌ Weather API requires external key configuration

### Version 1.5 (Mobile Branch) Status  
- 🚧 Mobile interface in active development
- 🚧 iOS App component basic implementation completed
- 🚧 Platform detection working (768px breakpoint)
- 🚧 NFC folder structure prepared but empty
- ⚠️ Mobile UI components need full implementation
- ⚠️ Touch interactions not yet optimized
- ⚠️ Mobile-specific features incomplete

### Technical Debt & Improvements Needed
- 🔄 Component refactoring for better mobile/desktop code sharing
- 🔄 Performance optimization for mobile devices  
- 🔄 Better error handling and loading states
- 🔄 Improved accessibility testing
- 🔄 Code splitting for better bundle sizes

## 🤝 Contributing

We welcome contributions! The project is actively developing mobile support on the `feature-mobile` branch.

### Development Workflow
1. **Fork** the repository
2. **Clone** your fork locally
3. **Switch** to the appropriate branch:
   ```bash
   git checkout feature-mobile  # For mobile development
   git checkout main           # For desktop features
   ```
4. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
5. **Make** your changes with proper testing
6. **Commit** with descriptive messages (`git commit -m 'Add mobile touch gestures'`)
7. **Push** to your branch (`git push origin feature/amazing-feature`)
8. **Open** a Pull Request with detailed description

### Areas Needing Help
- 📱 Mobile UI component development
- 🎨 iOS-inspired design implementation  
- ⚡ Mobile performance optimizations
- 🧪 Cross-platform testing
- 📚 Documentation improvements
- ♿ Accessibility enhancements

### Code Standards
- ESLint configuration enforced
- React 19+ patterns and hooks
- Mobile-first responsive design
- Accessibility (WCAG AA) compliance
- Clean, self-documenting code

### Current Priorities (February 2026)
1. **Complete mobile interface** in `IOSApp` component
2. **Implement touch interactions** for mobile devices
3. **Optimize performance** for mobile browsers  
4. **Add PWA features** for better mobile experience
5. **Improve cross-platform state management**

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

## 🙏 Credits & Acknowledgements

Built on exceptional open-source tools and design inspiration:

### Core Technologies
- **[React 19.2](https://react.dev)** — Component-driven UI framework
- **[Vite 7.2](https://vitejs.dev)** — Lightning-fast build tool
- **[Tailwind CSS 4.1](https://tailwindcss.com)** — Utility-first styling
- **[GSAP 3.13](https://gsap.com)** — Professional animations
- **[Zustand 5.0.8](https://zustand.docs.pmnd.rs)** — Lightweight state management

### UI & Icons
- **[Lucide React 0.554](https://lucide.dev)** — Beautiful icon library
- **[React PDF 10.2](https://react-pdf.org)** — Document rendering
- **[React Tooltip 5.30](https://react-tooltip.js.org)** — Accessible tooltips

### Development Tools
- **[ESLint](https://eslint.org)** — Code quality assurance
- **[Day.js](https://day.js.org)** — Lightweight date utilities
- **[Immer](https://immerjs.github.io/immer)** — Immutable updates

### Design Inspiration
- **[macOS Design System](https://developer.apple.com/design/human-interface-guidelines/macos)** — Interface patterns
- **[iOS Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/ios)** — Mobile design language
- **[Spotlight Search](https://support.apple.com/en-us/HT204014)** — Search interface
- **[Raycast](https://www.raycast.com)** — Productivity launcher patterns

---

**Last Updated:** February 7, 2026  

**Current Branch:** `feature-mobile` (Active Development)

**Project Status:** 
- ✅ Desktop Interface Complete (v1.0)
- 🚧 Mobile Interface in Development (v1.5)  
- 📋 Backend Planning Phase (v2.0)

Made with ❤️ by [Sasanka](https://github.com/Sasanka14)
