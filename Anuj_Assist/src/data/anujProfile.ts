// Structured profile data pulled from your resume.
// Update this file when projects / skills change.
const anujProfile = {
  name: "Anuj Chaudhari",
  title: "Frontend Developer",
  location: "jalgaon, India",
  email: "anujpvt2311@gmail.com",
  github: "https://github.com/anujsc",
  portfolio: "https://anujportfoolioo.netlify.app",
  linkedin: "https://www.linkedin.com/in/anuj-chaudhari-78a0a9256",
  experience: [
    {
      role: "Software Developer-Trainee (Apprenticeship)",
      company: "Enprosys Infotech",
      period: "Sept 2025 – Present",
      details: [
        "Built an Employee Management System (EMS) using React + TypeScript and Formik.",
        "Integrated 15+ RESTful APIs with reusable utility functions.",
        "Collaborated using feature branches and code reviews on GitHub.",
      ],
    },
  ],
  skills: {
    languages: ["JavaScript", "C++", "SQL"],
    frontend: ["React.js", "TypeScript", "Tailwind CSS", "Redux Toolkit", "Context API", "HTML5", "CSS3", "GSAP", "Framer Motion"],
    backend: ["Node.js", "Express.js", "REST APIs", "Firebase Authentication"],
    databases: ["MongoDB", "MySQL", "PostgreSQL"],
    tools: ["GitHub", "Postman", "Chrome DevTools", "Vite", "VS Code"],
    devops: ["Netlify", "Vercel"],
  },
  projects: [
    {
      key: "ems",
      name: "Employee Management System (EMS)",
      description: "Built a full-stack URL shortening platform using Node.js, Express.js, MongoDB, and React with modular RESTful architecture, real-time click tracking, responsive UI, and clean collaborative development practices to ensure high maintainability and scalability.",
      tech: ["React", "TypeScript", "Formik", "REST API"],
      repo: "there is no repo for this project",
      deployed:"there is no deployed link for this project"
    },
    {
      key: "urlshortner",
      name: "URL Shortener",
      description: "Full-stack service using Node.js, Express.js, and MongoDB with click tracking.",
      tech: ["Node.js", "Express", "MongoDB", "React"],
      repo: "https://github.com/anujsc/URL_SHORTNER",
      deployed: "https://url-shortner-f-vwjq.onrender.com/"
    },
    {
      key: "imgenhancer",
      name: "Img Enhancer & Background Remover",
      description: "Developed a fast, accessible React app for AI-powered image enhancement with Firebase auth, protected routes, dark/light theming, drag-and-drop uploads, lazy loading, and seamless Netlify CI/CD deployment using Vite, TailwindCSS, and external APIs.",
      tech: ["React", "TailwindCSS", "Firebase"],
      repo: "https://github.com/anujsc/ImgEnhancer",
      deployed: "https://img-enhancer.netlify.app/"
    },
    {
      key: "scsdb",
      name: "SCSDB TV App",
      description: "Built and optimized a responsive movie app (1,000+ titles) using React, Redux, and React Router — boosting Core Web Vitals/Lighthouse scores, reducing bounce rate by 20%, and increasing user engagement through fast search, performance gains, and a visually appealing UI.",
      tech: ["React", "Redux", "Movie API"],
      repo: "https://github.com/anujsc/SCSDB",
      deployed: "https://scsdb.netlify.app/"
    },
    {
      key: "portfolio",
      name: "Portfolio Website",
      description: "Personal portfolio built with React and Tailwind CSS, GSAP, Framer-Motion etc showcasing projects and skills with smooth animations.",
      tech: ["React", "TailwindCSS", "GSAP", "Framer-Motion"],
      repo: "https://github.com/anujsc/Portfolio",
      deployed: "https://anujportfoolioo.netlify.app"
    },
    {
      key: "chatbot",
      name: "Portfolio AI Chatbot",
      description: "AI-powered chatbot for Anuj Chaudhari's portfolio using React and Groq API to answer questions about projects and skills.",
      tech: ["React", "Groq API"],
      repo: "https://github.com/anujsc/Anuj_ChatBot",
      deployed: "https://anujchatbot.netlify.app/"
    }
  ],
  education: {
    degree: "B.E. in Computer Engineering",
    institute: "Sinhgad Institute of Technology, Lonavala",
    period: "June 2021 – July 2025",
    cgpa: "7.51"
  },
  certifications: [
    "Debugging JS / NodeJS – Udemy",
    "UX Design Virtual Experience – Forage"
  ]
};

export default anujProfile;