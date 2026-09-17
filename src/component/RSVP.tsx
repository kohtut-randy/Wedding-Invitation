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
              className="rounded-full bg-gold px-10 py-4 text-sm uppercase tracking-[0.25em] text-ivory shadow-lg transition-all duration-300 hover:bg-gold-dark hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
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
                className="rounded-full border border-gold px-10 py-4 text-sm uppercase tracking-[0.25em] text-gold transition-all duration-300 hover:bg-gold/10"
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
            className="fixed inset-0 z-[100] flex items-center justify-center bg-charcoal/80 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative flex h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-sm bg-ivory shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-gold/20 px-6 py-4">
                <h3 className="font-serif text-2xl text-charcoal">RSVP Form</h3>
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
              <iframe
                src={formUrl}
                title="RSVP Form"
                className="h-full w-full flex-1 border-0 bg-white"
                loading="lazy"
              >
                Loading…
              </iframe>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </SectionWrapper>
  );
};

export default RSVP;
