import { motion } from "framer-motion";
import weddingConfig from "../config/wedding";
import Heroimg from "../assets/Hero.jpg";

const Hero = () => {
  const { bride, groom, weddingDateDisplay, heroTagline } = weddingConfig;

  return (
    <section
      id="home"
      className="relative flex min-w-full min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <motion.img
          initial={{ scale: 1.15, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          src={Heroimg}
          alt="Wedding background"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/50 via-charcoal/40 to-charcoal/60" />
      </div>

      {/* Content */}
      <div className="relative z-20 px-6 text-center text-ivory">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mb-6 text-sm uppercase tracking-[0.4em] text-gold-bold"
        >
          {heroTagline}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8 }}
          className="font-serif text-4xl font-bold text-gold leading-tight md:text-8xl lg:text-9xl"
        >
          {bride.name}
          <span className="mx-4 italic text-gold-light md:mx-8">&</span>
          {groom.name}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="mx-auto my-8 h-px w-32 bg-gold-light"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.6 }}
          className="font-serif text-2xl tracking-[0.3em] md:text-3xl"
        >
          {weddingDateDisplay}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="mt-4 text-sm uppercase tracking-[0.3em] text-ivory/70"
        >
          {weddingConfig.venueName}
        </motion.p>
      </div>
    </section>
  );
};

export default Hero;
