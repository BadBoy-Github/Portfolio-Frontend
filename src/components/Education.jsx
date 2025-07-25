
import { TbBulb } from "react-icons/tb";

const Education = () => {
  return (
    <section id="education" className="section">
      <div className="px-4 mx-auto lg:px-6 xl:max-w-6xl container relative">
        <h2 className="headline-2 reveal-up">My Academic Journey</h2>
        <p className="text-zinc-400 mt-3 mb-8 max-w-[50ch] reveal-up">
          A summary of my academic qualifications
        </p>

        <div className="">
          <ol className="relative border-s-2 border-zinc-50/10">
            <li className="mb-10 ms-6">
              <span className="absolute flex items-center justify-center w-10 h-10 bg-zinc-600 rounded-full -start-5 ring-8 ring-zinc-50/10 cursor-pointer">
                <img
                  className="rounded-full shadow-lg"
                  src="/public/images/ksr logo.jpg"
                  alt="KSR"
                />
              </span>
              <div className="items-center cursor-pointer justify-between p-6 ml-4 bg-zinc-800 hover:bg-zinc-700/50 active:bg-zinc-700/60 rounded-2xl sm:flex ring-1 ring-inset ring-zinc-50/5 transition-all group hover:scale-[101%] reveal-up">
                <time className="mb-1 text-xs font-normal text-zinc-400  sm:order-last sm:mb-0 sm:w-fit sm:text-center">
                  2020 - 2024
                </time>
                <div className="text-sm font-normal text-zinc-300 ">
                  <div className="flex gap-1 items-center">
                    <p className="group-hover:text-sky-500 transition-colors duration-300">
                      B.Tech Biotechnology{"  "}
                    </p>
                    <span className="bg-zinc-600 text-zinc-300 text-xs font-normal ml-1 me-2 px-2.5 py-0.5 rounded-md group-hover:text-white transition-all duration-300">
                      88.1%
                    </span>
                  </div>
                  <p className="font-semibold text-zinc-200 mt-2">
                    K S Rangasamy College of Technology
                  </p>
                  <div className=" mt-2 w-[90%]">
                    <p className=" text-sm font-normal text-zinc-300">
                      During my time at K.S. Rangasamy College of Technology, I
                      earned a B.Tech in Biotechnology, gaining a strong
                      foundation in core principles and practical lab skills.
                      Beyond academics, active participation in extracurricular
                      and cultural events helped me develop leadership and
                      interpersonal abilities. This experience nurtured my
                      passion for continuous learning and innovation in
                      biotechnology.
                    </p>
                    <div className="flex gap-2 items-center mt-4 text-zinc-400">
                      <TbBulb className="size-5 group-hover:text-yellow-500 group-hover:scale-110 group-hover:animate-pulse duration-300 transition-all" />
                      <span className="group-hover:text-zinc-300 transition-colors duration-300">
                        Microbiology, Genetic Engineering, Nanobiotechnology,
                        Plant Tissue Culture, Bioinformatics
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
}

export default Education