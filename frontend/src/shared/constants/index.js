const navLinks = [
  {
    id: 1,
    name: "About",
    type: "about",
  },
  {
    id: 2,
    name: "Projects",
    type: "finder",
  },
  {
    id: 3,
    name: "Blog",
    type: "blog",
    href: "https://sasanka14.github.io/MERN-Stack-Blog-Website/",
  },
  {
    id: 4,
    name: "Notes",
    type: "notes",
    href: "https://sasanka14.github.io/Apple-Notes/",
  },
  {
    id: 5,
    name: "Contact",
    type: "contact",
  },
  {
    id: 6,
    name: "Resume",
    type: "resume",
  },
];
const navIcons = [
  {
    id: 1,
    img: "/icons/wifi.svg",
  },
  {
    id: 2,
    img: "/icons/search.svg",
  },
  {
    id: 3,
    img: "/icons/user.svg",
  },
  {
    id: 4,
    img: "/icons/mode.svg",
  },
];

const dockApps = [
  {
    id: "finder",
    name: "Projects", // was "Finder"
    icon: "finder.png",
    canOpen: true,
  },
  {
    id: "safari",
    name: "Articles", // was "Safari"
    icon: "safari.png",
    canOpen: true,
  },
  {
    id: "photos",
    name: "Gallery", // was "Photos"
    icon: "photos.png",
    canOpen: true,
  },
  {
    id: "contact",
    name: "Contact", // or "Get in touch"
    icon: "contact.png",
    canOpen: true,
  },
  {
    id: "terminal",
    name: "Skills", // was "Terminal"
    icon: "terminal.png",
    canOpen: true,
  },
  {
    id: "archive",
    name: "Archive",
    icon: "archive.png",
    canOpen: true,
  },
  {
    id: "teams",
    name: "Teams",
    icon: "team.png",
    canOpen: true,
  },
];

const blogPosts = [
  {
    id: 1,
    date: "Sep 2, 2025",
    title: "Advancing Data Security with AES Encryption and Decryption",
    image: "/images/blog1.jpg",
    link: "https://insightforgedotcom.wordpress.com/2024/11/29/advancing-data-security-with-aes-encryption-and-decryption/",
  },
];

const techStack = [
  {
    category: "Frontend",
    items: ["React.js", "Next.js", "TypeScript"],
  },
  {
    category: "Mobile",
    items: ["React Native", "Expo"],
  },
  {
    category: "Styling",
    items: ["Tailwind CSS", "Sass", "CSS"],
  },
  {
    category: "Backend",
    items: ["Node.js", "Express", "NestJS", "Hono"],
  },
  {
    category: "Database",
    items: ["MongoDB", "PostgreSQL"],
  },
  {
    category: "Dev Tools",
    items: ["Git", "GitHub", "Docker"],
  },
];

const socials = [
  {
    id: 1,
    text: "Github",
    icon: "/icons/github.svg",
    bg: "#f4656b",
    link: "https://github.com/Sasanka14",
  },
  {
    id: 2,
    text: "Blog",
    icon: "/icons/atom.svg",
    bg: "#4bcb63",
    link: "https://sasanka14.github.io/MERN-Stack-Blog-Website/",
  },
  {
    id: 3,
    text: "Instagram",
    icon: "/icons/insta.svg",
    bg: "#ff866b",
    link: "https://www.instagram.com/sashank.codes_",
  },
  {
    id: 4,
    text: "LinkedIn",
    icon: "/icons/linkedin.svg",
    bg: "#05b6f6",
    link: "https://www.linkedin.com/in/sasankawrites/",
  },
];

const photosLinks = [
  {
    id: 1,
    icon: "/icons/gicon1.svg",
    title: "Library",
  },
  {
    id: 2,
    icon: "/icons/gicon2.svg",
    title: "Memories",
  },
  {
    id: 3,
    icon: "/icons/file.svg",
    title: "Places",
  },
  {
    id: 4,
    icon: "/icons/gicon4.svg",
    title: "People",
  },
  {
    id: 5,
    icon: "/icons/gicon5.svg",
    title: "Favorites",
  },
];

const gallery = [
  {
    id: 1,
    img: "/images/sasanka.jpg",
  },
  {
    id: 2,
    img: "/images/sasanka1.jpg",
  },
  {
    id: 3,
    img: "/images/sasanka2.jpeg",
  },
  {
    id: 4,
    img: "/images/sasanka3.jpeg",
  },
];

