// Components
import { Fragment, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import PropTypes from "prop-types";
import { Bot, Download, Subtitles } from "lucide-react";
import { Button } from "./Button";
import Logo from "./ui/Logo";

const MARKER_RED = "rgb(255 77 77)";

const AUTO_PLAY_DELAY = 1000;

const SUBTITLE_TEXT =
  "Hello, I’m Elayabarathi. Welcome to my portfolio—feel free to explore and share your feedback.";

const SUBTITLE_WORDS = SUBTITLE_TEXT.split(" ");

const CornerMarks = () => (
  <>
    <span className="absolute -top-2 -left-2 w-6 h-6 border-l-2 border-t-2 border-ink rounded-wobbly-sm" />
    <span className="absolute -top-2 -right-2 w-6 h-6 border-r-2 border-t-2 border-ink rounded-wobbly-sm" />
    <span className="absolute -bottom-2 -left-2 w-6 h-6 border-l-2 border-b-2 border-ink rounded-wobbly-sm" />
    <span className="absolute -bottom-2 -right-2 w-6 h-6 border-r-2 border-b-2 border-ink rounded-wobbly-sm" />
  </>
);

const ScribbleArrow = () => (
  <svg
    className="hidden lg:block absolute -top-12 -left-20 w-32 h-16 -rotate-6"
    viewBox="0 0 128 64"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M6 10 C 44 2, 92 12, 100 40"
      stroke="rgb(45 45 45)"
      strokeWidth="2.5"
      strokeDasharray="8 8"
      strokeLinecap="round"
    />
    <path
      d="M88 34 L102 48 L94 26"
      stroke="rgb(45 93 161)"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/* Speaker with three marker-red waves when audio is on, a cross when muted. */
const SpeakerGlyph = ({ soundOn }) => (
  <svg
    viewBox="0 0 24 24"
    className="w-[22px] h-[22px]"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M11 5 6 9H2v6h4l5 5V5Z" fill="currentColor" stroke="none" />

    {soundOn ? (
      <g stroke={MARKER_RED}>
        <path d="M14 9.5a2.5 2.5 0 0 1 0 5" />
        <path d="M17.5 8a4.5 4.5 0 0 1 0 8" />
        <path d="M20.5 6.5a6.5 6.5 0 0 1 0 11" />
      </g>
    ) : (
      <g stroke="currentColor">
        <path d="M16 9.5 21 14.5" />
        <path d="M21 9.5 16 14.5" />
      </g>
    )}
  </svg>
);

SpeakerGlyph.propTypes = {
  soundOn: PropTypes.bool,
};

const Home = () => {
  const videoRef = useRef(null);
  const [soundOn, setSoundOn] = useState(false);
  const [subsOn, setSubsOn] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [revealed, setRevealed] = useState(0);

  /* Autoplay exactly once a beat after the section settles, so the paused
     first frame is what a visitor reads first. */
  useEffect(() => {
    const timer = setTimeout(() => {
      videoRef.current?.play().catch(() => {});
    }, AUTO_PLAY_DELAY);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (videoRef.current) videoRef.current.muted = !soundOn;
  }, [soundOn]);

  /* Drive the caption off playback progress rather than a fixed timer, so the
     words stay locked to the audio even if playback stalls or is replayed.
     rAF over `timeupdate` because timeupdate only fires about four times a
     second and the reveal is finer than that. */
  useEffect(() => {
    if (!playing) return undefined;

    let frame;
    const sync = () => {
      const video = videoRef.current;

      if (video && video.duration) {
        const step = Math.ceil((video.currentTime / video.duration) * SUBTITLE_WORDS.length);
        const next = Math.min(SUBTITLE_WORDS.length, Math.max(0, step));

        setRevealed((prev) => (prev === next ? prev : next));
      }

      frame = requestAnimationFrame(sync);
    };

    frame = requestAnimationFrame(sync);
    return () => cancelAnimationFrame(frame);
  }, [playing]);

  /* Land on the first frame again instead of freezing on the last one. */
  const handleEnded = () => {
    const video = videoRef.current;

    if (video) video.currentTime = 0;

    setRevealed(0);
    setPlaying(false);
  };

  const handleReplay = () => {
    const video = videoRef.current;
    if (!video) return;

    setRevealed(0);
    video.currentTime = 0;
    video.play().catch(() => {});
  };

  const handleReplayKey = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleReplay();
    }
  };

  /* Paused means the clip is not talking, so the caption rests on the full
     sentence rather than on an empty card. */
  const visibleWords = playing ? revealed : SUBTITLE_WORDS.length;

  return (
    <section className="pt-28 lg:pt-36 mb-20" id="home" aria-labelledby="home-heading">
      <div className="lg:grid lg:grid-cols-[3fr_4fr] items-center lg:gap-10">
        <div>
          <div className="flex items-center gap-3">
            <Logo className="shrink-0" />

            <div className="flex items-center gap-2 text-ink-soft text-lg">
              <span className="relative w-3 h-3 rounded-wobbly-sm bg-marker border border-ink">
                <span className="absolute inset-0 rounded-wobbly-sm bg-marker animate-ping"></span>
              </span>
              Available for work
            </div>
          </div>

          <div className="animated-text mt-6">
            <span className="headline-transition"></span>

            <h2
              id="home-heading"
              className="headline-1 max-w-[15ch] sm:max-w-[20ch] lg:max-w-[14ch] mt-6 mb-10"
            >
              Creating Modern User Focused Interfaces
            </h2>
          </div>

          <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center">
            <ScribbleArrow />

            <Button icon={Download} href="/resume.pdf" target="_blank">
              Download Resume
            </Button>

            <Button variant="outline" href="/about" icon={Bot}>
              Chat with AI
            </Button>
          </div>
        </div>

        <div className="hidden lg:flex justify-center w-full">
          <div className="relative w-full max-w-[520px]">
            <div className="relative bg-paper-card border-2 border-ink rounded-wobbly-lg shadow-hard-lg p-4 rotate-1">
              <CornerMarks />

              <div className="h-[440px] w-full flex items-center justify-center overflow-hidden rounded-wobbly-sm">
                <video
                  ref={videoRef}
                  className="h-full w-full object-contain cursor-pointer"
                  src="/landing_video.mp4"
                  muted={!soundOn}
                  playsInline
                  preload="auto"
                  disablePictureInPicture
                  tabIndex={0}
                  onClick={handleReplay}
                  onKeyDown={handleReplayKey}
                  onPlay={() => setPlaying(true)}
                  onPause={() => setPlaying(false)}
                  onEnded={handleEnded}
                  aria-label="Portfolio intro video. Activate to replay."
                />
              </div>
            </div>

            <AnimatePresence initial={false}>
              {subsOn && (
                <motion.div
                  key="landing-subtitles"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="mt-5 px-4 py-3 bg-paper-deep border-2 border-ink rounded-wobbly-sm shadow-hard-sm"
                >
                  <p className="sr-only">{SUBTITLE_TEXT}</p>

                  <p
                    className="font-hand text-lg leading-snug text-ink"
                    aria-hidden="true"
                  >
                    {SUBTITLE_WORDS.map((word, index) => (
                      <Fragment key={`${word}-${index}`}>
                        <span
                          className="inline-block transition-[opacity,transform] duration-200 ease-out"
                          style={{
                            opacity: index < visibleWords ? 1 : 0,
                            transform:
                              index < visibleWords ? "translateY(0)" : "translateY(6px)",
                          }}
                        >
                          {word}
                        </span>{" "}
                      </Fragment>
                    ))}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="absolute -left-[52px] top-1/2 -translate-y-1/2 z-10 flex flex-col items-center gap-3">
              <button
                type="button"
                className="icon-btn"
                onClick={() => setSoundOn((on) => !on)}
                aria-pressed={soundOn}
                aria-label={soundOn ? "Mute video" : "Unmute video"}
              >
                <span
                  className={`media-toggle-icon grid place-items-center ${
                    soundOn ? "media-toggle-on" : "media-toggle-off"
                  }`}
                >
                  <SpeakerGlyph soundOn={soundOn} />
                </span>
              </button>

              <button
                type="button"
                className="icon-btn"
                onClick={() => setSubsOn((on) => !on)}
                aria-pressed={subsOn}
                aria-label={subsOn ? "Hide subtitles" : "Show subtitles"}
              >
                <span
                  className={`media-toggle-icon grid place-items-center ${
                    subsOn ? "media-toggle-on" : "media-toggle-off"
                  }`}
                >
                  <Subtitles className="w-[22px] h-[22px]" aria-hidden="true" />
                </span>
              </button>
            </div>

            <span className="hidden md:block absolute -top-6 -right-8 w-12 h-12 rounded-wobbly bg-postit border-2 border-ink shadow-hard-sm animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;