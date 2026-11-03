import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion, type Variants } from "motion/react";
import type { ReactNode } from "react";

export function useIsMobile(breakpoint = 1024) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [breakpoint]);
  return isMobile;
}

export const spring = { type: "spring" as const, stiffness: 220, damping: 26, mass: 0.9 };
export const easeOut = [0.16, 1, 0.3, 1] as const;

/** Masked line reveal — the text slides up from behind an overflow mask. */
export function MaskLine({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  return (
    <span ref={ref} className="block overflow-hidden pb-[0.08em]">
      <motion.span
        className={`block ${className}`}
        initial={reduce ? { opacity: 0 } : { y: "110%", opacity: 0 }}
        animate={inView ? { y: "0%", opacity: 1 } : {}}
        transition={{ duration: 1, delay, ease: easeOut }}
      >
        {children}
      </motion.span>
    </span>
  );
}

/** Word-by-word staggered reveal for headlines. */
export function WordReveal({
  text,
  className = "",
  delay = 0,
  stagger = 0.06,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  const words = text.split(" ");
  return (
    <span ref={ref} className={className}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="inline-block overflow-hidden pb-[0.06em] align-bottom"
        >
          <motion.span
            className="inline-block"
            initial={reduce ? { opacity: 0 } : { y: "110%", rotateX: 40, opacity: 0 }}
            animate={inView ? { y: "0%", rotateX: 0, opacity: 1 } : {}}
            transition={{ duration: 1.1, delay: delay + i * stagger, ease: easeOut }}
          >
            {word}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: easeOut } },
};

export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-12%" }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

/** Section eyebrow: mono index + label with a hairline rule. */
export function SectionLabel({ index, children }: { index: string; children: ReactNode }) {
  return (
    <Reveal className="flex items-center gap-4">
      <span className="label-mono text-neon">{index}</span>
      <span className="label-mono">{children}</span>
      <span className="h-px flex-1 bg-border" />
    </Reveal>
  );
}
