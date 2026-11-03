import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

const drops = [
  { left: "18%", delay: 0.9, size: 10 },
  { left: "34%", delay: 1.15, size: 7 },
  { left: "52%", delay: 1.0, size: 9 },
  { left: "68%", delay: 1.3, size: 6 },
  { left: "80%", delay: 1.05, size: 8 },
];

const tags = ["UI / UX", "Interactive Web", "Creative Development", "Motion Design"];

/**
 * "WORK" section opener — a big bold gold headline with dripping blobs
 * beneath it, matching the reference video's transition into the projects
 * list. The gooey SVG filter (blur + contrast) is applied only to the drip
 * layer so the blobs fuse together organically — the headline itself stays
 * crisp and always legible on top.
 */
export function WorkIntro() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <section className="relative flex min-h-[70svh] flex-col items-center justify-center overflow-hidden py-20">
      <svg width="0" height="0" aria-hidden>
        <defs>
          <filter id="liquid-goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -9"
            />
          </filter>
        </defs>
      </svg>

      <p className="label-mono mb-6 text-neon">Scroll to explore my</p>

      <div ref={ref} className="relative">
        {/* drip layer — goo filter applied here only, never on the text */}
        {!reduce && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-[92%] h-24"
            style={{ filter: "url(#liquid-goo)" }}
          >
            <span className="bg-neon absolute -top-2 left-1/2 h-4 w-full max-w-[70%] -translate-x-1/2 rounded-full opacity-90" />
            {drops.map((d, i) => (
              <motion.span
                key={i}
                className="bg-neon absolute -top-1 rounded-full"
                style={{ left: d.left, width: d.size, height: d.size }}
                initial={{ y: 0, opacity: 0 }}
                animate={inView ? { y: [0, 60, 80], opacity: [0, 1, 0] } : {}}
                transition={{
                  duration: 1.6,
                  delay: d.delay,
                  ease: "easeIn",
                  repeat: Infinity,
                  repeatDelay: 2.4,
                }}
              />
            ))}
          </div>
        )}

        {/* headline — always crisp, never filtered */}
        <motion.h2
          className="liquid-text text-neon relative text-[clamp(4rem,17vw,13rem)]"
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          Work
        </motion.h2>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 px-6"
      >
        {tags.map((t, i) => (
          <span key={t} className="label-mono flex items-center gap-6">
            {t}
            {i < tags.length - 1 && <span className="text-neon">•</span>}
          </span>
        ))}
      </motion.div>
    </section>
  );
}
