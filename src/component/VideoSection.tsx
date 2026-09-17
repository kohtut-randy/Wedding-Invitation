import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import SectionWrapper from "./SectionWrapper";
import weddingConfig from "../config/wedding";

const VideoSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Detect when section is 60% in view
  const isInView = useInView(containerRef, {
    amount: 0.6,
    once: false,
  });

  const { title, subtitle, description, embedUrl, autoPlayOnScroll } =
    weddingConfig.video ?? {};

  // Build embed URL with autoplay only when in view
  const buildSrc = (): string => {
    if (!autoPlayOnScroll) return embedUrl as any;
    const url = new URL(embedUrl as any);
    if (isInView) {
      url.searchParams.set("autoplay", "1");
      url.searchParams.set("muted", "1");
    } else {
      url.searchParams.set("autoplay", "0");
    }
    return url.toString();
  };

  return (
    <SectionWrapper className="bg-cream h-full">
      <div className="mx-auto max-w-6xl">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <p className="mb-4 text-xs uppercase tracking-[0.4em] text-gold">
            {subtitle}
          </p>
          <h2 className="mb-4 font-serif text-5xl font-light text-charcoal md:text-6xl">
            {title}
          </h2>
          <p className="mx-auto max-w-2xl leading-relaxed text-charcoal/70">
            {description}
          </p>
        </motion.div>

        {/* Video Container */}
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="group relative overflow-hidden rounded-sm border border-gold/20 shadow-2xl"
        >
          {/* Responsive 16:9 iframe wrapper */}
          <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
            <iframe
              ref={iframeRef}
              src={buildSrc()}
              title={title}
              allow="fullscreen; autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
              loading="lazy"
              className="absolute left-0 top-0 h-full w-full border-0"
            />
          </div>

          {/* Soft gradient overlay for premium look */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/30 via-transparent to-transparent" />

          {/* Decorative corner accents */}
          <div className="pointer-events-none absolute left-4 top-4 h-8 w-8 border-l border-t border-gold/40" />
          <div className="pointer-events-none absolute right-4 top-4 h-8 w-8 border-r border-t border-gold/40" />
          <div className="pointer-events-none absolute bottom-4 left-4 h-8 w-8 border-b border-l border-gold/40" />
          <div className="pointer-events-none absolute bottom-4 right-4 h-8 w-8 border-b border-r border-gold/40" />
        </motion.div>
      </div>
    </SectionWrapper>
  );
};

export default VideoSection;
