import CountUp from "./CountUp";

const aboutItems = [
  {
    label: "Project done",
    number: 21,
  },
  {
    label: "Technologies Known",
    number: 16,
  },
];

const Welcome = () => {
  return (
    <section className="section">
      <div className="container">
        <div className="bg-zinc-800/50 p-7 rounded-2xl md:p-12 shadow-xl">
          <p className="text-zinc-300 mb-4 md:mb-8 md:text-xl bd:max-w-[60ch]">
            {/* TODO:replace about section */}
            Welcome! I’m Elayabarathi, a passionate frontend web developer. Skilled in building responsive,
            user-friendly websites using modern web technologies. Experienced in
            translating ideas into clean, functional interfaces with a strong
            focus on usability and performance. A strong collaborator and
            problem-solver, committed to continuous learning and staying updated
            with evolving web standards. Driven to create impactful digital
            solutions through creativity, logic, and technology.
          </p>

          <div className="flex flex-wrap items-center gap-4 md:gap-7">
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
