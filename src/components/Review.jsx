// Node modules
import { useEffect, useState } from "react";
import { PenLine } from "lucide-react";

// Components
import ReviewCard from "./ReviewCard";
import ReviewModal from "./ReviewModal";
import SectionHeading from "./ui/SectionHeading";
import SectionState from "./ui/SectionState";
import useCollection from "../hooks/useCollection";

const TOAST_TIMEOUT = 4000;

const Review = () => {
  const { items, loading, error, reload } = useCollection("/api/reviews");
  const [reviewOpen, setReviewOpen] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (!toast) return undefined;

    const timeoutId = setTimeout(() => setToast(null), TOAST_TIMEOUT);
    return () => clearTimeout(timeoutId);
  }, [toast]);

  return (
    <section id="reviews" className="section">
      <SectionHeading
        title="What my colleagues say"
        lead="Hear directly from those who've collaborated with me"
      />

      <SectionState loading={loading} error={error} label="reviews" onRetry={reload}>
        <div className="grid grid-cols-1 md:grid-cols-2 items-stretch w-full gap-6 lg:gap-8 pb-12">
          {items.map(({ content, name, imgSrc, company, rating }) => (
            <ReviewCard
              key={name}
              name={name}
              imgSrc={imgSrc}
              company={company}
              content={content}
              rating={rating ?? 5}
            />
          ))}
        </div>

        <div className="flex items-start gap-4">
          <div className="flex-1">
            <p className="text-ink-soft text-lg md:text-xl max-w-[60ch]">
              <span className="text-ink font-bold">Want to write a review?</span>{" "}
              I would love to hear about your experience working with me. It only
              takes a minute and helps others learn more about me.
            </p>

            <button
              type="button"
              onClick={() => setReviewOpen(true)}
              className="mt-4 inline-flex items-center gap-2 font-display text-xl text-ballpoint underline decoration-dashed decoration-2 underline-offset-4 transition-transform duration-100 hover:-rotate-1"
            >
              <PenLine size={20} strokeWidth={2.5} aria-hidden="true" />
              Click here to write a review.
            </button>
          </div>
        </div>
      </SectionState>

      {reviewOpen && (
        <ReviewModal
          isOpen={reviewOpen}
          onClose={() => setReviewOpen(false)}
          onSuccess={() =>
            setToast({ message: "Your review sent successfully", type: "success" })
          }
        />
      )}

      {toast && (
        <div className="fixed bottom-6 right-6 z-50">
          <div
            role="status"
            className={`px-5 py-3 border-2 border-ink rounded-wobbly-sm shadow-hard text-lg ${
              toast.type === "success" ? "bg-postit text-ink" : "bg-marker text-paper"
            }`}
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