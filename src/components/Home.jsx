// Components
import { Bot, Download } from "lucide-react";
import { Button } from "./Button";

const CornerMarks = () => (
  <>
    <span className="absolute -top-2 -left-2 w-6 h-6 border-l-2 border-t-2 border-ink rounded-wobbly-sm" />
    <span className="absolute -top-2 -right-2 w-6 h-6 border-r-2 border-t-2 border-ink rounded-wobbly-sm" />
    <span className="absolute -bottom-2 -left-2 w-6 h-6 border-l-2 border-b-2 border-ink rounded-wobbly-sm" />
    <span className="absolute -bottom-2 -right-2 w-6 h-6 border-r-2 border-b-2 border-ink rounded-wobbly-sm" />
  </>
);

const ScribbleArrow = () => (
  <svg
    className="hidden lg:block absolute -top-8 left-0 w-32 h-16 -rotate-6"
    viewBox="0 0 128 64"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M6 10 C 44 2, 92 12, 100 40"
      stroke="rgb(45 45 45)"
      strokeWidth="2.5"
      strokeDasharray="8 8"
      strokeLinecap="round"
    />
    <path
      d="M88 34 L102 48 L94 26"
      stroke="rgb(45 93 161)"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Home = () => {
  return (
    <section className="pt-28 lg:pt-36 mb-20" id="home" aria-labelledby="home-heading">
      <div className="lg:grid lg:grid-cols-[3fr_4fr] items-center lg:gap-10">
        <div>
          <div className="flex items-center gap-3">
            <span className="logo w-11 h-11 shrink-0">
              <img
                src="/icon.webp"
                width={40}
                height={40}
                alt="Elayabarathi M V monogram"
                loading="lazy"
              />
            </span>

            <div className="flex items-center gap-2 text-ink-soft text-lg">
              <span className="relative w-3 h-3 rounded-wobbly-sm bg-marker border border-ink">
                <span className="absolute inset-0 rounded-wobbly-sm bg-marker animate-ping"></span>
              </span>
              Available for work
            </div>
          </div>

          <div className="animated-text mt-6">
            <span className="headline-transition"></span>

            <h2
              id="home-heading"
              className="headline-1 max-w-[15ch] sm:max-w-[20ch] lg:max-w-[14ch] mt-6 mb-10"
            >
              Creating Modern User Focused Interfaces
            </h2>
          </div>

          <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center">
            <ScribbleArrow />

            <Button icon={Download} href="/resume.pdf" target="_blank">
              Download Resume
            </Button>

            <Button variant="outline" href="/about" icon={Bot}>
              Chat with AI
            </Button>
          </div>
        </div>

        <div className="hidden lg:flex justify-center w-full">
          <div className="relative w-full max-w-[520px]">
            <div className="relative bg-paper-card border-2 border-ink rounded-wobbly-lg shadow-hard-lg p-4 rotate-1">
              <CornerMarks />

              <div className="h-[440px] w-full flex items-center justify-center">
                <p className="text-ink-soft text-center">
                  Add your video or embed here
                </p>
              </div>
            </div>

            <span className="hidden md:block absolute -top-6 -right-8 w-12 h-12 rounded-wobbly bg-postit border-2 border-ink shadow-hard-sm animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;