export {
  navLinks,
  navIcons,
  dockApps,
  blogPosts,
  techStack,
  socials,
  photosLinks,
  gallery,
};

const WORK_LOCATION = {
  id: 1,
  type: "work",
  name: "Work",
  icon: "/icons/work.svg",
  kind: "folder",
  children: [
    // ▶ Project 1
    {
      id: 5,
      name: "AgriNext - AI Powered Crop Analysis",
      icon: "/images/folder.png",
      kind: "folder",
      position: "top-10 left-5", // icon position inside Finder
      windowPosition: "-top-[8vh] right-2", // optional: Finder window position
      children: [
        {
          id: 1,
          name: "AgriNext_Project.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          position: "top-5 left-10",
          description: [
            "AgriNext is a farmer-first agri-tech platform designed to rebuild trust and sustainability in modern agriculture.",
            "Instead of being just an advisory app, it focuses on real farmer problems—crop decisions, disease awareness, and actionable insights rooted in local context.",
            "Think of it as a digital companion for farmers, guiding them from uncertainty to informed decisions, season after season.",
            "It is designed with a product-thinking mindset, combining clean UI, data-driven insights, and scalable technology to create long-term impact in agriculture.",
          ],
        },
        {
          id: 2,
          name: "agrinext.streamlit.app",
          icon: "/images/safari.png",
          kind: "file",
          fileType: "url",
          href: "https://agrinext.streamlit.app/",
          position: "top-10 right-20",
        },
        {
          id: 4,
          name: "agrinext.png",
          icon: "/images/image.png",
          kind: "file",
          fileType: "img",
          position: "top-52 right-80",
          imageUrl: "/images/AgriNext.png",
        },
        {
          id: 5,
          name: "Design.fig",
          icon: "/images/figma.png",
          kind: "file",
          fileType: "fig",
          href: "https://google.com",
          position: "top-60 right-20",
        },
      ],
    },

    // ▶ Project 2
    {
      id: 6,
      name: "IndianOdyssey",
      icon: "/images/folder.png",
      kind: "folder",
      position: "top-52 right-80",
      windowPosition: "top-[8vh] right-7",
      children: [
        {
          id: 1,
          name: "IndianOdyssey_Project.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          position: "top-5 right-10",
          description: [
            "IndianOdyssey is a modern travel website designed to showcase India’s diverse destinations and curated tour experiences.",
            "Instead of a plain listing platform, it focuses on inspiring travel through immersive visuals, clear itineraries, and intuitive navigation.",
            "Think of it as a digital travel brochure—guiding users from curiosity to confident trip planning across India’s most iconic locations.",
            "It is built using HTML, CSS, Bootstrap, and JavaScript, delivering a responsive, visually engaging, and user-friendly experience across devices.",
          ],
        },
        {
          id: 2,
          name: "sasanka14.github.io",
          icon: "/images/safari.png",
          kind: "file",
          fileType: "url",
          href: "https://sasanka14.github.io/Travel-Website-Using-Bootstrap/",
          position: "top-20 left-20",
        },
        {
          id: 4,
          name: "indianodyssey.png",
          icon: "/images/image.png",
          kind: "file",
          fileType: "img",
          position: "top-52 left-80",
          imageUrl: "/images/indianodyssey.png",
        },
        {
          id: 5,
          name: "Design.fig",
          icon: "/images/figma.png",
          kind: "file",
          fileType: "fig",
          href: "https://google.com",
          position: "top-60 left-5",
        },
      ],
    },

    // ▶ Project 3
    {
      id: 7,
      name: "Insuramate",
      icon: "/images/folder.png",
      kind: "folder",
      position: "top-10 left-80",
      windowPosition: "top-[22vh] right-8",
      children: [
        {
          id: 1,
          name: "Insuramate_Project.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          position: "top-5 left-10",
          description: [
            "Insuramate is an innovative insurance management platform designed to simplify policy administration and claims processing.",
            "Instead of dealing with complex paperwork, users can easily manage their insurance policies, submit claims, and track their status online.",
            "Think of it as your personal insurance assistant—streamlining communication between policyholders and providers for a hassle-free experience.",
            "It’s built with React Native, ensuring a seamless and intuitive interface on both iOS and Android devices.",
          ],
        },
        {
          id: 2,
          name: "insuramate.netlify.app",
          icon: "/images/safari.png",
          kind: "file",
          fileType: "url",
          href: "https://insuramate.netlify.app/",
          position: "top-10 right-20",
        },
        {
          id: 4,
          name: "insuramate.png",
          icon: "/images/image.png",
          kind: "file",
          fileType: "img",
          position: "top-52 right-80",
          imageUrl: "/images/insuramate.png",
        },
        {
          id: 5,
          name: "Design.fig",
          icon: "/images/figma.png",
          kind: "file",
          fileType: "fig",
          href: "https://google.com",
          position: "top-60 right-20",
        },
      ],
    },
  ],
};

