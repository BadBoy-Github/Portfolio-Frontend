

// Components
import { ButtonPrimary, ButtonOutline } from './Button'


const Hero = () => {
    return (
      <section className="pt-28 lg:pt-36" id="home">
        <div className="container lg:grid lg:grid-cols-2 items-center lg:gap-10">
          <div>
            <div className="flex items-center gap-3">
              <figure className="img-box size-10 rounded-lg">
                <img
                  src="/images/avatar-1.jpeg"
                  width={40}
                  height={40}
                  alt="Elayabarathi M V Portrait"
                  className="img-cover rounded-md"
                />
              </figure>

              <div className="flex items-center gap-1.5 text-zinc-400 text-sm tracking-wide">
                <span className="relative w-2 h-2 rounded-full bg-emerald-400">
                  <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping"></span>
                </span>
                Available for work
              </div>
            </div>

            <div className="animated-text mt-6">
              <span className="headline-transition"></span>

              <h2 className="headline-1 max-w-[15ch] sm:max-w-[20ch] lg:max-w-[15ch] mt-1 mb-4 lg:mb-10">
                Enthusiast in Scientific & Technological Innovations
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <ButtonPrimary
                label="Download CV"
                icon="download"
                href="/Elayabarathi Resume.pdf"
                target="_blank"
              />

              <ButtonOutline
                href="#about"
                label="Scroll down"
                icon="arrow_downward"
              />
            </div>
          </div>

          <div className="hidden lg:block">
            <figure
              className="w-full max-w-[480px] ml-auto bg-gradient-to-t from-sky-400 via-25% via-sky-400/40 to-65% 
                    rounded-[60px] overflow-hidden"
            >
              <img
                src="/images/hero-banner.png"
                width={656}
                height={800}
                alt="Elayabarathi M V"
                className="w-full"
              />
            </figure>
          </div>
        </div>
      </section>
    );
}

export default Hero
