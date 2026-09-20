import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import SectionWrapper from "./SectionWrapper";
import weddingConfig from "../config/wedding";

const RSVP = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const formUrl = weddingConfig.googleFormUrl;
  const hasForm = Boolean(formUrl);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    document.body.style.overflow = modalOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [modalOpen]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModalOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const modalContent = (
    <AnimatePresence>
      {modalOpen && hasForm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          onClick={() => setModalOpen(false)}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-3 bg-charcoal/60 p-3 backdrop-blur-md sm:p-6"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative flex h-[80dvh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-gold/20 sm:h-[85dvh]"
          >
            {/* Desktop-only floating close (inside the card) */}
            <button
              onClick={() => setModalOpen(false)}
              aria-label="Close RSVP form"
              className="absolute right-4 top-4 z-20 hidden h-10 w-10 items-center justify-center rounded-full bg-white/95 text-charcoal shadow-md backdrop-blur transition-all duration-300 hover:bg-gold hover:text-white sm:flex"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            <div className="relative h-full w-full overflow-hidden bg-white">
              <iframe
                src={formUrl}
                title="RSVP Form"
                className="absolute inset-0 h-full w-full border-0"
                loading="lazy"
                sandbox="allow-forms allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
              >
                Loading…
              </iframe>
            </div>
          </motion.div>

          {/* Mobile-only close button — placed BELOW the card, outside the iframe */}
          <button
            onClick={() => setModalOpen(false)}
            className="flex items-center gap-2 rounded-full bg-white/95 px-6 py-3 text-xs uppercase tracking-[0.25em] text-charcoal shadow-lg backdrop-blur transition-all duration-300 hover:bg-gold hover:text-white sm:hidden"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
            Close Form
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <SectionWrapper id="rsvp" className="overflow-hidden bg-cream">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <p className="mb-4 text-xs uppercase tracking-[0.4em] text-gold">
            Kindly Respond
          </p>
          <h2 className="font-serif text-5xl font-light text-charcoal md:text-6xl">
            Will You Join Us?
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative grid overflow-hidden rounded-sm border border-gold/20 bg-ivory shadow-xl md:grid-cols-5"
        >
          {/* LEFT panel */}
          <div className="relative flex flex-col justify-center gap-6 p-8 sm:p-10 md:col-span-3 md:p-14">
            <svg
              className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 text-gold/10 md:h-64 md:w-64"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M12 2C8 6 8 10 12 14C16 10 16 6 12 2Z"
                fill="currentColor"
              />
            </svg>

            <div className="relative">
              <p className="mb-3 text-[10px] uppercase tracking-[0.4em] text-gold">
                A Personal Note
              </p>
              <p className="font-serif text-2xl italic leading-relaxed text-charcoal/80 md:text-3xl">
                "Your presence would mean the world to us."
              </p>
            </div>

            <div className="relative h-px w-16 bg-gold/40" />

            <p className="relative max-w-md leading-relaxed text-charcoal/70">
              Please let us know if you'll be able to join our celebration.
              Kindly respond by{" "}
              <span className="font-medium text-gold">October 9, 2026</span> so
              we can finalize our arrangements.
            </p>

            {/* <div className="relative flex flex-wrap gap-3 pt-2">
              <div className="flex items-center gap-2 rounded-full border border-gold/30 bg-white/60 px-4 py-1.5">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#c9a961"
                  strokeWidth="1.5"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                <span className="text-[10px] uppercase tracking-[0.2em] text-charcoal/70">
                  By October 25, 2026
                </span>
              </div>
            </div> */}
          </div>

          {/* RIGHT panel */}
          <div className="relative flex flex-col justify-center gap-4 bg-charcoal p-8 text-center sm:p-10 md:col-span-2 md:p-12">
            <div className="pointer-events-none absolute left-4 top-4 h-6 w-6 border-l border-t border-gold/50" />
            <div className="pointer-events-none absolute right-4 top-4 h-6 w-6 border-r border-t border-gold/50" />
            <div className="pointer-events-none absolute bottom-4 left-4 h-6 w-6 border-b border-l border-gold/50" />
            <div className="pointer-events-none absolute bottom-4 right-4 h-6 w-6 border-b border-r border-gold/50" />

            <div className="mx-auto mb-2 flex h-14 w-14 items-center justify-center rounded-full border border-gold/40">
              <span className="font-serif text-xl text-gold">
                {weddingConfig.bride.name.charAt(0)}
                <span className="mx-0.5 italic">&</span>
                {weddingConfig.groom.name.charAt(0)}
              </span>
            </div>

            <p className="mb-2 font-serif text-2xl font-light text-ivory">
              RSVP
            </p>
            <p className="mb-6 text-xs uppercase tracking-[0.3em] text-ivory/50">
              Reserve Your Seat
            </p>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setModalOpen(true)}
              disabled={!hasForm}
              className="rounded-full bg-gold px-8 py-4 text-xs uppercase tracking-[0.25em] text-charcoal shadow-lg transition-all duration-300 hover:bg-gold-light hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
            >
              Respond Now
            </motion.button>

            {hasForm && (
              <a
                href={formUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] uppercase tracking-[0.25em] text-ivory/60 underline-offset-4 transition-colors hover:text-gold hover:underline"
              >
                Or open in new tab →
              </a>
            )}

            {!hasForm && (
              <p className="text-[10px] text-ivory/40">
                Form not configured. Add VITE_GOOGLE_FORM_URL.
              </p>
            )}
          </div>
        </motion.div>
      </div>

      {mounted && createPortal(modalContent, document.body)}
    </SectionWrapper>
  );
};

export default RSVP;
