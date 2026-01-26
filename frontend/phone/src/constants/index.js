// Import shared constants from desktop
import { 
  techStack, 
  socials, 
  gallery, 
  blogPosts,
  locations,
  quickActions 
} from "#shared";

// Re-export shared constants
export { techStack, socials, gallery, blogPosts, locations, quickActions };

// iOS App Icons configuration
export const iosApps = [
  {
    id: "about",
    name: "About",
    icon: "/icons/info.svg",
    color: "#5856D6",
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  },
  {
    id: "projects",
    name: "Projects",
    icon: "/images/finder.png",
    color: "#007AFF",
    gradient: "linear-gradient(135deg, #007AFF 0%, #00C6FF 100%)",
  },
  {
    id: "skills",
    name: "Skills",
    icon: "/images/terminal.png",
    color: "#1C1C1E",
    gradient: "linear-gradient(135deg, #2C2C2E 0%, #1C1C1E 100%)",
  },
  {
    id: "gallery",
    name: "Gallery",
    icon: "/images/photos.png",
    color: "#FF2D55",
    gradient: "linear-gradient(135deg, #FF2D55 0%, #FF9500 100%)",
  },
  {
    id: "blog",
    name: "Articles",
    icon: "/images/safari.png",
    color: "#007AFF",
    gradient: "linear-gradient(135deg, #007AFF 0%, #5AC8FA 100%)",
  },
  {
    id: "contact",
    name: "Contact",
    icon: "/images/contact.png",
    color: "#34C759",
    gradient: "linear-gradient(135deg, #34C759 0%, #30D158 100%)",
  },
  {
    id: "resume",
    name: "Resume",
    icon: "/icons/file.svg",
    color: "#FF3B30",
    gradient: "linear-gradient(135deg, #FF3B30 0%, #FF6B6B 100%)",
  },
  {
    id: "github",
    name: "GitHub",
    icon: "/icons/github.svg",
    color: "#1C1C1E",
    gradient: "linear-gradient(135deg, #333 0%, #1C1C1E 100%)",
    isExternal: true,
    href: "https://github.com/Sasanka14",
  },
];

// Dock apps (4 main apps)
export const iosDockApps = [
  {
    id: "projects",
    name: "Projects",
    icon: "/images/finder.png",
  },
  {
    id: "contact",
    name: "Contact",
    icon: "/images/contact.png",
  },
  {
    id: "gallery",
    name: "Gallery",
    icon: "/images/photos.png",
  },
  {
    id: "blog",
    name: "Articles",
    icon: "/images/safari.png",
  },
];

// About section data
export const aboutData = {
  name: "Sasanka",
  role: "Software Developer",
  avatar: "/images/sasanka.jpg",
  bio: "Hey! I'm Sasanka 👋 — a computer science student and aspiring software engineer who enjoys building practical, well-structured applications that solve real-world problems.",
  details: [
    { label: "Location", value: "India", icon: "location" },
    { label: "Status", value: "Available for collaboration", icon: "status" },
    { label: "Response", value: "Within 24 hours", icon: "time" },
    { label: "Open To", value: "Internships · Freelance · Full-time", icon: "work" },
  ],
};

// Project cards for iOS
export const projectCards = [
  {
    id: 1,
    title: "AgriNext",
    subtitle: "AI Powered Crop Analysis",
    description: "A farmer-first agri-tech platform with AI-driven insights.",
    image: "/images/AgriNext.png",
    color: "#34C759",
    link: "https://agrinext.streamlit.app/",
  },
  {
    id: 2,
    title: "IndianOdyssey",
    subtitle: "Travel Website",
    description: "Modern travel website showcasing India's diverse destinations.",
    image: "/images/indianodyssey.png",
    color: "#FF9500",
    link: "https://sasanka14.github.io/Travel-Website-Using-Bootstrap/",
  },
  {
    id: 3,
    title: "Insuramate",
    subtitle: "Insurance Platform",
    description: "Insurance management platform for policy administration.",
    image: "/images/insuramate.png",
    color: "#007AFF",
    link: "https://insuramate.netlify.app/",
  },
];

// Control Center toggles
export const controlCenterItems = [
  { id: "airplane", icon: "Plane", label: "Airplane Mode", active: false },
  { id: "cellular", icon: "Signal", label: "Cellular", active: true },
  { id: "wifi", icon: "Wifi", label: "Wi-Fi", active: true },
  { id: "bluetooth", icon: "Bluetooth", label: "Bluetooth", active: true },
];
