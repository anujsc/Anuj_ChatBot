// Structured profile data pulled from your resume.
// Update this file when projects / skills change.
const anujProfile = {
  name: "Anuj Chaudhari",
  title: "Frontend Developer",
  location: "Pune, India",
  email: "anujpvt2311@gmail.com",
  github: "https://github.com/anujsc",
  portfolio: "https://anujportfoolioo.netlify.app/",
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
      description: "Full-featured EMS built with React + TypeScript, Formik, and modular UI components. Integrated 15+ RESTful APIs.",
      tech: ["React", "TypeScript", "Formik", "REST API"],
      repo: "anujsc/EMS"
    },
    {
      key: "urlshortner",
      name: "URL Shortener",
      description: "Full-stack service using Node.js, Express.js, and MongoDB with click tracking.",
      tech: ["Node.js", "Express", "MongoDB", "React"],
      repo: "anujsc/URL_SHORTNER"
    },
    {
      key: "imgenhancer",
      name: "Img Enhancer & Background Remover",
      description: "React app for image enhancement and background removal; uses Firebase auth and external APIs.",
      tech: ["React", "TailwindCSS", "Firebase"],
      repo: "anujsc/ImgEnhancer"
    },
    {
      key: "scsdb",
      name: "SCSDB TV App",
      description: "Movie discovery app using React, Redux, and React Router for smooth navigation across 1000+ titles.",
      tech: ["React", "Redux", "Movie API"],
      repo: "anujsc/SCSDB"
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