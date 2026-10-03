import { ButtonPrimary, ButtonOutline } from "./Button";
import EvilEye from "./EvilEye";

const Home = () => {
  return (
    <section
      className="pt-28 lg:pt-36 mb-20"
      id="home"
      role="banner"
      aria-labelledby="home-heading"
    >
      <div className="grid lg:grid-cols-[1.1fr_0.9fr] items-center gap-12 lg:gap-10">
        <div>
          <div className="flex items-center gap-3 mb-6">
            <figure className="img-box size-12 rounded-lg ring-2 ring-accent-secondary/30">
              <img
                src="/icon.webp"
                width={48}
                height={48}
                alt="Elayabarathi M V Portrait"
                loading="lazy"
                className="img-cover rounded-md"
              />
            </figure>

            <div className="flex items-center gap-2 text-sm tracking-wide">
              <span className="relative w-2 h-2 rounded-full bg-terminal-green">
                <span className="absolute inset-0 rounded-full bg-terminal-green animate-ping"></span>
              </span>
              <span className="text-terminal-green font-mono">
                Available for work
              </span>
            </div>
          </div>

          <div className="mb-8">
            <span className="section-label mb-6">
              <span className="dot"></span>
              <span>Neo-Terminal Developer</span>
            </span>

            <h1
              id="home-heading"
              className="headline-1 text-foreground mb-4"
            >
              Building Modern
              <span className="gradient-text"> Digital </span>
              Experiences
            </h1>

            <p className="body-text text-muted-foreground max-w-[50ch] mt-6">
              Frontend developer who crafts thoughtful, performant interfaces
              that bridge the precision of code with the warmth of human-centered
              design.
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row mt-8">
            <ButtonPrimary
              label="Download Resume"
              icon
              href="/resume.pdf"
              target="_blank"
              size="lg"
            />

            <ButtonOutline
              href="/about"
              label="Chat with AI"
              icon
              size="lg"
            />
          </div>
        </div>

        <div className="relative flex justify-center items-center h-[480px] w-full">
          <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-gradient-electric-diagonal opacity-10 blur-[100px]"></div>
          <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-gold opacity-10 blur-[80px]"></div>

          <div className="absolute top-4 right-4 rotating-ring opacity-30 hidden md:block">
            <svg width="60" height="60" viewBox="0 0 60 60">
              <circle
                cx="30" cy="30" r="26" fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="80 200"
                className="text-accent-secondary"
              />
            </svg>
          </div>

          <div className="relative z-10">
            <EvilEye
              eyeColor="#33ff00"
              intensity={1}
              pupilSize={1}
              irisWidth={0.3}
              glowIntensity={0.35}
              scale={0.6}
              noiseScale={1}
              pupilFollow={1.2}
              flameSpeed={1.2}
              backgroundColor="#0a0a0a"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
