

// Components
import { ButtonPrimary } from "./Button";

const sitemap = [
  {
    label: "Home",
    href: "#home",
  },
  {
    label: "About",
    href: "#about",
  },
  {
    label: "Journey",
    href: "#education"
  },
  {
    label: "Work",
    href: "#work",
  },
  {
    label: "Certifications",
    href: "#certification",
  },
  {
    label: "Reviews",
    href: "#reviews",
  },
  {
    label: "Contact me",
    href: "#contactme",
  },
];

const socials = [
    {
        label: 'GitHub',
        href: 'https://github.com/BadBoy-Github'
    },
    {
        label: 'LinkedIn',
        href: 'https://www.linkedin.com/in/elayabarathi/'
    },
    {
        label: 'Twitter X',
        href: 'https://x.com/_Elayabarathi_'
    },
    {
        label: 'Instagram',
        href: 'https://www.instagram.com/_elayabarathi_/'
    },
    {
        label: 'Whatsapp',
        href: 'https://wa.me/919842852121'
    }
];

const Footer = () => {
    return (
      <footer className="section">
        <div className="container">
          <div className="lg:grid lg:grid-cols-2">
            <div className="mb-10">
              <h2 className="headline-1 mb-8 lg:max-w-[12ch] ">
                Let&apos;s Collab today!
              </h2>

              <ButtonPrimary
                href="#contactme"
                label="Start Collab"
                icon="chevron_right"
                classes=""
              />
            </div>

            <div className="grid grid-cols-2 gap-4 lg:pl-20 ">
              <div className="">
                <p className="mb-2 ">Sitemap</p>

                <ul>
                  {sitemap.map(({ label, href }, key) => (
                    <li key={key}>
                      <a
                        href={href}
                        className="block gap-4 text-sm text-zinc-400 py-1 transition-all duration-300 hover:text-zinc-200 w-fit"
                      >
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="mb-2 ">Socials</p>

                <ul>
                  {socials.map(({ label, href }, key) => (
                    <li key={key}>
                      <a
                        href={href}
                        target="_blank"
                        className="block text-sm text-zinc-400 py-1 transition-all duration-300 hover:text-zinc-200 w-fit"
                      >
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-10 mb-8">
            <a href="/" className="logo ">
              <img
                src="/img/icons/Panda.webp"
                width={40}
                height={40}
                alt="Elayabarathi M V"
              />
            </a>

            <p className="text-zinc-500 text-sm ">
              &copy; 2025{" "}
              <span className="text-zinc-200">
                ·{" "}
                <span className="text-white hover:text-sky-500 transition-colors duration-300">
                  <a href="https://elayabarathimv-portfolio.vercel.app/">
                    Elayabarathi M V
                  </a>
                </span>{" "}
                |{" "}
                <span className="text-sky-500 hover:text-white transition-colors duration-300">
                  <a href="https://panda-productions.vercel.app/">
                    Panda Productions
                  </a>
                </span>
              </span>
            </p>
          </div>
        </div>
      </footer>
    );
}

export default Footer