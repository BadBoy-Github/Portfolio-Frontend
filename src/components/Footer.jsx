import { Link } from "react-router-dom";
import RotatingText from "./RotatingText";

const sitemap = [
  { label: "Home", href: "/", icon: "home" },
  { label: "About", href: "/about", icon: "person" },
  { label: "Projects", href: "/projects", icon: "work" },
  { label: "Blogs", href: "/blogs", icon: "article" },
  { label: "Contact", href: "/contact", icon: "mail" },
];

const socials = [
  { label: 'GitHub', href: 'https://github.com/BadBoy-Github', icon: 'logo_github' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/elayabarathi/', icon: 'logo_linkedin' },
  { label: 'Gmail', href: 'mailto:elayabarathiedison@gmail.com', icon: 'mail' },
];

const Footer = () => {
  return (
    <footer className="section border-t border-border pt-16">
      <div className="container">
        <div className="lg:grid lg:grid-cols-2 gap-12">
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-6">
              <span className="material-symbols-rounded text-accent-secondary text-2xl"></span>
              <h2 className="headline-2 gold-text max-w-[10ch]">Let&apos;s</h2>
            </div>
            <RotatingText
              texts={["Collab", "Build", "Create", "Break"]}
              mainClassName="text-4xl sm:text-5xl lg:text-[55px] leading-[1.05] font-display text-white py-2 gold-text"
              staggerFrom={"last"}
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-120%", opacity: 0 }}
              staggerDuration={0.025}
              splitLevelClassName="overflow-hidden"
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              rotationInterval={3000}
            />
            <h2 className="flex mb-6 lg:max-w-[10ch] headline-2 gold-text">
              today!
            </h2>
            <p className="body-text text-muted-foreground max-w-md">
              I&apos;m always open to discussing new opportunities, creative
              collaborations, or interesting conversations about technology and
              design. Let&apos;s build something amazing together.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 lg:gap-12">
            <div>
              <p className="mb-4 text-xs font-mono text-accent-secondary uppercase tracking-[0.15em]">
                Sitemap
              </p>
              <ul className="space-y-2">
                {sitemap.map(({ label, href, icon }, key) => (
                  <li key={key}>
                    <Link
                      to={href}
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
                    >
                      <span className="material-symbols-rounded text-xs text-accent-secondary group-hover:scale-110 transition-transform">
                        {icon}
                      </span>
                      <span>{label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="mb-4 text-xs font-mono text-accent-secondary uppercase tracking-[0.15em]">
                Connect
              </p>
              <ul className="space-y-2">
                {socials.map(({ label, href, icon }, key) => (
                  <li key={key}>
                    <a
                      href={href}
                      target={key === 2 ? "_self" : "_blank"}
                      rel={key !== 2 ? "noopener noreferrer" : undefined}
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
                    >
                      <span className="material-symbols-rounded text-xs text-accent-secondary group-hover:scale-110 transition-transform">
                        {icon}
                      </span>
                      <span>{label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-12 mb-8 border-t border-border">
          <a href="/" className="logo">
            <img
              src="/favicon.svg"
              width={40}
              height={40}
              alt="Elayabarathi M V"
              loading="lazy"
              className="rounded-lg ring-2 ring-accent-secondary/30"
            />
          </a>

          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()}
            <span className="text-accent-secondary font-medium">
              {" "}· All Rights Reserved <span className="hidden md:inline"> | </span>
              <span className="text-white block md:inline mt-1 text-end md:mt-0">
                Elayabarathi M V
              </span>
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
