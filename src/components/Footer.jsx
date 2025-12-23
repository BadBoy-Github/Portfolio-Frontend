

// Components
import RotatingText from "./RotatingText";

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
    href: "#journey",
  },
  {
    label: "Project",
    href: "#project",
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
];

const Footer = () => {
    return (
      <footer className="section">
        <div className="container">
          <div className="lg:grid lg:grid-cols-2">
            <div className="mb-10">
              <h2 className="flex lg:max-w-[12ch] headline-1">Let&apos;s</h2>
              <RotatingText
                texts={["Collab", "Build", "Create", "Break"]}
                mainClassName=" w-fit h-fit text-4xl sm:text-5xl leading-tight font-semibold lg:text-[55px] lg:leading-[1.15] py-2"
                staggerFrom={"last"}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-120%" }}
                staggerDuration={0.025}
                splitLevelClassName="overflow-hidden"
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                rotationInterval={2000}
              />
              <h2 className="flex mb-8 lg:max-w-[12ch] headline-1">today!</h2>
            </div>

            <div className="grid grid-cols-2 gap-4 lg:pl-20 ">
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
            </div>
          </div>

          <div className="flex items-center justify-between pt-10 mb-8">
            <a href="/" className="logo ">
              <img
                src="/img/icons/favicon.svg"
                width={40}
                height={40}
                alt="Elayabarathi M V"
              />
            </a>

            <p className="text-zinc-500 text-sm ">
              &copy; 2025{" "}
              <span className="text-zinc-200">
                · All Rights Reserved |{" "}
                <span className="text-sky-600 font-semibold">
                  Elayabarathi M V
                </span>
              </span>
            </p>
          </div>
        </div>
      </footer>
    );
}

export default Footer