import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import SectionWrapper from "./SectionWrapper";
import weddingConfig, { type GalleryImage } from "../config/wedding";

interface LightboxProps {
  image: GalleryImage | null;
  onClose: () => void;
}

const Lightbox = ({ image, onClose }: LightboxProps) => {
  return (
    <AnimatePresence>
      {image && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-charcoal/90 p-4 backdrop-blur-sm"
        >
          <motion.button
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full border border-ivory/30 text-ivory transition-colors hover:border-gold hover:text-gold sm:right-6 sm:top-6"
            aria-label="Close lightbox"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </motion.button>

          {/* ✅ Use a fade-only animation (no scale) — lighter on mobile */}
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            src={image.src}
            alt={image.alt}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[85vh] max-w-full rounded-sm object-contain"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/* ── Individual gallery item with blur-up loading ── */
interface GalleryItemProps {
  image: GalleryImage;
  index: number;
  onClick: () => void;
}

const GalleryItem = ({ image, index, onClick }: GalleryItemProps) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.7,
        // ✅ Cap the stagger delay so late images don't wait too long
        delay: Math.min(index * 0.08, 0.4),
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group mb-4 block w-full overflow-hidden rounded-sm"
    >
      <div className="relative overflow-hidden bg-cream">
        {/* ✅ Blur-up placeholder — shows while image loads */}
        {!loaded && (
          <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-cream to-gold/10" />
        )}

        {/* ✅ Use aspect ratio classes so layout doesn't jump */}
        <img
          src={image.src}
          alt={image.alt}
          width={800}
          height={1000}
          // ✅ Eager load the first 3 (above the fold), lazy load the rest
          loading={index < 3 ? "eager" : "lazy"}
          // ✅ Tell the browser how to prioritize
          fetchPriority={index < 3 ? "high" : "auto"}
          // ✅ Decode off the main thread for smoother scrolling
          decoding="async"
          onLoad={() => setLoaded(true)}
          className={`w-full object-cover transition-all duration-700 ease-out group-hover:scale-105 ${
            loaded ? "opacity-100 blur-0" : "opacity-0 blur-md"
          }`}
        />

        <div className="absolute inset-0 bg-charcoal/0 transition-colors duration-500 group-hover:bg-charcoal/20" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <div className="flex h-14 w-14 items-center justify-center rounded-full border border-ivory/70 backdrop-blur-sm">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="1.5"
            >
              <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
            </svg>
          </div>
        </div>
      </div>
    </motion.button>
  );
};

const Gallery = () => {
  const [selected, setSelected] = useState<GalleryImage | null>(null);

  return (
    <SectionWrapper id="gallery" className="bg-ivory">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center"
        >
          <p className="mb-4 text-xs uppercase tracking-[0.4em] text-gold">
            Moments
          </p>
          <h2 className="font-serif text-5xl font-light text-charcoal md:text-6xl">
            Our Gallery
          </h2>
        </motion.div>

        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
          {weddingConfig.gallery.map((image, index) => (
            <GalleryItem
              key={image.src}
              image={image}
              index={index}
              onClick={() => setSelected(image)}
            />
          ))}
        </div>
      </div>

      <Lightbox image={selected} onClose={() => setSelected(null)} />
    </SectionWrapper>
  );
};

export default Gallery;
