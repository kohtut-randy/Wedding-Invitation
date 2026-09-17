import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import weddingConfig from "../config/wedding";

interface PersonCardProps {
  name: string;
  fullName: string;
  description: string;
  image: string;
  reversed?: boolean;
}

const PersonCard = ({
  fullName,
  description,
  image,
  reversed = false,
}: PersonCardProps) => {
  return (
    <div
      className={`flex flex-col items-center gap-8 md:gap-12 ${
        reversed ? "md:flex-row-reverse" : "md:flex-row"
      }`}
    >
      <motion.div
        initial={{ opacity: 0, x: reversed ? 40 : -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-xs md:w-1/2"
      >
        <div className="group relative overflow-hidden rounded-t-full">
          <img
            src={image}
            alt={fullName}
            className="aspect-[3/4] w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/20 to-transparent" />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: reversed ? -40 : 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="w-full md:w-1/2 md:px-8"
      >
        <p className="mb-3 text-xs uppercase tracking-[0.4em] text-gold">
          The {reversed ? "Groom" : "Bride"}
        </p>
        <h3 className="mb-6 font-serif text-4xl font-light text-charcoal md:text-5xl">
          {fullName}
        </h3>
        <p className="text-base leading-relaxed text-charcoal/70">
          {description}
        </p>
      </motion.div>
    </div>
  );
};

const CoupleIntro = () => {
  const { bride, groom } = weddingConfig;

  return (
    <SectionWrapper id="couple" className="bg-ivory">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center"
        >
          <p className="mb-4 text-xs uppercase tracking-[0.4em] text-gold">
            The Happy Couple
          </p>
          <h2 className="font-serif text-5xl font-light text-charcoal md:text-6xl">
            Two Hearts, One Journey
          </h2>
        </motion.div>

        <div className="space-y-24">
          <PersonCard
            name={bride.name}
            fullName={bride.fullName}
            description={bride.description}
            image={bride.image}
          />
          <PersonCard
            name={groom.name}
            fullName={groom.fullName}
            description={groom.description}
            image={groom.image}
            reversed
          />
        </div>
      </div>
    </SectionWrapper>
  );
};

export default CoupleIntro;
