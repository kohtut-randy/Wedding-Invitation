import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import SectionWrapper from "./SectionWrapper";
import weddingConfig, { type StoryEvent } from "../config/wedding";

/* ─────────────── Single Story Chapter ─────────────── */
interface StoryChapterProps {
  event: StoryEvent;
  index: number;
}

const StoryChapter = ({ event, index }: StoryChapterProps) => {
  const chapterRef = useRef<HTMLDivElement>(null);
  const isReversed = index % 2 === 1;

  // Parallax scroll on the image
  const { scrollYProgress } = useScroll({
    target: chapterRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <div
      ref={chapterRef}
      className={`relative flex flex-col items-center gap-10 md:gap-16 ${
        isReversed ? "md:flex-row-reverse" : "md:flex-row"
      }`}
    >
      {/* Chapter number watermark */}
      <motion.span
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 0.06, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
        className={`pointer-events-none absolute -top-10 font-serif text-[180px] font-light leading-none text-gold md:text-[260px] ${
          isReversed ? "right-0" : "left-0"
        }`}
      >
        {String(index + 1).padStart(2, "0")}
      </motion.span>

      {/* Image with parallax */}
      <motion.div
        initial={{ opacity: 0, x: isReversed ? 50 : -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full md:w-1/2"
      >
        <div className="group relative overflow-hidden rounded-sm shadow-xl">
          <motion.img
            src={event.image}
            alt={event.title}
            style={{ y }}
            className="aspect-[2/3] w-full h-[300px] scale-100 object-contain transition-transform duration-[1.5s] group-hover:scale-[1.15]"
          />
          {/* Soft gradient */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/40 via-transparent to-transparent" />

          {/* Location chip */}
          {event.location && (
            <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full border border-ivory/30 bg-charcoal/40 px-4 py-1.5 backdrop-blur-md">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#d9c08a"
                strokeWidth="1.5"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span className="text-[10px] uppercase tracking-[0.2em] text-ivory/90">
                {event.location}
              </span>
            </div>
          )}
        </div>
      </motion.div>

      {/* Text content */}
      <motion.div
        initial={{ opacity: 0, x: isReversed ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{
          duration: 1,
          delay: 0.15,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative w-full md:w-1/2 md:px-4"
      >
        {/* Date with flanking rule */}
        <div className="mb-6 flex items-center gap-4">
          <span className="h-px w-10 bg-gold" />
          <span className="text-md text-bold-lg uppercase tracking-[0.4em] text-gold">
            {event.date}
          </span>
        </div>

        <h3 className="mb-6 font-serif text-4xl font-light leading-tight text-charcoal md:text-5xl">
          {event.title}
        </h3>

        <p className="mb-8 text-base leading-relaxed text-charcoal/70 md:text-lg">
          {event.description}
        </p>

        {/* Pull-quote */}
        {event.quote && (
          <div className="border-l-2 border-gold/50 pl-5">
            <p className="font-serif text-xl italic text-charcoal/80 md:text-2xl">
              "{event.quote}"
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

/* ─────────────── Our Story Section ─────────────── */
const OurStory = () => {
  const { story } = weddingConfig;

  return (
    <SectionWrapper id="story" className="overflow-hidden bg-cream">
      <div className="mx-auto max-w-6xl">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-24 text-center"
        >
          <p className="mb-4 text-xs uppercase tracking-[0.4em] text-gold">
            How It All Began
          </p>
          <h2 className="mb-6 font-serif text-5xl font-light text-charcoal md:text-6xl">
            Our Story
          </h2>

          {/* Ornamental divider */}
          <div className="mx-auto flex items-center justify-center gap-3">
            <span className="h-px w-16 bg-gold/40" />
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2C8 6 8 10 12 14C16 10 16 6 12 2Z"
                fill="#c9a961"
                opacity="0.7"
              />
            </svg>
            <span className="h-px w-16 bg-gold/40" />
          </div>

          <p className="mx-auto mt-8 max-w-2xl leading-relaxed text-charcoal/70">
            Every love story is beautiful, but this one is ours. Moments that
            shaped the journey we're on today...
          </p>
        </motion.div>

        {/* Chapters */}
        <div className="space-y-32 md:space-y-40">
          {story.map((event, index) => (
            <StoryChapter key={event.title} event={event} index={index} />
          ))}
        </div>

        {/* Closing signature */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-32 text-center"
        >
          <div className="mx-auto mb-6 h-px w-24 bg-gold/50" />
          <p className="font-serif text-2xl italic text-charcoal/70">
            ...and the best chapters are still to come.
          </p>
        </motion.div>
      </div>
    </SectionWrapper>
  );
};

export default OurStory;
