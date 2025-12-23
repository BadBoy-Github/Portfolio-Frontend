import CountUp from "./CountUp";

const aboutItems = [
  {
    label: "Technologies",
    number: 16,
  },
  {
    label: "Live Project",
    number: 24,
  },
  {
    label: "Repositories",
    number: 75,
  },
];

const Welcome = () => {
  return (
    <section className="section">
      <div className="container">
        <div className="bg-zinc-800/50 p-7 rounded-2xl md:p-12 shadow-xl">
          <p className="text-zinc-300 mb-4 md:mb-8 md:text-xl bd:max-w-[60ch]">
            Welcome! I&apos;m Elayabarathi, a passionate frontend developer
            dedicated to building responsive, user-friendly websites. I
            specialize in translating ideas into clean, high-performance
            interfaces. A collaborative problem-solver and continuous learner, I
            combine creativity and logic to deliver impactful digital solutions
            that meet modern web standards and prioritize the user experience.
          </p>

          <div className="flex flex-wrap items-center gap-5 md:gap-8">
            {aboutItems.map(({ label, number }, key) => (
              <div key={key}>
                <div className="flex items-center md:mb-2">
                  <span className="text-2xl font-semibold md:text-4xl">
                    <CountUp
                      from={0}
                      to={number}
                      separator=","
                      direction="up"
                      duration={0.1}
                      className="count-up-text"
                    />
                  </span>
                  <span className="text-sky-400 font-semibold md:text-3xl">
                    +
                  </span>
                </div>

                <p className="text-sm text-zinc-400">{label}</p>
              </div>
            ))}

            <img
              src="/img/icons/favicon.svg"
              alt="Elayabarathi M V"
              width={30}
              height={30}
              className="ml-auto md:w-[40px] md:h-[40px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Welcome;
