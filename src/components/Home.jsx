// Components

import { ButtonPrimary, ButtonOutline } from "./Button";
import EvilEye from "./EvilEye";

const Home = () => {
  return (
    <section className="pt-28 lg:pt-36 mb-20" id="home">
      <div className=" lg:grid lg:grid-cols-[3fr_4fr] items-center lg:gap-10">
        <div>
          <div className="flex items-center gap-3">
            <figure className="img-box size-10 rounded-lg">
              <img
                src="/icon.webp"
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

            <h2 className="headline-1 max-w-[15ch] sm:max-w-[20ch] lg:max-w-[14ch] mt-1 mb-4 lg:mb-10">
              Creating Modern User Focused Interfaces
            </h2>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <ButtonPrimary
              label="Download Resume"
              icon="download"
              href="/resume.pdf"
              target="_blank"
            />

            <ButtonOutline
              href="/about?scroll=chatbot"
              label="Chat with AI"
              icon="robot_2"
            />
          </div>
        </div>
        {/* Updated Model Container */}
        <div className="hidden lg:flex justify-center items-center h-[480px] w-full">
          <EvilEye
            eyeColor="#0284c7"
            intensity={1}
            pupilSize={1}
            irisWidth={0.3}
            glowIntensity={0.35}
            scale={0.6}
            noiseScale={1}
            pupilFollow={1.2}
            flameSpeed={1.2}
            backgroundColor="#18181b"
          />
        </div>
      </div>
    </section>
  );
};

export default Home;
