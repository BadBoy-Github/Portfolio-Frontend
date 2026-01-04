import CountUp from "./CountUp";
import { skillItem } from "./data/SkillData";

import { useState, useEffect } from "react";

const GITHUB_USERNAME = "BadBoy-Github";
const REPOS_API_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos`;
const PER_PAGE = 100;

const Welcome = () => {
  const [stats, setStats] = useState({
    repositories: 0,
    liveProjects: 0,
    technologies: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGitHubStats = async () => {
      try {
        setLoading(true);
        const allRepos = [];
        let page = 1;
        let hasMorePages = true;

        // Fetch all pages of repositories
        while (hasMorePages) {
          const response = await fetch(
            `${REPOS_API_URL}?per_page=${PER_PAGE}&page=${page}`
          );

          if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status}`);
          }

          const reposPage = await response.json();
          allRepos.push(...reposPage);

          // Stop if we got fewer items than requested (last page)
          hasMorePages = reposPage.length === PER_PAGE;
          page++;
        }

        // Count live projects (repos with a homepage URL)
        const liveProjectsCount = allRepos.filter(
          (repo) => repo.homepage && repo.homepage.trim() !== ""
        ).length;

        setStats({
          repositories: allRepos.length,
          liveProjects: liveProjectsCount,
          technologies: skillItem.length - 1,
        });
      } catch (err) {
        console.error("Failed to fetch GitHub data:", err);
        setError("*Could not load GitHub stats");
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubStats();
  }, []);

  const aboutItems = [
    {
      label: "Technologies",
      number: stats.technologies,
    },
    {
      label: "Live Projects",
      number: stats.liveProjects,
    },
    {
      label: "Repositories",
      number: stats.repositories,
    },
  ];

  return (
    <section className="section">
      <div className="container">
        <div className="bg-zinc-800/50 p-7 rounded-2xl md:p-12 shadow-xl">
          <p className="text-zinc-300 mb-4 md:mb-8 md:text-xl bd:max-w-[60ch]">
            Welcome! I&apos;m Elayabarathi M V, a passionate frontend
            developer dedicated to building responsive, user-friendly websites.
            I specialize in translating ideas into clean, high-performance
            interfaces. A collaborative problem-solver and continuous learner, I
            combine creativity and logic to deliver impactful digital solutions
            that meet modern web standards and prioritize the user experience.
          </p>

          {error && <div className="mb-4 text-sky-700 text-sm">{error}</div>}

          <div className="flex flex-wrap items-center gap-5 md:gap-8">
            {aboutItems.map(({ label, number }, key) => (
              <div key={key}>
                <div className="flex items-center md:mb-2">
                  <span className="text-2xl font-semibold md:text-4xl">
                    {loading ? (
                      <span className="inline-block w-12 h-8 bg-zinc-700/50 rounded animate-pulse"></span>
                    ) : (
                      <CountUp
                        from={0}
                        to={number}
                        separator=","
                        direction="up"
                        duration={0.1}
                        className="count-up-text"
                      />
                    )}
                  </span>
                  <span className="text-sky-400 font-semibold md:text-3xl">
                    +
                  </span>
                </div>

                <p className="text-sm text-zinc-400">{label}</p>
              </div>
            ))}

            <img
              src="/img/icons/favicon.svg"
              alt="Elayabarathi M V"
              width={30}
              height={30}
              className="ml-auto md:w-[40px] md:h-[40px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Welcome;
