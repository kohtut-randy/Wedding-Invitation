import { motion, useInView } from "framer-motion";
import { useMemo, useRef, useState } from "react";
import SectionWrapper from "./SectionWrapper";
import weddingConfig from "../config/wedding";

const VideoSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  const isInView = useInView(containerRef, {
    amount: 0.4,
    once: false,
  });

  const videoConfig = weddingConfig.video;
  const { title, subtitle, description, embedUrl } = videoConfig ?? {};

  // ✅ Build the URL ONCE per load state — prevents reloading the iframe on every scroll
  const iframeSrc = useMemo(() => {
    if (!embedUrl) return "";
    const url = new URL(embedUrl);
    url.searchParams.set("autoplay", "1");
    url.searchParams.set("muted", "1");
    return url.toString();
  }, [embedUrl]);

  // ✅ When the section is 40% in view, mark it for loading
  if (isInView && !shouldLoad) {
    setShouldLoad(true);
  }

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
          className="group relative overflow-hidden rounded-sm border border-gold/20 bg-charcoal shadow-2xl"
        >
          <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
            {/* ✅ Placeholder / poster shown until iframe loads */}
            <div
              className={`absolute inset-0 flex items-center justify-center bg-gradient-to-br from-charcoal via-charcoal/95 to-charcoal/90 transition-opacity duration-500 ${
                shouldLoad ? "opacity-0 pointer-events-none" : "opacity-100"
              }`}
            >
              {/* Elegant monogram spinner */}
              <div className="flex flex-col items-center gap-4 text-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="h-12 w-12 rounded-full border-2 border-gold/30 border-t-gold"
                />
                <p className="font-serif text-lg italic text-gold/80">
                  Loading our story…
                </p>
              </div>
            </div>

            {/* ✅ Iframe loads only when scrolled into view */}
            {shouldLoad && (
              <iframe
                src={iframeSrc}
                title={title ?? "Wedding video"}
                allow="fullscreen; autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
                loading="lazy"
                className="absolute left-0 top-0 h-full w-full border-0"
              />
            )}
          </div>

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
