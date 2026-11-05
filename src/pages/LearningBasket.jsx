import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { ShoppingBasket } from "lucide-react";
import SectionHeading from "../components/ui/SectionHeading";
import FallingCards from "../components/FallingCards";
import useCollection from "../hooks/useCollection";

const LearningBasket = () => {
  const { items, loading, error, reload } = useCollection(
    "/api/learning-basket",
  );
  const [dismissedCompletedIds, setDismissedCompletedIds] = useState(
    () => new Set(),
  );
  const completedIds = useMemo(
    () =>
      items
        .filter((item) => item.status === "completed")
        .map((item) => item._id),
    [items],
  );

  useEffect(() => {
    if (!completedIds.length) return undefined;
    const timer = window.setTimeout(() => {
      setDismissedCompletedIds(
        (current) => new Set([...current, ...completedIds]),
      );
    }, 1750);
    return () => window.clearTimeout(timer);
  }, [completedIds]);

  const cardItems = useMemo(
    () =>
      items.filter(
        (item) =>
          item.status !== "completed" ||
          !dismissedCompletedIds.has(item._id),
      ),
    [dismissedCompletedIds, items],
  );

  return (
    <>
      <Helmet>
        <title>Learning Basket | Elayabarathi M V</title>
        <meta
          name="description"
          content="A playful basket of learning notes and ideas."
        />
      </Helmet>
      <section className="min-h-screen bg-paper pt-28 pb-20">
        <div className="container">
          <SectionHeading
            title="Learning Basket"
            lead="A little collection of ideas worth holding on to."
          />
          {loading ? (
            <div
              className="grid min-h-[28rem] place-items-center rounded-wobbly-lg border-2 border-ink bg-paper-card shadow-hard"
              role="status"
            >
              <span className="loader" />
              <span className="sr-only">Loading learning cards</span>
            </div>
          ) : error ? (
            <div
              className="grid min-h-[28rem] place-items-center rounded-wobbly-lg border-2 border-ink bg-paper-card p-8 text-center shadow-hard"
              role="alert"
            >
              <div>
                <p className="font-display text-xl font-bold text-marker">
                  Could not load the learning basket.
                </p>
                <p className="mt-2 font-hand text-lg text-ink-soft">{error}</p>
                <button
                  type="button"
                  className="btn btn-outline mt-5"
                  onClick={reload}
                >
                  Try again
                </button>
              </div>
            </div>
          ) : cardItems.length ? (
            <FallingCards items={cardItems} />
          ) : (
            <div className="grid min-h-[28rem] place-items-center rounded-wobbly-lg border-2 border-ink bg-paper-card p-8 text-center shadow-hard">
              <div className="max-w-md">
                <ShoppingBasket
                  className="mx-auto mb-4 text-ballpoint"
                  size={48}
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
                <p className="font-display text-2xl font-bold text-ink">
                  The basket is ready.
                </p>
                <p className="mt-3 font-hand text-lg text-ink-soft">
                  Learning cards will appear here once they are added.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default LearningBasket;
