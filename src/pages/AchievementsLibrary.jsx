import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { HiOutlineMenu } from "react-icons/hi";
import { Helmet } from "react-helmet-async";
import AchievementsCard from "../components/AchievementsCard";

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
    document.getElementById("achievement_search").value = "";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background pt-24 pb-16 flex items-center justify-center">
        <div className="loader mb-4"><span></span></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-error mb-2">Failed to load achievements</h2>
          <p className="text-muted-foreground">{error}</p>
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
      <div className="min-h-screen bg-background pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="headline-1">
              All <span className="gradient-text">Achievements</span>
            </h1>
            <p className="body-text text-muted-foreground">
              My accomplishments and milestones
            </p>
          </div>

          <div className="mb-10 card px-4 py-4 rounded-xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div className="flex items-center gap-2 flex-wrap">
              <button
                className={`p-2 rounded-lg text-sm ${
                  selectedTag === "all"
                    ? "bg-accent-secondary text-background"
                    : "bg-muted text-muted-foreground"
                } hover:bg-accent-secondary hover:text-background active:bg-accent-secondary/80 transition-all duration-300`}
                onClick={() => handleTagSelect("all")}
              >
                <HiOutlineMenu className="size-5" />
              </button>

              <div className="flex items-center gap-2 flex-wrap">
                {sTags.map((tag, index) => (
                  <button
                    key={index}
                    className={`px-3 py-2 rounded-lg text-sm font-mono ${
                      selectedTag === tag.toLowerCase()
                        ? "bg-accent-secondary text-background"
                        : "text-muted-foreground bg-muted"
                    } hover:bg-accent-secondary hover:text-background active:bg-accent-secondary/80 transition-all duration-300`}
                    onClick={() => handleTagSelect(tag.toLowerCase())}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 w-full lg:w-auto">
              <div className="text-xs text-muted-foreground mr-3">
                #{filteredAchievements.length} achievements
              </div>

              <input
                type="text"
                id="achievement_search"
                placeholder="Search achievements..."
                className="input-field w-full lg:w-60"
                onChange={(e) => handleSearch(e.target.value)}
                value={searchQuery}
              />

              {searchQuery && (
                <div
                  className="text-background mr-1 bg-error rounded-lg p-2 ml-2 cursor-pointer hover:bg-error/80 transition-all duration-500 group/close"
                  onClick={clearSearch}
                >
                  <IoClose className="size-5 group-hover/close:rotate-90 transition-all duration-500" />
                </div>
              )}
            </div>
          </div>

          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filteredAchievements.map((achi, index) => (
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
                <h3 className="text-xl font-semibold text-muted-foreground mt-2">
                  No achievements found
                </h3>
                <p className="text-muted-foreground/70 mt-2">
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
