import { useState, useEffect } from "react";
import EducationCard from "./EducationCard";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Education = () => {
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${BACKEND_URL}/api/education`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setEducation(data.data);
      } catch {
        // education fetch failed
      } finally {
        setLoading(false);
      }
    };
    fetchEducation();
  }, []);

  if (loading) {
    return (
      <section id="education" className="section relative">
        <h2 className="headline-2">My Academic Journey</h2>
        <p className="text-ink-soft mt-3 mb-8 max-w-[50ch]">
          A summary of my academic qualifications
        </p>
        <div className="flex items-center justify-center py-10">
          <div className="loader mb-4"><span></span></div>
        </div>
      </section>
    );
  }

  return (
    <section id="education" className="section relative">
      <h2 className="headline-2">My Academic Journey</h2>
      <p className="text-ink-soft mt-3 mb-8 max-w-[50ch]">
        A summary of my academic qualifications
      </p>

      <div className="">
        <ol className="relative border-r-2 border-ink/10 mr-6 border-separate">
          {education.map((edu, index) => (
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
    </section>
  );
};

export default Education;
