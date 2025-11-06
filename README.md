# Anuj Portfolio AI Chatbot 🚀

A modern, Gen-Z-inspired, fully responsive portfolio chatbot and contact platform built with **React**, **TypeScript**, **TailwindCSS**, **Framer Motion**, and **Groq Cloud** (OpenAI-compatible LLM).  
It features animated chat, project explanations from your GitHub, a beautiful contact form with EmailJS integration, and a dynamic, animated background.

Deployed Url:https://anujchatbot.netlify.app/
---

## ✨ Features

- **AI Chatbot**: Ask about Anuj, his projects, tech stack, or career. The bot uses Groq Cloud LLM (OpenAI API compatible) for fast, smart responses.
- **GitHub Project Summaries**: When you ask about a project, the bot fetches and summarizes the README from GitHub.
- **Modern Gen-Z UI**: Pastel gradients, glassmorphism, animated icons, smooth transitions, and a dark/light mode toggle.
- **Animated Background**: Crossfading slideshow of space-themed images for a lively, immersive feel.
- **Contact Section**: "Reach Me Out" form with validation, EmailJS integration, and animated success toasts.
- **Accessibility**: Keyboard navigation, ARIA labels, and screen reader-friendly.
- **Performance**: Code splitting, lazy loading, and image preloading for a smooth UX.
- **Mobile First**: Fully responsive and touch-friendly.

---

## 🛠️ Tech Stack

- **React** + **TypeScript**
- **TailwindCSS** (with custom themes)
- **Framer Motion** (animations)
- **Groq Cloud** (LLM, OpenAI-compatible API)
- **EmailJS** (contact form)
- **Vite** (build tool)

---

## 🚀 Getting Started


1. Clone & Install

```bash
git clone https://github.com/anujsc/anuj-portfolio-ai-chatbot.git
cd anuj-portfolio-ai-chatbot
npm install

2. Environment Variables
Copy .env.example to .env and fill in your keys:

VITE_GROQ_API_KEY=your_groq_api_key
VITE_GROQ_MODEL=mixtral-8x7b-32768
VITE_GITHUB_TOKEN=your_github_token   # (optional, for private repos)
VITE_EMAILJS_SERVICE_ID=your_emailjs_service_id
VITE_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
VITE_EMAILJS_USER_ID=your_emailjs_user_id

Never commit your .env file!
.env is already in .gitignore.

 Run Locally : npm run dev
Open http://localhost:5173 in your browser.

📨 EmailJS Setup
Sign up at EmailJS.
Create a service and email template.
Get your Service ID, Template ID, and User/Public Key from the EmailJS dashboard.
Add them to your .env file as shown above.
🖼️ Customizing Background Images
Place your images in src/assets/images/.
Edit src/data/bgImages.ts to add/remove image imports and update the exported array.

🏗️ Project Structure:
src/
  components/
    BackgroundSlideshow.tsx   # Animated background slideshow
    ChatBubble.tsx            # Chat message bubble (with typewriter effect)
    ChatContainer.tsx         # Main chat UI and logic
    ChatInput.tsx             # Chat input bar
    [Contact.tsx](http://_vscodecontentref_/0)               # "Reach Me Out" contact form
    Header.tsx                # App header with theme toggle
    Loader.tsx                # Loading spinner
  data/
    anujProfile.ts            # Your profile data for the AI
    bgImages.ts               # Array of background images
  hooks/
    useChat.tsx               # Chat state and logic
  styles/
    globals.css               # Tailwind and custom styles
  utils/
    apiClient.ts              # Unified API client for Groq
    github.ts                 # GitHub README fetcher
    groq.ts                   # Groq API helper
  types/
    chat.ts                   # TypeScript types
  App.tsx                     # Main app shell
  main.tsx                    # Entry point

🌈 Customization
Colors & Fonts: Main color is #ba3f47 (and shades). Fonts use Inter and Fira Sans.
Theme: Easily switch between light/dark mode with the toggle in the header.
Contact Info: Update your details in Contact.tsx.
Profile Data: Edit src/data/anujProfile.ts for AI context.

🛡️ Security & Deployment
API Keys: All keys are loaded from .env and never hard<vscode_annotation details='%5B%7B%22title%22%3A%22hardcoded-credentials%22%2C%22description%22%3A%22Embedding%20credentials%20in%20source%20code%20risks%20unauthorized%20access%22%7D%5D'>coded</vscode_annotation>.
Production: Deploy on Vercel, Netlify, or your favorite static host.
Vercel Setup:
Push to GitHub.
Import to Vercel.
Set all environment variables in the Vercel dashboard.

💡 Tips
Performance: Images are preloaded for smooth transitions. All major components are lazy-loaded.
Accessibility: All interactive elements have ARIA labels and keyboard support.
Extensibility: Add more LLM providers or features by extending apiClient.ts.

📄 License
MIT License.
© 2025 Anuj Chaudhari

Made with ❤️ using React, Tailwind, and Groq Cloud AI
