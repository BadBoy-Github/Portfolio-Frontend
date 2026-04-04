
// Node modules
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

// Components
import Navbar from './Navbar';

const Header = () => {
    const [navOpen, setNavOpen] = useState(false);
    const location = useLocation();

    const handleContactClick = (e) => {
      if (location.pathname === "/") {
        e.preventDefault();
        const contactSection = document.getElementById("contactme");
        const lenis = window.lenis;
        if (contactSection) {
          if (lenis) {
            lenis.scrollTo(contactSection, { offset: -100, duration: 0.8 });
          } else {
            contactSection.scrollIntoView({ behavior: "smooth" });
          }
        }
      }
    };

    return (
      <>
        {/* Skip to main content link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-sky-500 text-white px-4 py-2 rounded z-50 focus:z-50"
        >
          Skip to main content
        </a>
        <header className="fixed top-0 left-0 w-full h-20 flex items-center z-40 bg-gradient-to-b from-zinc-900 to-zinc-900/0">
        <div className="max-w-screen-2xl w-full mx-auto px-4 flex justify-between items-center md:px-6 md:grid md:grid-cols-[1fr,3fr,1fr]">
          <h1>
            <Link to="/" className="logo">
              <img
                src="/favicon.svg"
                alt="Elayabarathi"
                width={40}
                height={40}
                loading="lazy"
              />
            </Link>
          </h1>

          <div className="relative md:justify-self-center">
            <button
              className="menu-btn md:hidden"
              onClick={() => setNavOpen((prev) => !prev)}
            >
              <span className="material-symbols-rounded">
                {navOpen ? "close" : "menu"}
              </span>
            </button>

            <Navbar navOpen={navOpen} />
          </div>

          <Link
            to="/?scroll=contactme"
            className="max-w-max h-10 flex justify-center items-center gap-2 px-4 rounded-xl font-medium text-xs md:text-sm ring-1 ring-zinc-50/5 ring-inset transition-[background-color] bg-zinc-50 text-zinc-900 active:bg-zinc-50/80 max-lg:hidden lg:justify-self-end"
            onClick={handleContactClick}
          >
            Contact Me
          </Link>
        </div>
      </header>
    </>
  );
};

export default Header;