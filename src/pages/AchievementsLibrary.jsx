import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import AchievementsCard from "../components/AchievementsCard";
import FilterBar from "../components/ui/FilterBar";
import SectionHeading from "../components/ui/SectionHeading";

const sTags = ["Leadership", "Collaboration"];

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const AchievementsLibrary = () => {
  const [selectedTag, setSelectedTag] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${BACKEND_URL}/api/achievements`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setAchievements(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAchievements();
  }, []);

  const filteredAchievements = achievements.filter((achi) => {
    const tagMatch =
      selectedTag === "all" ||
      achi.title.toLowerCase().includes(selectedTag.toLowerCase()) ||
      achi.subtitle.toLowerCase().includes(selectedTag.toLowerCase()) ||
      (achi.tags || []).some(
        (tag) => tag.toLowerCase() === selectedTag.toLowerCase(),
      );

    const searchMatch =
      searchQuery === "" ||
      achi.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      achi.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (achi.tags || []).some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase()),
      );

    return tagMatch && searchMatch;
  });

  const handleTagSelect = (tag) => {
    setSelectedTag(tag);
    setSearchQuery("");
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setSelectedTag("all");
  };

  const clearSearch = () => {
    setSearchQuery("");
    const input = document.getElementById("achievement_search");
    if (input) input.value = "";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-paper pt-24 pb-16 flex items-center justify-center">
        <div className="loader mb-4"><span></span></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-paper pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-accent-red mb-2">Failed to load achievements</h2>
          <p className="text-ink-soft">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>
          Achievements & Milestones | Full Stack Developer Portfolio
        </title>
        <meta
          name="description"
          content="Explore my professional achievements, awards, and milestones. View hackathon wins, publications, and recognition in tech."
        />
        <meta
          name="keywords"
          content="achievements, awards, hackathon wins, publications, tech milestones, professional accomplishments"
        />
        <meta
          property="og:title"
          content="Achievements & Milestones | Full Stack Developer Portfolio"
        />
        <meta
          property="og:description"
          content="Explore my professional achievements, awards, and milestones."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://elayabarathimv.vercel.app/achievements"
        />
        <link
          rel="canonical"
          href="https://elayabarathimv.vercel.app/achievements"
        />
      </Helmet>
      <div className="min-h-screen bg-paper pt-24 pb-16">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="All Achievements"
            lead="My accomplishments and milestones"
          />

          <FilterBar
            tags={sTags}
            selectedTag={selectedTag}
            onTagSelect={handleTagSelect}
            searchQuery={searchQuery}
            onSearchChange={handleSearch}
            onSearchClear={clearSearch}
            countLabel={`${filteredAchievements.length} achievements`}
            searchPlaceholder="Search achievements..."
            searchId="achievement_search"
          />

          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filteredAchievements.map((achi) => (
              <Link key={achi.id} to={`/achievement/${achi.id}`}>
                <AchievementsCard
                  achiId={achi.id}
                  title={achi.title}
                  imgSrc={achi.imgSrc}
                  desc={achi.subtitle}
                  tags={achi.tags}
                  date={achi.date}
                />
              </Link>
            ))}

            {filteredAchievements.length === 0 && (
              <div className="col-span-full text-center py-10 flex flex-col justify-center items-center">
                <div className="loader mb-4">
                  <span></span>
                </div>
                <h3 className="text-xl font-semibold text-ink mt-2">
                  No achievements found
                </h3>
                <p className="text-ink-soft mt-2">
                  Try a different search term or filter
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AchievementsLibrary;
