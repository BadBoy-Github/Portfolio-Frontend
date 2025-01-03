

// Components
import SkillCard from "./SkillCard";


const skillItem = [
    {
        imgSrc: '/images/react.svg',
        label: 'React',
        desc: 'Framework'
    },
    {
        imgSrc: '/images/tailwindcss.svg',
        label: 'TailwindCSS',
        desc: 'User Interface'
    },
    {
        imgSrc: '/images/html.svg',
        label: 'HTML',
        desc: 'Markup Language'
    },
    {
        imgSrc: '/images/css3.svg',
        label: 'CSS',
        desc: 'User Interface'
    },
    {
        imgSrc: '/images/javascript.svg',
        label: 'JavaScript',
        desc: 'Interaction'
    },
    {
        imgSrc: '/images/nodejs.svg',
        label: 'NodeJS',
        desc: 'Web Server'
    },
    {
        imgSrc: '/images/expressjs.svg',
        label: 'ExpressJS',
        desc: 'Node Framework'
    },
    {
        imgSrc: '/images/mongodb.svg',
        label: 'MongoDB',
        desc: 'Database'
    },
    {
        imgSrc: '/images/bootstrap.svg',
        label: 'Bootstrap',
        desc: 'CSS Framework'
    },
    {
        imgSrc: '/images/github.svg',
        label: 'Github',
        desc: 'Version Control'
    },
    { 
        imgSrc: '/images/vercel.svg', 
        label: 'Vercel', 
        desc: 'Deployment' 
    },
    { 
        imgSrc: '/images/render.svg', 
        label: 'Render', 
        desc: 'Deployment' 
    },
    { 
        imgSrc: '/images/canva.svg', 
        label: 'Canva', 
        desc: 'Graphic Design' 
    }, 
    { 
        imgSrc: '/images/powerdirector.svg', 
        label: 'PowerDirector', 
        desc: 'Video Editing' 
    }, 
    { 
        imgSrc: '/images/autocad.svg', 
        label: 'AutoCAD', 
        desc: 'CAD Software' 
    }, 
    { 
        imgSrc: '/images/photoshop.svg', 
        label: 'Photoshop', 
        desc: 'Photo Editing' 
    }
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