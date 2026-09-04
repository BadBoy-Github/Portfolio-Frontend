import { useState, useEffect } from "react";
import ReviewCard from "./ReviewCard";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Review = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${BACKEND_URL}/api/reviews`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setReviews(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  if (loading) {
    return (
      <section id="reviews" className="section overflow-hidden ">
        <h2 className="headline-2 ">What my colleagues say</h2>
        <p className="text-zinc-400 mt-3 mb-8 max-w-[50ch] ">
          Hear directly from those who've collaborated with me
        </p>
        <div className="flex items-center justify-center py-10">
          <div className="loader mb-4"><span></span></div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="reviews" className="section overflow-hidden ">
        <h2 className="headline-2 ">What my colleagues say</h2>
        <p className="text-zinc-400 mt-3 mb-8 max-w-[50ch] ">
          Hear directly from those who've collaborated with me
        </p>
        <p className="text-red-400">Failed to load reviews.</p>
      </section>
    );
  }

  return (
    <section id="reviews" className="section overflow-hidden ">
        <h2 className="headline-2 ">What my colleagues say</h2>
        <p className="text-zinc-400 mt-3 mb-8 max-w-[50ch] ">
          Hear directly from those who've collaborated with me
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
    </section>
  );
};

export default Review;
