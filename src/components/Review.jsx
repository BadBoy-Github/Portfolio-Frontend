
// Components
import ReviewCard from './ReviewCard';

import { reviews } from './data/ReviewData';

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