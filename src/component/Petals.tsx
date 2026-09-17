import { motion } from "framer-motion";
import { useMemo } from "react";

interface Petal {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  rotate: number;
  opacity: number;
}

const Petals = () => {
  const petals = useMemo<Petal[]>(() => {
    return Array.from({ length: 14 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 8,
      duration: 12 + Math.random() * 10,
      size: 12 + Math.random() * 14,
      rotate: Math.random() * 360,
      opacity: 0.25 + Math.random() * 0.35,
    }));
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-10 overflow-hidden">
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute"
          style={{
            left: `${petal.left}%`,
            width: petal.size,
            height: petal.size,
            opacity: petal.opacity,
          }}
          initial={{ y: -100, rotate: petal.rotate }}
          animate={{
            y: "110vh",
            rotate: petal.rotate + 360,
            x: [0, 30, -20, 15, 0],
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <svg viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2C8 6 8 10 12 14C16 10 16 6 12 2Z"
              fill="#d9c08a"
              opacity="0.8"
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
};

export default Petals;
