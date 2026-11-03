import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform, useReducedMotion } from "motion/react";
import heroObject from "@/assets/hero-object.png";

const lines = ["CREATIVE", "MERN STACK", "DEVELOPER"];

/**
 * The cinematic scroll sequence: a pinned stage where oversized type flies
 * through Z-space while a chrome object rotates and the frame closes in.
 */
export function CinematicSequence() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  const z = useTransform(p, [0, 1], [0, 900]);
  const scale = useTransform(p, [0, 0.5, 1], [0.85, 1.1, 2.4]);
  const rotate = useTransform(p, [0, 1], [-6, 4]);
  const opacity = useTransform(p, [0, 0.1, 0.85, 1], [0, 1, 1, 0]);
  const objRotate = useTransform(p, [0, 1], [0, 220]);
  const objScale = useTransform(p, [0, 1], [0.6, 1.5]);
  const objOpacity = useTransform(p, [0, 0.4, 1], [0.15, 0.5, 0]);
  const barsScale = useTransform(p, [0, 1], [0, 1]);
  const glow = useTransform(p, [0, 0.6, 1], [0.05, 0.22, 0.05]);

  return (
    <div ref={ref} className="relative h-[320svh]" aria-label="Creative MERN stack developer">
      <div className="sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden">
        <motion.div
          className="pointer-events-none absolute inset-0 bg-neon"
          style={{
            opacity: glow,
            maskImage: "radial-gradient(circle at 50% 50%, black, transparent 60%)",
          }}
        />
        <div className="grid-lines pointer-events-none absolute inset-0 opacity-40" />

        <motion.img
          src={heroObject}
          alt=""
          width={1024}
          height={1024}
          loading="lazy"
          className="pointer-events-none absolute w-[60vmin] mix-blend-multiply"
          style={
            reduce ? { opacity: 0.2 } : { rotate: objRotate, scale: objScale, opacity: objOpacity }
          }
        />

        <motion.div className="relative z-10 px-6 text-center" style={{ perspective: 900 }}>
          <motion.h2
            className="display-xl text-[clamp(3rem,13vw,11rem)]"
            style={reduce ? {} : { z, scale, rotate, opacity, transformStyle: "preserve-3d" }}
          >
            {lines.map((l, i) => (
              <span key={`${l}-${i}`} className={i === 1 ? "block text-neon" : "block chrome-text"}>
                {l}
              </span>
            ))}
          </motion.h2>
        </motion.div>

        <motion.span
          className="absolute top-0 left-0 h-px w-full origin-left bg-neon/60"
          style={{ scaleX: barsScale }}
        />
        <motion.span
          className="absolute bottom-0 right-0 h-px w-full origin-right bg-neon/60"
          style={{ scaleX: barsScale }}
        />
      </div>
    </div>
  );
}