const ABOUT_LOCATION = {
  id: 2,
  type: "about",
  name: "About me",
  icon: "/icons/info.svg",
  kind: "folder",
  children: [
    {
      id: 1,
      name: "me.png",
      icon: "/images/image.png",
      kind: "file",
      fileType: "img",
      position: "top-10 left-5",
      imageUrl: "/images/sasanka2.jpeg",
    },
    {
      id: 2,
      name: "casual-me.png",
      icon: "/images/image.png",
      kind: "file",
      fileType: "img",
      position: "top-28 right-72",
      imageUrl: "/images/sasanka1.jpg",
    },
    {
      id: 3,
      name: "conference-me.png",
      icon: "/images/image.png",
      kind: "file",
      fileType: "img",
      position: "top-52 left-80",
      imageUrl: "/images/sasanka3.jpeg",
    },
    {
      id: 4,
      name: "about-me.txt",
      icon: "/images/txt.png",
      kind: "file",
      fileType: "txt",
      position: "top-60 left-5",
      subtitle: "Meet the Developer Behind the Code",
      image: "/images/sasanka.jpg",
      description: [
        "Hey! I'm Sasanka 👋 — a computer science student and aspiring software engineer who enjoys building practical, well-structured applications that solve real-world problems.",
        "I work with JavaScript, TypeScript, React, and Next.js, and I’m building strength in full-stack development, data structures, and system thinking, with experience in Python, Java, and AI/ML.",
        "Outside of coding , I enjoy gaming , planning new projects , and watching anime.",
      ],
    },
  ],
};

const RESUME_LOCATION = {
  id: 3,
  type: "resume",
  name: "Resume",
  icon: "/icons/file.svg",
  kind: "folder",
  children: [
    {
      id: 1,
      name: "Resume.pdf",
      icon: "/images/pdf.png",
      kind: "file",
      fileType: "pdf",
      // you can add `href` if you want to open a hosted resume
      // href: "/your/resume/path.pdf",
    },
  ],
};

const ARCHIVE_LOCATION = {
  id: 4,
  type: "archive",
  name: "Archive",
  icon: "/icons/archive.svg",
  kind: "folder",
  children: [
    {
      id: 101,
      name: "AI in Traffic Optimization",
      icon: "/images/folder.png",
      kind: "folder",
      position: "top-10 left-6",
      windowPosition: "top-[8vh] left-8",
      children: [
        {
          id: 1,
          name: "Abstract.txt",
          kind: "file",
          fileType: "txt",
          icon: "/images/txt.png",
          description: [
            "This research explores AI-based traffic optimization systems and their real-world applications.",
            "The paper focuses on real-time congestion detection using machine learning algorithms.",
            "Experiments show a 23% improvement in traffic flow efficiency with reduced emissions.",
          ],
          position: "top-6 left-8",
        },
        {
          id: 2,
          name: "Paper.pdf",
          kind: "file",
          fileType: "pdf",
          icon: "/images/pdf.png",
          position: "top-16 left-48",
        },
        {
          id: 3,
          name: "Architecture.png",
          kind: "file",
          fileType: "img",
          icon: "/images/image.png",
          imageUrl: "/images/research-architecture.png",
          position: "top-44 left-24",
        },
        {
          id: 4,
          name: "Research Link.url",
          kind: "file",
          fileType: "url",
          icon: "/images/safari.png",
          href: "https://arxiv.org",
          position: "top-60 left-56",
        },
      ],
    },
    {
      id: 102,
      name: "Deep Learning for NLP",
      icon: "/images/folder.png",
      kind: "folder",
      position: "top-52 right-80",
      windowPosition: "top-[20vh] left-8",
      children: [
        {
          id: 1,
          name: "Summary.txt",
          kind: "file",
          fileType: "txt",
          icon: "/images/txt.png",
          description: [
            "A comprehensive study on transformer architectures for natural language processing.",
            "Covers BERT, GPT, and emerging attention mechanisms in modern NLP systems.",
            "Performance benchmarks across multiple datasets demonstrate state-of-the-art results.",
          ],
          position: "top-6 left-8",
        },
        {
          id: 2,
          name: "Paper.pdf",
          kind: "file",
          fileType: "pdf",
          icon: "/images/pdf.png",
          position: "top-16 left-48",
        },
      ],
    },
  ],
};

