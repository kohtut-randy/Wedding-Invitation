import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import SectionWrapper from "./SectionWrapper";
import weddingConfig from "../config/wedding";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const calculateTimeLeft = (targetDate: string): TimeLeft => {
  const difference = new Date(targetDate).getTime() - new Date().getTime();

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
};

interface CountdownUnitProps {
  value: number;
  label: string;
}

const CountdownUnit = ({ value, label }: CountdownUnitProps) => {
  const padded = value.toString().padStart(2, "0");

  return (
    <div className="flex flex-col items-center">
      {/* ✅ Responsive circle: 64px → 80px → 96px → 128px */}
      <div className="relative h-16 w-16 overflow-hidden rounded-full border border-gold/40 bg-ivory/50 sm:h-20 sm:w-20 md:h-24 md:w-24 lg:h-32 lg:w-32">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={padded}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -30, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex h-full w-full items-center justify-center"
          >
            {/* ✅ Responsive number: text-xl → text-2xl → text-3xl → text-5xl */}
            <span className="font-serif text-xl font-light text-gold sm:text-2xl md:text-3xl lg:text-5xl">
              {padded}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ✅ Responsive label: text-[9px] → text-[10px] → text-xs */}
      <span className="mt-2 text-[9px] uppercase tracking-[0.15em] text-charcoal/60 sm:mt-3 sm:text-[10px] sm:tracking-[0.2em] md:mt-4 md:text-xs md:tracking-[0.3em]">
        {label}
      </span>
    </div>
  );
};

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() =>
    calculateTimeLeft(weddingConfig.weddingDate),
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(weddingConfig.weddingDate));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <SectionWrapper className="bg-ivory">
      <div className="mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="mb-4 text-xs uppercase tracking-[0.4em] text-gold">
            Save The Date
          </p>
          <h2 className="mb-4 font-serif text-4xl font-light text-charcoal sm:text-5xl md:text-6xl">
            Counting Down
          </h2>
          <p className="mb-10 text-sm text-charcoal/60 sm:mb-12 sm:text-base md:mb-16">
            Until we say "I do" — {weddingConfig.weddingDateDisplay}
          </p>
        </motion.div>

        {/* ✅ Tighter gap on mobile so all 4 fit on iPhone SE */}
        <div className="flex flex-row items-center justify-center gap-3 sm:gap-5 md:gap-8 lg:gap-10">
          <CountdownUnit value={timeLeft.days} label="Days" />
          <CountdownUnit value={timeLeft.hours} label="Hours" />
          <CountdownUnit value={timeLeft.minutes} label="Minutes" />
          <CountdownUnit value={timeLeft.seconds} label="Seconds" />
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Countdown;
