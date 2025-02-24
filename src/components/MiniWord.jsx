

// Components
import ProjectCard from './ProjectCard';

const miniworks = [

    {
        imgSrc: '/images/project-7.jpg',
        title: 'AI 3D Portfolio',
        tags: ['AI', '3D Model'],
        projectLink: 'https://elayabarathi-ai.netlify.app/'
    },
    {
        imgSrc: '/images/project-3.jpg',
        title: 'Full stack CRUD app',
        tags: ['Web-design', 'ejs'],
        projectLink: 'https://github.com/BadBoy-Github/CRUD-App.git'
    },
    {
        imgSrc: '/images/project-4.jpg',
        title: 'Frontend Shopping List',
        tags: ['html', 'CSS', 'JS',],
        projectLink: 'https://frontend-shopping-list-app.vercel.app/'
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