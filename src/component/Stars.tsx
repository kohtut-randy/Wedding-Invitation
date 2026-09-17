import { motion } from "framer-motion";
import { useMemo } from "react";

interface Star {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  rotate: number;
  opacity: number;
  drift: number[];
}

const Stars = () => {
  const stars = useMemo<Star[]>(() => {
    return Array.from({ length: 40 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 12,
      duration: 10 + Math.random() * 10,
      size: 8 + Math.random() * 14,
      rotate: Math.random() * 360,
      opacity: 0.4 + Math.random() * 0.5,
      drift: [
        0,
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 50,
        0,
      ],
    }));
  }, []);

  return (
    // z-0 → behind everything, pointer-events-none → doesn't block clicks
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute"
          style={{
            left: `${star.left}%`,
            width: star.size,
            height: star.size,
            opacity: star.opacity,
          }}
          initial={{ y: -80, rotate: star.rotate, opacity: 0 }}
          animate={{
            y: "110vh",
            x: star.drift,
            rotate: star.rotate + 360,
            opacity: [0, star.opacity, star.opacity, 0],
          }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <svg viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2 L13.5 10.5 L22 12 L13.5 13.5 L12 22 L10.5 13.5 L2 12 L10.5 10.5 Z"
              fill="#d9c08a"
            />
            <circle cx="12" cy="12" r="1.5" fill="#ffffff" opacity="0.9" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
};

export default Stars;
