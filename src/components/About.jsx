
const aboutItems = [
    {
      label: 'Project done',
      number: 12
    },
    {
      label: 'Technologies Known',
      number: 16
    }
  ];

const About = () => {
  return (
    <section id="about" className="section">
      <div className="container">
        <div className="bg-zinc-800/50 p-7 rounded-2xl md:p-12 shadow-xl">
          <p className="text-zinc-300 mb-4 md:mb-8 md:text-xl bd:max-w-[60ch]">
            Welcome! I&apos;m Elayabarathi, a professional biotechnologist with
            expertise in microbiology, genetics, and bioinformatics. Innovated
            cancer treatments via nanobiotechnology. Accomplished frontend web
            developer. Passionate about integrating biology and technology for
            innovation. Strong collaborator and problem-solver, dedicated to
            continuous learning and interdisciplinary success.
          </p>

          <div className="flex flex-wrap items-center gap-4 md:gap-7">
            {aboutItems.map(({ label, number }, key) => (
              <div key={key}>
                <div className="flex items-center md:mb-2">
                  <span className="text-2xl font-semibold md:text-4xl">
                    {number}
                  </span>
                  <span className="text-sky-400 font-semibold md:text-3xl">
                    +
                  </span>
                </div>

                <p className="text-sm text-zinc-400">{label}</p>
              </div>
            ))}

            <img
              src="/img/icons/Panda.ico"
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
}

export default About