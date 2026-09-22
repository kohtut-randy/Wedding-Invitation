import { motion } from "framer-motion";
import weddingConfig from "../config/wedding";
import Heroimg from "../assets/Hero.jpg";

const Hero = () => {
  const { bride, groom, weddingDateDisplay, heroTagline } = weddingConfig;

  return (
    <section
      id="home"
      className="relative flex min-h-screen min-w-full items-center justify-center overflow-hidden"
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
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-white/40" />
      </div>

      {/* Content */}
      <div className="relative z-20 flex h-full w-full flex-col items-center justify-end px-6 pb-20 text-center text-ivory">
        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mb-6 text-xs uppercase tracking-[0.4em] text-gold drop-shadow-md sm:text-sm"
        >
          {heroTagline}
        </motion.p>

        {/* Names — stacked on mobile/sm, flat on md and up */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8 }}
          className="font-serif font-bold leading-[1.1] text-gold drop-shadow-lg"
        >
          {/* Bride */}
          <span className="block whitespace-nowrap text-4xl sm:text-5xl md:inline md:text-6xl lg:text-7xl">
            {bride.name}
          </span>

          {/* Ampersand — stacked on mobile, inline on md+ */}
          <span className="my-1 block text-3xl italic text-gold-light sm:my-2 sm:text-4xl md:mx-4 md:my-0 md:inline md:text-5xl lg:mx-6 lg:text-6xl">
            &
          </span>

          {/* Groom */}
          <span className="block whitespace-nowrap text-4xl sm:text-5xl md:inline md:text-6xl lg:text-7xl">
            {groom.name}
          </span>
        </motion.h1>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="mx-auto my-6 h-px w-32 bg-gold-light"
        />

        {/* Date */}
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.6 }}
          className="font-serif text-lg tracking-[0.3em] text-gold drop-shadow-sm sm:text-2xl md:text-3xl"
        >
          {weddingDateDisplay}
        </motion.h3>
      </div>
    </section>
  );
};

export default Hero;
