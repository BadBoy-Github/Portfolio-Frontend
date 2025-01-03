

// Components
import ProjectCard from './ProjectCard';

const certificates = [

    {
        imgSrc: '/images/certificates-1.jpg',
        title: 'Spotify Clone',
        tags: ['Clone', 'Clerk', 'Deploy'],
        projectLink: 'https://spotify-clone-6rda.onrender.com/'
    },
    {
        imgSrc: '/images/certificates-2.jpg',
        title: 'eCommerce website',
        tags: ['eCommerce', 'Stripe', 'Deploy'],
        projectLink: 'https://full-stack-ecommerce-h47u.vercel.app/'
    },
    {
        imgSrc: '/images/certificates-3.jpg',
        title: 'Full stack CRUD app',
        tags: ['Web-design', 'ejs'],
        projectLink: 'https://github.com/BadBoy-Github/CRUD-App.git'
    },
    {
        imgSrc: '/images/certificates-4.jpg',
        title: 'Frontend Shopping List',
        tags: ['html', 'CSS', 'JS', 'Deploy'],
        projectLink: 'https://frontend-shopping-list-app.vercel.app/'
    },
    {
        imgSrc: '/images/certificates-5.jpg',
        title: 'Iron vs Cancer',
        tags: ['FeNPs', 'Encapsule', 'Cancer'],
        projectLink: '#'
    },
    {
        imgSrc: '/images/certificates-6.jpg',
        title: 'Silver vs Bacteria',
        tags: ['AgNPs', 'Antimicrobial'],
        projectLink: 'https://journals.innovareacademics.in/index.php/ijap/article/view/51711'
    }

];

const Certificates = () => {
    return (
        <section
            id="certificates"
            className="section"
        >
            <div className="container">

                <h2 className="headline-2 mb-8">
                    Top Certifications 
                </h2>

                <div className="grid gap-x-4 gap-y-5 grid-cols-[repeat(auto-fill,_minmax(280px,_1fr))]">
                    {certificates.map(({ imgSrc, title, tags, projectLink }, key) => (
                        <ProjectCard
                            key={key}
                            imgSrc={imgSrc}
                            title={title}
                            tags={tags}
                            projectLink={projectLink}
                        />
                    ))}
                </div>

            </div>
        </section>
    )
}

export default Certificates