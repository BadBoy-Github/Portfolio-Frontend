import { useState } from "react";
import { Link } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { Helmet } from "react-helmet-async";
import AchievementsCard from "../components/AchievementsCard";
import { achievements } from "../data/AchievementData";

const AchievementsLibrary = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Get unique tags for filtering
  const allTags = achievements.flatMap((a) => a.tags);
  const uniqueTags = [...new Set(allTags)];
  const [selectedTag, setSelectedTag] = useState("");

  // Filter achievements
  const filteredAchievements = achievements.filter((achi) => {
    const searchMatch =
      searchQuery === "" ||
      achi.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      achi.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      achi.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase()),
      );

    const tagMatch = selectedTag === "" || achi.tags.includes(selectedTag);

    return searchMatch && tagMatch;
  });

  // Handle search
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  // Clear search
  const clearSearch = () => {
    setSearchQuery("");
    document.getElementById("achievement_search").value = "";
  };

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
          content="https://elayaResume.vercel.app/achievements"
        />
        <link
          rel="canonical"
          href="https://elayaResume.vercel.app/achievements"
        />
      </Helmet>
      <div className="min-h-screen bg-zinc-900 pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">
              All Achievements
            </h1>
            <p className="text-zinc-400">My accomplishments and milestones</p>
          </div>

          {/* Search and Filter */}
          <div className="mb-10 bg-zinc-800 ring-1 ring-inset ring-zinc-50/5 px-4 py-4 rounded-xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div className="flex items-center gap-2 flex-wrap">
              <button
                className={`px-3 py-2 rounded-lg text-sm ${
                  selectedTag === ""
                    ? "bg-sky-600 text-zinc-800"
                    : "text-zinc-400 bg-zinc-50/5"
                } hover:bg-sky-600 active:bg-sky-800 hover:text-zinc-800 transition-all duration-300`}
                onClick={() => setSelectedTag("")}
              >
                All
              </button>
              {uniqueTags.slice(0, 10).map((tag, index) => (
                <button
                  key={index}
                  className={`px-3 py-2 rounded-lg text-sm ${
                    selectedTag === tag
                      ? "bg-sky-600 text-zinc-800"
                      : "text-zinc-400 bg-zinc-50/5"
                  } hover:bg-sky-600 active:bg-sky-800 hover:text-zinc-800 transition-all duration-300`}
                  onClick={() => setSelectedTag(tag)}
                >
                  {tag.replace("#", "")}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 w-full lg:w-auto">
              <div className="text-xs text-zinc-400 mr-3">
                #{filteredAchievements.length} achievements
              </div>

              <input
                type="text"
                id="achievement_search"
                placeholder="Search achievements..."
                className="bg-zinc-800 w-full lg:w-60 text-sky-100 outline-none outline-zinc-500 hover:outline-sky-700 active:outline-sky-700 rounded-lg px-2 py-1 transition-all duration-500"
                onChange={(e) => handleSearch(e.target.value)}
                value={searchQuery}
              />

              {searchQuery && (
                <div
                  className="text-zinc-800 mr-1 bg-sky-600 rounded-lg p-2 ml-2 cursor-pointer hover:bg-red-600 transition-all duration-500 group/close"
                  onClick={clearSearch}
                >
                  <IoClose className="size-5 group-hover/close:rotate-90 transition-all duration-500" />
                </div>
              )}
            </div>
          </div>

          {/* Achievements Grid */}
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filteredAchievements.map((achi, index) => (
              <Link key={index} to={`/achievement/${achi.id}`}>
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
                <h3 className="text-xl font-semibold text-zinc-300 mt-2">
                  No achievements found
                </h3>
                <p className="text-zinc-500 mt-2">
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
