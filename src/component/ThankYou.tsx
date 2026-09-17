import { motion } from "framer-motion";
import weddingConfig from "../config/wedding";

const ThankYou = () => {
  return (
    <section className="relative overflow-hidden bg-charcoal px-6 py-32 text-center">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-gold blur-3xl" />
        <div className="absolute right-1/4 bottom-1/4 h-64 w-64 rounded-full bg-gold-light blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-8 flex justify-center"
        >
          <svg width="60" height="60" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2C8 6 8 10 12 14C16 10 16 6 12 2Z"
              fill="#d9c08a"
              opacity="0.7"
            />
            <path
              d="M12 22C16 18 16 14 12 10C8 14 8 18 12 22Z"
              fill="#c9a961"
              opacity="0.7"
            />
          </svg>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="mb-8 font-serif text-5xl font-light text-ivory md:text-6xl"
        >
          Thank You
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="mb-12 text-lg leading-relaxed text-ivory/70"
        >
          Your love and support mean everything to us. We can't wait to share
          this beautiful moment with you and create memories that will last a
          lifetime.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.6 }}
        >
          <div className="mx-auto mb-8 h-px w-24 bg-gold/50" />
          <p className="font-serif text-3xl text-gold">
            {weddingConfig.bride.name} & {weddingConfig.groom.name}
          </p>
          <p className="mt-4 text-sm uppercase tracking-[0.3em] text-ivory/50">
            {weddingConfig.hashtag}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ThankYou;
