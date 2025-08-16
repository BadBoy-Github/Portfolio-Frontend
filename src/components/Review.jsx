
// Components
import ReviewCard from './ReviewCard';

const reviews = [
  {
    content:
      "Groundbreaking work on the anticancer project using Iron oxide nanoparticles! Their innovative approach led to significant advancements and promising results. Highly commendable.",
    name: "Rithanya",
    imgSrc: "/img/reviews/people-5.jpg",
    company: "Senior Medical Coder",
  },
  {
    content:
      "Skilled coder with impressive projects like CRUD app, eCommerce website, and Spotify clone. Their technical prowess and creativity shine through.",
    name: "Sanjay",
    imgSrc: "/img/reviews/people-2.jpg",
    company: "Junior Software Developer",
  },
  {
    content:
      "Outstanding individual with diverse extracurricular activities, always eager to explore and learn. Their enthusiasm and versatility are remarkable.",
    name: "Subaash Sivan",
    imgSrc: "/img/reviews/people-3.jpg",
    company: "Associate Bank Manager",
  },
  {
    content:
      "Talented beginner web developer who created a basic eCommerce website. Their commitment to learning and improving their skills is evident.",
    name: "Dhil Rohith",
    imgSrc: "/img/reviews/people-4.jpg",
    company: "Senior Backend Developer",
  },
  {
    content:
      "Exceptional biotechnologist who completed their B.Tech in Biotechnology with flying colors. Their expertise and dedication are truly commendable.",
    name: "Kishore",
    imgSrc: "/img/reviews/people-6.jpg",
    company: "Freelancer",
  },
  {
    content:
      "A good learner who learns from mistakes and excels in problem-solving. Their ability to adapt and overcome challenges is impressive.",
    name: "Asothama Chakravarthi",
    imgSrc: "/img/reviews/people-1.jpg",
    company: "Textile Business",
  },
];

const Review = () => {

    return (
      <section id="reviews" className="section overflow-hidden ">
        <div className="container ">
          <h2 className="headline-2 ">What my colleagues say</h2>
          <p className="text-zinc-400 mt-3 mb-8 max-w-[50ch] ">
            Hear directly from those who’ve collaborated with me
          </p>

          <div className=" grid grid-cols-1 md:grid-cols-2 items-stretch w-full gap-4 lg:gap-6 pb-10">
            {reviews.map(({ content, name, imgSrc, company }, key) => (
              <ReviewCard
                key={key}
                name={name}
                imgSrc={imgSrc}
                company={company}
                content={content}
              />
            ))}
          </div>
        </div>
      </section>
    );
}

export default Review