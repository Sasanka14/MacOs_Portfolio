# macOS-Inspired Portfolio Application

A modern, keyboard-first productivity application inspired by macOS Spotlight and system-level design patterns. Built with React, Vite, and Tailwind CSS.

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
git clone https://github.com/yourusername/portfolio.git
cd portfolio

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
1. Set `VITE_WEATHER_API_KEY` in `.env.local` for weather functionality:
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
portfolio/
├── src/
│   ├── components/          # Reusable React components
│   │   ├── Navbar.jsx      # Top navigation bar
│   │   ├── Dock.jsx        # Bottom taskbar
│   │   ├── Welcome.jsx     # Hero section + weather
│   │   ├── SearchPalette.jsx # Global search interface
│   │   └── ...
│   ├── windows/             # Window components (draggable windows)
│   │   ├── Photos.jsx      # Image gallery
│   │   ├── Text.jsx        # Text editor
│   │   ├── Safari.jsx      # Browser simulation
│   │   ├── Terminal.jsx    # Terminal simulation
│   │   └── ...
│   ├── views/              # Reusable view components
│   │   └── LibraryView.jsx # Keyboard-accessible image library
│   ├── hooks/              # Custom React hooks
│   │   ├── useSearch.js    # Search logic and indexing
│   │   ├── useTheme.js     # Theme management
│   │   └── useWindowStore.js
│   ├── store/              # Zustand state stores
│   │   ├── window.js       # Window state management
│   │   └── location.js     # Navigation state
│   ├── hoc/               # Higher-order components
│   │   └── WindowWrapper.jsx # Window container
│   ├── constants/         # App configuration
│   ├── styles/           # Global styles
│   ├── index.css         # Tailwind + global styles
│   ├── main.jsx          # React entry point
│   └── App.jsx           # Root component
├── public/               # Static assets
├── package.json          # Dependencies and scripts
├── vite.config.js        # Vite configuration
├── tailwind.config.js    # Tailwind configuration
└── README.md            # This file
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

See [CREDITS.md](./CREDITS.md) for detailed versioning information.

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

[Choose appropriate license - MIT, Apache 2.0, etc.]

## 🙏 Credits

This project stands on the shoulders of incredible open-source software and design inspiration.

**Full credits and acknowledgements:** See [CREDITS.md](./CREDITS.md)

**Key inspirations:**
- **macOS** — System design and interaction patterns
- **Spotlight** — Search interface design
- **Raycast** — Keyboard-first productivity
- **React** — Component architecture
- **Tailwind CSS** — Design system and styling

## 📞 Contact

- **Portfolio:** [Your website]
- **GitHub:** [Your GitHub]
- **LinkedIn:** [Your LinkedIn]
- **Email:** [Your email]

---

**Last Updated:** January 1, 2026

**Project Status:** Active Development — v1 Feature Complete, v2 Planning

Made with ❤️ by [Your Name]
