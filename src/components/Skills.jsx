

// Components
import SkillCard from "./SkillCard";


const skillItem = [
  {
    imgSrc: "/img/skills/react.svg",
    label: "ReactJS",
    desc: "Framework for UI",
  },
  {
    imgSrc: "/img/skills/tailwindcss.svg",
    label: "TailwindCSS",
    desc: "Framework for CSS",
  },
  {
    imgSrc: "/img/skills/javascript.svg",
    label: "JavaScript",
    desc: "Dynamic Interaction",
  },
  {
    imgSrc: "/img/skills/html.svg",
    label: "HTML5",
    desc: "Web Page Structure",
  },
  {
    imgSrc: "/img/skills/css3.svg",
    label: "CSS3",
    desc: "Web Page Styling",
  },
  {
    imgSrc: "/img/skills/bootstrap.svg",
    label: "Bootstrap",
    desc: "Framework for CSS",
  },
  {
    imgSrc: "/img/skills/python.svg",
    label: "Python",
    desc: "High Level Programming",
  },
  {
    imgSrc: "/img/skills/github.svg",
    label: "Github",
    desc: "Version Control",
  },
  {
    imgSrc: "/img/skills/vercel.svg",
    label: "Vercel",
    desc: "Deployment & Hosting",
  },
  {
    imgSrc: "/img/skills/netlify.svg",
    label: "Netlify",
    desc: "Deployment & Hosting",
  },
  {
    imgSrc: "/img/skills/render.svg",
    label: "Render",
    desc: "Deployment & Hosting",
  },
  {
    imgSrc: "/img/skills/canva.svg",
    label: "Canva",
    desc: "Graphic Design",
  },
  {
    imgSrc: "/img/skills/adobeexpress.svg",
    label: "Adobe Express",
    desc: "Graphic Design",
  },
  {
    imgSrc: "/img/skills/autocad.svg",
    label: "AutoCAD",
    desc: "CAD & Drafting",
  },
  {
    imgSrc: "/img/skills/msoffice.svg",
    label: "MS Office",
    desc: "Productivity Suite",
  },
  {
    imgSrc: "/img/skills/powerdirector.svg",
    label: "PowerDirector",
    desc: "Video Editing",
  },
];

const Skills = () => {
    return (
        <section className="section">
            <div className="container">

                <h2 className="headline-2 ">
                    Essential Tools I use
                </h2>


                <p className="text-zinc-400 mt-3 mb-8 max-w-[50ch] ">
                    Discover the powerful tools and technologies I use
                </p>

                <div className="grid gap-3 grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))]">
                    {
                        skillItem.map(({ imgSrc, label, desc }, key) => (
                            <SkillCard 
                            imgSrc={imgSrc}
                            label={label}
                            desc={desc}
                            key={key}
                            classes=""
                            />
                        ))
                    }
                </div>

            </div>
        </section>
    )
}

export default Skills