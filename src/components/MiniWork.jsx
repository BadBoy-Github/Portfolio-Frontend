

// Components
import ProjectCard from './ProjectCard';

const miniworks = [
  {
    imgSrc: "/images/miniproject-4.jpg",
    title: "AI 3D Portfolio",
    tags: ["AI", "3D Model"],
    projectLink: "https://elayabarathi-ai.netlify.app/",
  },
  {
    imgSrc: "/images/miniproject-3.jpg",
    title: "Full stack CRUD app",
    tags: ["Web-design", "ejs"],
    projectLink: "https://github.com/BadBoy-Github/CRUD-App.git",
  },
  {
    imgSrc: "/images/miniproject-2.jpg",
    title: "Frontend Shopping List",
    tags: ["html", "CSS", "JS"],
    projectLink: "https://frontend-shopping-list-app.vercel.app/",
  },
  {
    imgSrc: "/images/miniproject-6.jpg",
    title: "Profile Card",
    tags: ["html", "CSS"],
    projectLink: "https://profile-card-001.netlify.app/",
  },
  {
    imgSrc: "/images/miniproject-5.jpg",
    title: "Task Sheduler",
    tags: ["html", "CSS", "JS"],
    projectLink: "https://task-sheduler-simple.onrender.com/",
  },
  {
    imgSrc: "/images/miniproject-1.jpg",
    title: "LinkedIn Form",
    tags: ["html", "CSS"],
    projectLink: "https://linkedin-form-1.onrender.com/",
  },
];

const MiniWork = () => {
    return (
      <section id="miniworks" className="section">
        <div className="container">
          <h2 className="headline-2 mb-8 reveal-up">Some minor projects</h2>

          <div className="grid gap-x-4 gap-y-5 grid-cols-[repeat(auto-fill,_minmax(280px,_1fr))]">
            {miniworks.map(({ imgSrc, title, tags, projectLink }, key) => (
              <ProjectCard
                key={key}
                imgSrc={imgSrc}
                title={title}
                tags={tags}
                projectLink={projectLink}
                classes="reveal-up"
              />
            ))}
          </div>
        </div>
      </section>
    );
}

export default MiniWork