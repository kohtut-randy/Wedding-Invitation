import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import weddingConfig from "../config/wedding";

interface LoadingScreenProps {
  onFinish?: () => void;
}

const LoadingScreen = ({ onFinish }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  // Simulated progress — increments smoothly to 100%
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Slow down near the end for elegance
        const remaining = 100 - prev;
        const increment = Math.max(0.5, remaining * 0.08);
        return Math.min(prev + increment, 100);
      });
    }, 80);

    return () => clearInterval(interval);
  }, []);

  // When progress hits 100, wait briefly then exit
  useEffect(() => {
    if (progress >= 100 && !isComplete) {
      const timer = setTimeout(() => {
        setIsComplete(true);
        onFinish?.();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [progress, isComplete, onFinish]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.8, ease: "easeInOut" },
          }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-ivory"
        >
          {/* Subtle radial gradient background */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/5 blur-3xl" />
          </div>

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center px-6 text-center">
            {/* Ornamental top flourish */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="mb-8 flex items-center gap-3"
            >
              <span className="h-px w-12 bg-gold/40" />
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2C8 6 8 10 12 14C16 10 16 6 12 2Z"
                  fill="#c9a961"
                  opacity="0.8"
                />
              </svg>
              <span className="h-px w-12 bg-gold/40" />
            </motion.div>

            {/* Monogram — bride & groom initials */}
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="font-serif text-6xl font-light tracking-wide text-charcoal sm:text-7xl md:text-8xl"
            >
              {weddingConfig.bride.name.charAt(0)}
              <span className="mx-3 italic text-gold sm:mx-4">&</span>
              {weddingConfig.groom.name.charAt(0)}
            </motion.h1>

            {/* Names under monogram */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="mt-6 text-xs uppercase tracking-[0.4em] text-charcoal/50"
            >
              {weddingConfig.bride.name} & {weddingConfig.groom.name}
            </motion.p>

            {/* Progress bar */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.9 }}
              className="mt-16 flex w-56 flex-col items-center sm:w-64"
            >
              {/* Track */}
              <div className="relative h-px w-full overflow-hidden bg-gold/20">
                {/* Fill */}
                <motion.div
                  className="absolute left-0 top-0 h-full bg-gold"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
              </div>

              {/* Percentage */}
              <div className="mt-4 flex w-full items-center justify-between">
                <span className="text-[10px] uppercase tracking-[0.3em] text-charcoal/40">
                  Loading
                </span>
                <span className="font-serif text-sm text-gold">
                  {Math.floor(progress)}%
                </span>
              </div>
            </motion.div>

            {/* Bottom flourish */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="mt-12 flex items-center gap-3"
            >
              <span className="h-px w-8 bg-gold/30" />
              <span className="text-[10px] uppercase tracking-[0.4em] text-gold/60">
                {weddingConfig.weddingDateDisplay}
              </span>
              <span className="h-px w-8 bg-gold/30" />
            </motion.div>
          </div>

          {/* Animated gold pulse in the background */}
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.03, 0.06, 0.03] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold blur-3xl"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