const TEAMS_LOCATION = {
  id: 5,
  type: "teams",
  name: "Teams",
  icon: "/icons/teams.svg",
  kind: "folder",
  children: [
    // Team Member 2: Krishna
    {
      id: 301,
      name: "Krishna",
      icon: "/images/folder.png",
      kind: "folder",
      position: "top-52 right-80",
      windowPosition: "top-[20vh] left-8",
      children: [
        {
          id: 302,
          name: "about-me.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          position: "top-5 right-10",
          subtitle: "Video Editor | Creative Storyteller",
          image: "/images/krishna.jpeg",
          description: [
            "Hi, I’m Krishna — a Class 11 student with a strong interest in video editing and visual storytelling.",
            "I focus on creating engaging videos by working with cuts, transitions, effects, color grading, and sound design.",
            "I enjoy experimenting with creative projects, learning new editing techniques, and improving my skills step by step.",
          ],
        },
        {
          id: 303,
          name: "Sample1.mp4",
          icon: "/images/video.png",
          kind: "file",
          fileType: "video",
          position: "top-16 left-48",
          href: "/videos/Uchia-clan-&-Naruto-[AMV]-Remake.mp4",
        },
        {
          id: 304,
          name: "Sample2.mp4",
          icon: "/images/video.png",
          kind: "file",
          fileType: "video",
          position: "top-44 right-80",
          href: "/videos/Vyuk-bhai-[lookism series].mp4",
        },
        {
          id: 305,
          name: "socials.webloc",
          icon: "/images/safari.png",
          kind: "file",
          fileType: "url",
          position: "top-60 left-5",
          href: "https://www.instagram.com/k.e.n.editz/",
        },
      ],
    },
  ],
};

export const locations = {
  work: WORK_LOCATION,
  about: ABOUT_LOCATION,
  resume: RESUME_LOCATION,
  archive: ARCHIVE_LOCATION,
  teams: TEAMS_LOCATION,
};

const INITIAL_Z_INDEX = 1000;

const WINDOW_CONFIG = {
  finder: {
    isOpen: false,
    zIndex: INITIAL_Z_INDEX,
    data: null,
    isMinimized: false,
    isMaximized: false,
  },
  contact: {
    isOpen: false,
    zIndex: INITIAL_Z_INDEX,
    data: null,
    isMinimized: false,
    isMaximized: false,
  },
  resume: {
    isOpen: false,
    zIndex: INITIAL_Z_INDEX,
    data: null,
    isMinimized: false,
    isMaximized: false,
  },
  safari: {
    isOpen: false,
    zIndex: INITIAL_Z_INDEX,
    data: null,
    isMinimized: false,
    isMaximized: false,
  },
  photos: {
    isOpen: false,
    zIndex: INITIAL_Z_INDEX,
    data: null,
    isMinimized: false,
    isMaximized: false,
  },
  terminal: {
    isOpen: false,
    zIndex: INITIAL_Z_INDEX,
    data: null,
    isMinimized: false,
    isMaximized: false,
  },
  txtfile: {
    isOpen: false,
    zIndex: INITIAL_Z_INDEX,
    data: null,
    isMinimized: false,
    isMaximized: false,
  },
  imgfile: {
    isOpen: false,
    zIndex: INITIAL_Z_INDEX,
    data: null,
    isMinimized: false,
    isMaximized: false,
  },
  teams: {
    isOpen: false,
    zIndex: INITIAL_Z_INDEX,
    data: null,
    isMinimized: false,
    isMaximized: false,
  },
};

const quickActions = [
  { icon: "location", label: "Location", value: "India" },
  { icon: "status", label: "Status", value: "Available for collaboration" },
  { icon: "time", label: "Response Time", value: "Within 24 hours" },
  {
    icon: "work",
    label: "Open To",
    value: "Internships · Freelance · Full-time",
  },
];

export { INITIAL_Z_INDEX, WINDOW_CONFIG, quickActions };
