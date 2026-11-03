import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { easeOut } from "./motion-primitives";

const navLinks = ["Work", "About", "Journal", "Expertise", "Contact"];

/**
 * The cream, light-mode opening stage — the "CREATIVE DEVELOPER" moment
 * from the reference video. Sits directly under the intro loader, before
 * the rest of the (dark) site takes over.
 */
export function CreativeCover() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const skew = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 6]);
  const distort = useTransform(scrollYProgress, [0, 0.5, 1], [0, 3, 0]);
  const blur = useTransform(distort, (d) => `blur(${d * 0.35}px)`);
  const fade = useTransform(scrollYProgress, [0, 0.8, 1], [1, 1, 0]);
  const rise = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);

  return (
    <section
      ref={ref}
      id="cover"
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden bg-cream px-6 pt-6 pb-8 text-cream-ink md:px-10 md:pt-8 md:pb-10"
    >
      {/* nav row */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.15, ease: easeOut }}
        className="flex items-center justify-between border-b border-cream-ink/10 pb-4"
      >
        <span className="font-display text-lg italic">muhammadtaha</span>
        <ul className="hidden items-center gap-7 font-mono text-[0.65rem] tracking-[0.2em] uppercase md:flex">
          {navLinks.map((l) => (
            <li key={l} className="cursor-pointer transition-opacity hover:opacity-60">
              {l}
            </li>
          ))}
        </ul>
        <span className="flex h-8 w-8 items-center justify-center rounded-full border border-cream-ink/20 text-[0.6rem]">
          ≡
        </span>
      </motion.div>

      {/* giant type */}
      <motion.div style={{ y: rise, opacity: fade }} className="relative flex-1 py-10 text-center">
        <motion.h1
          style={
            reduce
              ? {}
              : {
                  skewX: skew,
                  filter: blur,
                }
          }
          className="display-xl font-sans text-[clamp(3.4rem,15vw,11.5rem)] font-black uppercase leading-[0.82] tracking-tight"
        >
          <span className="block overflow-hidden">
            <motion.span
              className="glitch-text block"
              data-text="Creative"
              initial={reduce ? { opacity: 0 } : { y: "100%" }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{ duration: 1, delay: 0.3, ease: easeOut }}
            >
              Creative
            </motion.span>
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.75, ease: easeOut }}
          className="mx-auto -mt-1 text-[clamp(1.1rem,4vw,2.4rem)] font-semibold tracking-[0.02em] md:mt-0"
        >
          Developer
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1, ease: easeOut }}
          className="mt-6 flex items-center justify-center gap-3 font-mono text-[0.62rem] tracking-[0.32em] uppercase text-cream-ink/60"
        >
          <span>Visuals</span>
          <span className="h-1 w-1 rounded-full bg-cream-ink/40" />
          <span>Code</span>
          <span className="h-1 w-1 rounded-full bg-cream-ink/40" />
          <span>Experience</span>
        </motion.div>
      </motion.div>

      {/* footer row */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.1, ease: easeOut }}
        className="flex items-end justify-between"
      >
        <span className="font-mono text-[0.62rem] tracking-[0.15em] text-cream-ink/50">
          © 2026 — muhammadtaha
        </span>

        <motion.a
          href="#hero"
          data-cursor="hover"
          className="flex flex-col items-center gap-2 font-mono text-[0.6rem] tracking-[0.3em] uppercase text-cream-ink/60"
        >
          <span>Scroll to explore</span>
          <motion.span
            animate={reduce ? {} : { y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="h-4 w-4" />
          </motion.span>
        </motion.a>

        <span className="relative hidden h-16 w-16 shrink-0 items-center justify-center rounded-full border border-cream-ink/25 text-[0.5rem] tracking-[0.1em] uppercase md:flex">
          <motion.svg
            viewBox="0 0 100 100"
            className="absolute inset-0"
            animate={reduce ? {} : { rotate: 360 }}
            transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
          >
            <defs>
              <path
                id="circlePath"
                d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"
                fill="none"
              />
            </defs>
            <text fill="currentColor" fontSize="8" letterSpacing="1.5">
              <textPath href="#circlePath">BASED IN PAKISTAN • BASED IN PAKISTAN •</textPath>
            </text>
          </motion.svg>
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </motion.div>
    </section>
  );
}
