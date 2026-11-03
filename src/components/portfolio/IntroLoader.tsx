import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

export function IntroLoader() {
  const reduce = useReducedMotion();
  const [progress, setProgress] = useState(reduce ? 100 : 0);
  const [visible, setVisible] = useState(!reduce);

  useEffect(() => {
    if (reduce) return;
    const startedAt = performance.now();
    const duration = 2200;
    let frame = 0;

    const tick = (now: number) => {
      const elapsed = Math.min((now - startedAt) / duration, 1);
      const eased = 1 - Math.pow(1 - elapsed, 3);
      setProgress(Math.round(eased * 100));
      if (elapsed < 1) frame = requestAnimationFrame(tick);
      else window.setTimeout(() => setVisible(false), 260);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [reduce]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col justify-between bg-background px-6 py-7 text-foreground md:px-10 md:py-9"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="flex items-start justify-between">
            <span className="label-mono text-foreground">Muhammad Taha</span>
            <span className="label-mono">Portfolio / 2026</span>
          </div>

          <div className="mx-auto flex w-full max-w-sm flex-col items-center">
            <div className="relative flex h-28 w-28 items-center justify-center">
              <svg className="absolute inset-0 -rotate-90" viewBox="0 0 100 100" aria-hidden>
                <circle cx="50" cy="50" r="43" fill="none" stroke="var(--border)" strokeWidth="2" />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="43"
                  fill="none"
                  stroke="var(--neon)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  pathLength="1"
                  style={{ pathLength: progress / 100 }}
                />
              </svg>
              <span className="font-display text-4xl tabular-nums">{progress}%</span>
            </div>
            <div className="mt-8 h-px w-full overflow-hidden bg-border">
              <motion.div
                className="h-full origin-left bg-neon"
                animate={{ scaleX: progress / 100 }}
              />
            </div>
          </div>

          <div className="flex items-end justify-between">
            <span className="label-mono">Loading experience</span>
            <span className="font-display text-2xl italic text-neon">hello.</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
