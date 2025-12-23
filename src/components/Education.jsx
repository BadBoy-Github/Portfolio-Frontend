

import EducationCard from "./EducationCard";

import { EduContent } from "./data/EducationData";

const Education = () => {
  return (
    <section className="section">
      <div className="px-4 mx-auto lg:px-6 xl:max-w-6xl container relative">
        <h2 className="headline-2 ">My Academic Journey</h2>
        <p className="text-zinc-400 mt-3 mb-8 max-w-[50ch] ">
          A summary of my academic qualifications
        </p>

        <div className="">
          <ol className="relative border-l-2 border-zinc-50/10 ml-6 border-separate">
            {EduContent.map((edu, index) => (
              <EducationCard
                key={index}
                year={edu.year}
                name={edu.name}
                perc={edu.perc}
                instName={edu.instName}
                instLogo={edu.instLogo}
                instLink={edu.instLink}
                desc={edu.desc}
                skills={edu.skills}
              />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default Education;
