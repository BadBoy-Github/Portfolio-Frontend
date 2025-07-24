

// Components
import SkillCard from "./SkillCard";


const skillItem = [
  {
    imgSrc: "/images/react.svg",
    label: "React JS",
    desc: "Framework for UI",
  },
  {
    imgSrc: "/images/tailwindcss.svg",
    label: "Tailwind CSS",
    desc: "Framework for CSS",
  },
  {
    imgSrc: "/images/javascript.svg",
    label: "JavaScript",
    desc: "Dynamic Interaction",
  },
  {
    imgSrc: "/images/html.svg",
    label: "HTML5",
    desc: "Web Page Structure",
  },
  {
    imgSrc: "/images/css3.svg",
    label: "CSS3",
    desc: "Web Page Styling",
  },
  {
    imgSrc: "/images/bootstrap.svg",
    label: "Bootstrap",
    desc: "Framework for CSS",
  },
  // {
  //   imgSrc: "/images/typescript.svg",
  //   label: "TypeScript",
  //   desc: "Typed JavaScript",
  // },
  // {
  //   imgSrc: "/images/nodejs.svg",
  //   label: "NodeJS",
  //   desc: "Web Server",
  // },
  // {
  //   imgSrc: "/images/expressjs.svg",
  //   label: "ExpressJS",
  //   desc: "Node Framework",
  // },
  {
    imgSrc: "/images/mongodb.svg",
    label: "MongoDB",
    desc: "NoSQL Database",
  },
  {
    imgSrc: "/images/python.svg",
    label: "Python",
    desc: "High Level Programming",
  },
  {
    imgSrc: "/images/github.svg",
    label: "Github",
    desc: "Version Control",
  },
  // {
  //   imgSrc: "/images/gitlab.svg",
  //   label: "GitLab",
  //   desc: "Version Control",
  // },
  {
    imgSrc: "/images/vercel.svg",
    label: "Vercel",
    desc: "Deployment & Hosting",
  },
  {
    imgSrc: "/images/netlify.svg",
    label: "Netlify",
    desc: "Deployment & Hosting",
  },
  {
    imgSrc: "/images/render.svg",
    label: "Render",
    desc: "Deployment & Hosting",
  },
  // {
  //   imgSrc: "/images/cplusplus.svg",
  //   label: "C++",
  //   desc: "Object Oriented Program",
  // },
  {
    imgSrc: "/images/canva.svg",
    label: "Canva",
    desc: "Graphic Design",
  },
  {
    imgSrc: "/images/adobeexpress.svg",
    label: "Adobe Express",
    desc: "Graphic Design",
  },
  {
    imgSrc: "/images/autocad.svg",
    label: "AutoCAD",
    desc: "CAD & Drafting",
  },
  // {
  //   imgSrc: "/images/powerbi.svg",
  //   label: "Power BI",
  //   desc: "Data Visualization",
  // },
  {
    imgSrc: "/images/msoffice.svg",
    label: "MS Office",
    desc: "Productivity Suite",
  },
  {
    imgSrc: "/images/powerdirector.svg",
    label: "PowerDirector",
    desc: "Video Editing",
  },
  // {
  //   imgSrc: "/images/photoshop.svg",
  //   label: "Photoshop",
  //   desc: "Pro Photo Editing",
  // },
  // {
  //   imgSrc: "/images/premierepro.svg",
  //   label: "Adobe Premiere Pro",
  //   desc: "Pro Video Editing",
  // },
];

const Skills = () => {
    return (
        <section className="section">
            <div className="container">

                <h2 className="headline-2 reveal-up">
                    Essential Tools I use
                </h2>


                <p className="text-zinc-400 mt-3 mb-8 max-w-[50ch] reveal-up">
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
                            classes="reveal-up"
                            />
                        ))
                    }
                </div>

            </div>
        </section>
    )
}

export default Skills