import { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoMenu, IoClose, IoArrowForwardOutline } from 'react-icons/io5';
import Navbar from './Navbar';

const Header = () => {
    const [navOpen, setNavOpen] = useState(false);

    return (
        <>
            <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-terminal-green text-terminal-bg px-4 py-2 font-mono text-sm focus:z-50"
            >
                Skip to main content
            </a>
            <header className="fixed top-0 left-0 w-full h-20 flex items-center z-40 bg-gradient-to-b from-background via-background to-transparent">
                <div className="max-w-screen-2xl w-full mx-auto px-4 flex justify-between items-center md:px-6 md:grid md:grid-cols-[1fr,3fr,1fr]">
                    <h1>
                        <Link to="/" className="logo block w-fit">
                            <img
                                src="/favicon.svg"
                                alt="Elayabarathi"
                                width={40}
                                height={40}
                                loading="lazy"
                                className="rounded-lg ring-2 ring-accent-secondary/30"
                            />
                        </Link>
                    </h1>

                    <div className="relative md:justify-self-center">
                        <button
                            className="menu-btn md:hidden"
                            onClick={() => setNavOpen((prev) => !prev)}
                            aria-label={navOpen ? "Close menu" : "Open menu"}
                            aria-expanded={navOpen}
                        >
                            {navOpen ? (
                                <IoClose className="w-6 h-6 text-foreground" />
                            ) : (
                                <IoMenu className="w-6 h-6 text-foreground" />
                            )}
                        </button>

                        <Navbar navOpen={navOpen} />
                    </div>

                    <Link
                        to="/contact"
                        className="max-w-max h-10 flex justify-center items-center gap-2 px-4 rounded-xl font-medium text-xs md:text-sm ring-1 ring-border/5 ring-inset transition-[background-color] bg-accent-secondary text-accent-foreground hover:bg-electric-blue-light max-lg:hidden lg:justify-self-end group"
                    >
                        <span>Contact</span>
                        <IoArrowForwardOutline className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </header>
        </>
    );
};

export default Header;
