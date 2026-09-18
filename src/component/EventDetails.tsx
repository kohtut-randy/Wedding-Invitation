import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import weddingConfig from "../config/wedding";

const EventDetails = () => {
  return (
    <SectionWrapper id="details" className="bg-cream">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center"
        >
          <p className="mb-4 text-xs uppercase tracking-[0.4em] text-gold">
            The Celebration
          </p>
          <h2 className="font-serif text-5xl font-light text-charcoal md:text-6xl">
            Wedding Day
          </h2>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-8">
          {weddingConfig.events.map((event, index) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.8,
                delay: index * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -8 }}
              className="group relative flex flex-col items-center rounded-sm border border-gold/20 bg-ivory p-8 text-center shadow-sm transition-shadow duration-500 hover:shadow-xl md:p-10"
            >
              {/* Botanical decoration */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-gold">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 2C8 6 8 10 12 14C16 10 16 6 12 2Z"
                    fill="currentColor"
                    opacity="0.5"
                  />
                </svg>
              </div>

              <p className="mb-3 text-xs uppercase tracking-[0.3em] text-gold">
                {event.time}
              </p>
              <h3 className="mb-4 font-serif text-3xl font-light text-charcoal">
                {event.title}
              </h3>
              <div className="mb-4 h-px w-12 bg-gold/40" />
              <p className="mb-2 font-serif text-4xl text-gold">
                {event.venue}
              </p>
              <p className="mb-6 text-sm text-charcoal/60">{event.address}</p>
              <p className="text-sm leading-relaxed text-charcoal/70">
                {event.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default EventDetails;
