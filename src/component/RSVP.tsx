import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import SectionWrapper from "./SectionWrapper";
import weddingConfig from "../config/wedding";

const RSVP = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const formUrl = weddingConfig.googleFormUrl;

  const hasForm = Boolean(formUrl);

  return (
    <SectionWrapper id="rsvp" className="bg-cream">
      <div className="mx-auto max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="mb-4 text-xs uppercase tracking-[0.4em] text-gold">
            Kindly Respond
          </p>
          <h2 className="mb-6 font-serif text-5xl font-light text-charcoal md:text-6xl">
            RSVP
          </h2>
          <p className="mx-auto mb-10 max-w-xl leading-relaxed text-charcoal/70">
            Your presence would mean the world to us. Please let us know if you
            will be able to join our celebration by{" "}
            <span className="text-gold">August 1, 2025</span>.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setModalOpen(true)}
              disabled={!hasForm}
              className="w-full rounded-full bg-gold px-10 py-4 text-sm uppercase tracking-[0.25em] text-ivory shadow-lg transition-all duration-300 hover:bg-gold-dark hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
            >
              RSVP Now
            </motion.button>

            {hasForm && (
              <motion.a
                href={formUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full rounded-full border border-gold px-10 py-4 text-sm uppercase tracking-[0.25em] text-gold transition-all duration-300 hover:bg-gold/10 sm:w-auto"
              >
                Open in New Tab
              </motion.a>
            )}
          </div>

          {!hasForm && (
            <p className="mt-6 text-sm text-charcoal/50">
              RSVP form is not configured yet. Please add VITE_GOOGLE_FORM_URL
              to your .env file.
            </p>
          )}

          {/* Mobile helper text */}
          {hasForm && (
            <p className="mt-4 text-xs text-charcoal/40 sm:hidden">
              Tip: For a better experience on mobile, tap{" "}
              <span className="text-gold">Open in New Tab</span>.
            </p>
          )}
        </motion.div>
      </div>

      {/* Modal with embedded Google Form */}
      <AnimatePresence>
        {modalOpen && hasForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModalOpen(false)}
            className="fixed inset-0 z-[100] flex items-stretch justify-center bg-charcoal/80 backdrop-blur-sm sm:items-center sm:p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative flex h-[100dvh] w-full flex-col overflow-hidden bg-ivory shadow-2xl sm:h-[90vh] sm:max-w-2xl sm:rounded-sm"
            >
              {/* Header */}
              <div className="flex flex-shrink-0 items-center justify-between border-b border-gold/20 px-4 py-3 sm:px-6 sm:py-4">
                <h3 className="font-serif text-xl text-charcoal sm:text-2xl">
                  RSVP Form
                </h3>
                <button
                  onClick={() => setModalOpen(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/30 text-charcoal transition-colors hover:border-gold hover:text-gold"
                  aria-label="Close RSVP form"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Form iframe — scrollable, sized to fit mobile */}
              <div className="relative flex-1 overflow-hidden bg-white">
                <iframe
                  src={formUrl}
                  title="RSVP Form"
                  className="absolute inset-0 h-full w-full border-0"
                  loading="lazy"
                  // ✅ Allow forms, scripts, and same-origin for Google Forms to work
                  sandbox="allow-forms allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
                >
                  Loading…
                </iframe>
              </div>

              {/* Mobile sticky footer with "Open in new tab" shortcut */}
              <div className="flex flex-shrink-0 items-center justify-center gap-3 border-t border-gold/20 bg-ivory px-4 py-3 sm:hidden">
                <a
                  href={formUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 rounded-full border border-gold px-6 py-3 text-center text-xs uppercase tracking-[0.2em] text-gold transition-colors hover:bg-gold/10"
                >
                  Open Full Form
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </SectionWrapper>
  );
};

export default RSVP;
