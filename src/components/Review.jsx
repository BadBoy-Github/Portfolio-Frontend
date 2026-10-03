import { useState, useEffect } from "react";
import ReviewCard from "./ReviewCard";
import ReviewModal from "./ReviewModal";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Review = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

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
      <section id="reviews" className="section overflow-hidden">
        <div className="section-label mb-6">
          <span className="dot"></span>
          <span>TESTIMONIALS</span>
        </div>
        <h2 className="headline-2 text-foreground mb-4">
          What my <span className="gold-text">colleagues</span> say
        </h2>
          <p className="body-text mt-3 mb-8 max-w-[50ch]">
          Hear directly from those who&apos;ve collaborated with me
        </p>
        <div className="flex items-center justify-center py-10">
          <div className="loader mb-4"><span></span></div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="reviews" className="section overflow-hidden">
        <div className="section-label mb-6">
          <span className="dot"></span>
          <span>TESTIMONIALS</span>
        </div>
        <h2 className="headline-2 text-foreground mb-4">
          What my <span className="gold-text">colleagues</span> say
        </h2>
        <p className="body-text mt-3 mb-8 max-w-[50ch]">
          Hear directly from those who&apos;ve collaborated with me
        </p>
        <p className="text-error">Failed to load reviews.</p>
      </section>
    );
  }

  return (
    <section id="reviews" className="section overflow-hidden">
      <div className="section-label mb-6">
        <span className="dot"></span>
        <span>TESTIMONIALS</span>
      </div>
      <h2 className="headline-2 text-foreground mb-4">
        What my <span className="gold-text">colleagues</span> say
      </h2>
        <p className="body-text mt-3 mb-8 max-w-[50ch]">
          Hear directly from those who&apos;ve collaborated with me
        </p>

      <div className="grid grid-cols-1 md:grid-cols-2 items-stretch w-full gap-4 lg:gap-6 pb-10">
        {reviews.map(({ content, name, imgSrc, company, rating }, key) => (
          <ReviewCard
            key={key}
            name={name}
            imgSrc={imgSrc}
            company={company}
            content={content}
            rating={rating ?? 5}
          />
        ))}
      </div>

      {reviewOpen && (
        <ReviewModal
          isOpen={reviewOpen}
          onClose={() => setReviewOpen(false)}
          onSuccess={() =>
            showToast("Your review sent successfully", "success")
          }
        />
      )}

      <div className="">
        <div className="flex items-start gap-4">
          <div className="flex-1">
            <p className="body-text text-sm text-muted-foreground mb-4">
              <span className="text-foreground">Want to write a review?</span> I would love to hear about
              your experience working with me. It only takes a minute and helps
              others learn more about me.{" "}
              <span onClick={() => setReviewOpen(true)} className="text-accent-secondary cursor-pointer font-medium">
                Click here to write a review.
              </span>
            </p>
          </div>
        </div>
      </div>

      {toast && (
        <div className="fixed bottom-4 right-4 z-50">
          <div
            className={`toast-${toast.type === "success" ? "success" : "error"}`}
          >
            {toast.type === "success" ? "✓ " : "✗ "}
            {toast.message}
          </div>
        </div>
      )}
    </section>
  );
};

export default Review;
