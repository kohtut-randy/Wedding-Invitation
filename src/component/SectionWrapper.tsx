import type { ReactNode } from "react";

interface SectionWrapperProps {
  children: ReactNode;
  id?: string;
  className?: string;
  delay?: number;
}

const SectionWrapper = ({
  children,
  id,
  className = "",
  delay = 0,
}: SectionWrapperProps) => {
  return (
    <section
      id={id}
      data-delay={delay}
      className={`px-6 py-20 md:py-28 ${className}`}
    >
      {children}
    </section>
  );
};

export default SectionWrapper;
