import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import weddingConfig from "../config/wedding";

const Location = () => {
  const { googleMapsUrl, venueName, venueAddress } = weddingConfig;

  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    venueAddress,
  )}`;

  console.log({ googleMapsUrl, venueName, venueAddress });

  return (
    <SectionWrapper id="location" className="bg-ivory">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <p className="mb-4 text-xs uppercase tracking-[0.4em] text-gold">
            Find Us
          </p>
          <h2 className="mb-4 font-serif text-5xl font-light text-charcoal md:text-6xl">
            The Venue
          </h2>
          <p className="font-serif text-2xl text-charcoal/80">{venueName}</p>
          <p className="mt-2 text-sm text-charcoal/60">{venueAddress}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden rounded-sm border border-gold/20 shadow-lg"
        >
          {googleMapsUrl ? (
            <iframe
              src={googleMapsUrl}
              title="Wedding venue location"
              className="h-[400px] w-full border-0 md:h-[500px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          ) : (
            <div className="flex h-[400px] items-center justify-center bg-cream text-charcoal/50">
              Google Maps embed URL not configured. Add VITE_GOOGLE_MAPS_URL to
              your .env file.
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-10 text-center"
        >
          <motion.a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-3 rounded-full border border-gold px-10 py-4 text-sm uppercase tracking-[0.25em] text-gold transition-all duration-300 hover:bg-gold hover:text-ivory"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
            Get Directions
          </motion.a>
        </motion.div>
      </div>
    </SectionWrapper>
  );
};

export default Location;
