// Header component
import { memo } from 'react';

const Header = memo(() => (
  <header className="w-full py-4 bg-transparent text-white text-center shadow px-4">
    <h1 className="text-2xl sm:text-3xl text-[#ba3f47] capitalize font-[arial] tracking-tighter font-bold">Anuj Portfolio AI ChatBot</h1>
    <p className="text-xs sm:text-sm mt-1 leading-1 tracking-tight italic">Ask about my projects, tech stack, or career!</p>
  </header>
));

Header.displayName = 'Header';

export default Header;
