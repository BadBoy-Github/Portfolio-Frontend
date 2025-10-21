
// Node modules
import { useState } from 'react';

// Components
import Navbar from './Navbar';

const Header = () => {
    const [navOpen, setNavOpen] = useState(false);

    return (
      <header className="fixed top-0 left-0 w-full h-20 flex items-center z-40 bg-gradient-to-b from-zinc-900 to-zinc-900/0">
        <div className="max-w-screen-2xl w-full mx-auto px-4 flex justify-between items-center md:px-6 md:grid md:grid-cols-[1fr,3fr,1fr]">
          <h1>
            <a href="/" className="logo">
              <img
                src="/img/icons/favicon.svg"
                alt="Elayabarathi"
                width={40}
                height={40}
              />
            </a>
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

          <a
            href="#contactme"
            className="max-w-max h-10 flex justify-center items-center gap-2 px-4 rounded-xl font-medium text-xs md:text-sm ring-1 ring-zinc-50/5 ring-inset transition-[background-color] bg-zinc-50 text-zinc-900 active:bg-zinc-50/80 max-lg:hidden lg:justify-self-end"
          >
            Contact Me
          </a>
        </div>
      </header>
    );
}

export default Header