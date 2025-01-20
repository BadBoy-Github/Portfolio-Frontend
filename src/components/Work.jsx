

// Components
import ProjectCard from './ProjectCard';

const works = [

    {
        imgSrc: '/images/project-8.jpg',
        title: 'Stellar AI Chatbot',
        tags: ['AI Model', 'Chat'],
        projectLink: 'https://stellar-steel-tau.vercel.app/'
    },
    {
        imgSrc: '/images/project-7.jpg',
        title: 'AI 3D Portfolio',
        tags: ['AI', '3D Model'],
        projectLink: 'https://elayabarathi-ai.netlify.app/'
    },
    {
        imgSrc: '/images/project-1.jpg',
        title: 'Spotify Clone',
        tags: ['Music', 'Clerk', 'Clone'],
        projectLink: 'https://spotify-clone-6rda.onrender.com/'
    },
    {
        imgSrc: '/images/project-2.jpg',
        title: 'eCommerce website',
        tags: ['eCommerce', 'Stripe'],
        projectLink: 'https://full-stack-ecommerce-h47u.vercel.app/'
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
    {
        imgSrc: '/images/project-5.jpg',
        title: 'Iron vs Cancer',
        tags: ['FeNPs', 'Encapsule', 'Cancer'],
        projectLink: '#'
    },
    {
        imgSrc: '/images/project-6.jpg',
        title: 'Silver vs Bacteria',
        tags: ['AgNPs', 'Antimicrobial'],
        projectLink: 'https://journals.innovareacademics.in/index.php/ijap/article/view/51711'
    },
    

];

const Work = () => {
    return (
        <section
            id="work"
            className="section"
        >
            <div className="container">

                <h2 className="headline-2 mb-8 reveal-up">
                    My portfolio highlights
                </h2>

                <div className="grid gap-x-4 gap-y-5 grid-cols-[repeat(auto-fill,_minmax(280px,_1fr))]">
                    {works.map(({ imgSrc, title, tags, projectLink }, key) => (
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
    )
}

export default Work