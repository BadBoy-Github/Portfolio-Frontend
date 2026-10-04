import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import { Button } from "./Button";
import Logo from "./ui/Logo";

const Header = () => {
  const [navOpen, setNavOpen] = useState(false);
  const { pathname } = useLocation();
  const isContactPage = pathname === "/contact";

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-marker text-white px-4 py-2 rounded-wobbly-sm border-2 border-ink z-50"
      >
        Skip to main content
      </a>

      <header className="fixed top-0 left-0 w-full z-40 bg-paper border-b-2 border-dashed border-ink/20">
        <div className="max-w-screen-2xl w-full mx-auto px-6 h-20 flex justify-between items-center md:px-8 md:grid md:grid-cols-[1fr,3fr,1fr]">
          <h1>
            <Link
              to="/"
              aria-label="Elayabarathi M V — home"
              className="inline-block shrink-0"
            >
              <Logo />
            </Link>
          </h1>

          <div className="relative md:justify-self-center">
            <button
              type="button"
              className="menu-btn md:hidden"
              onClick={() => setNavOpen((prev) => !prev)}
              aria-expanded={navOpen}
              aria-label={navOpen ? "Close menu" : "Open menu"}
            >
              <span className="material-symbols-rounded">
                {navOpen ? "close" : "menu"}
              </span>
            </button>

            <Navbar navOpen={navOpen} />
          </div>

          <Button
            href="/contact"
            size="sm"
            aria-current={isContactPage ? "page" : undefined}
            classes={`max-md:hidden md:justify-self-end ${
              isContactPage ? "btn-active" : ""
            }`}
          >
            Contact Me
          </Button>
        </div>
      </header>
    </>
  );
};

export default Header;