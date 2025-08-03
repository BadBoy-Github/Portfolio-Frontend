

import { VscGithub } from "react-icons/vsc";
import { TbBrandLinkedin } from "react-icons/tb";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";

const socialLinks = [
  {
    href: "https://github.com/BadBoy-Github",
    icon: (
      <VscGithub />
    ),
    alt: "GitHub",
  },
  {
    href: "https://www.linkedin.com/in/elayabarathi/",
    icon: <TbBrandLinkedin />,
    alt: "LinkedIn",
  },
  {
    href: "https://x.com/_Elayabarathi_",
    icon: <FaXTwitter />,
    alt: "Twitter X",
  },
  {
    href: "https://www.instagram.com/_elayabarathi_/",
    icon: <FaInstagram />,
    alt: "Instagram",
  },
  {
    href: "https://wa.me/919842852121",
    icon: <FaWhatsapp />,
    alt: "Whatsapp",
  },
];

const Contact = () => {
    return (
      <section id="contactme" className="section">
        <div className="container lg:grid lg:grid-cols-2 lg:items-stretch">
          <div className="mb-12 lg:mb-0 lg:flex lg:flex-col">
            <h2 className="headline-2 lg:max-w-[12ch]">
              Contact me for collaboration
            </h2>

            <p className="text-zinc-400 mt-3 mb-8 max-w-[50ch] lg:max-w-[30ch]">
              Reach out today to discuss your project needs or learning plans &
              start collaborating on something amazing!
            </p>

            <div className="flex items-center gap-2 mt-auto">
              {socialLinks.map(({ href, icon }, key) => (
                <a
                  key={key}
                  href={href}
                  target="_blank"
                  className="w-12 h-12 grid place-items-center ring-inset ring-2 ring-zinc-50/5 rounded-lg transition-[background-color,color]
                                hover:bg-zinc-50 hover:text-zinc-950 active:bg-zinc-50/80 duration-300 text-xl"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          <form
            action="https://getform.io/f/bolldxna"
            method="POST"
            className="xl:pl-10 2xl:pl-20"
          >
            <div className="md:grid md:items-center md:grid-cols-2 md:gap-2">
              <div className="mb-4">
                <label htmlFor="name" className="label ">
                  Name
                </label>

                <input
                  type="text"
                  name="name"
                  id="name"
                  autoComplete="name"
                  required
                  placeholder="Enter your name"
                  className="text-field "
                />
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="label ">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="email"
                  required
                  placeholder="Enter your email"
                  className="text-field "
                />
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="message" className="label ">
                Message
              </label>

              <textarea
                name="message"
                id="message"
                required
                placeholder="Enter your message"
                className="text-field resize-y min-h-32 max-h-80 "
              ></textarea>
            </div>

            <button
              type="submit"
              className="btn btn-primary [&]:max-w-full w-full justify-center "
            >
              Submit
            </button>
          </form>
        </div>
      </section>
    );
}

export default Contact