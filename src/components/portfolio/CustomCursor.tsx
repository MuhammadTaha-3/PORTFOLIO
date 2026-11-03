import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion, AnimatePresence } from "motion/react";
import { useIsMobile } from "./motion-primitives";

export function CustomCursor() {
  const isMobile = useIsMobile();
  const reduce = useReducedMotion();
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 400, damping: 32 });
  const sy = useSpring(y, { stiffness: 400, damping: 32 });
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isMobile || reduce) return;
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const target = e.target as HTMLElement | null;
      setHovering(Boolean(target?.closest("[data-cursor='hover'], a, button")));
    };
    const leave = () => setVisible(false);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseout", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseout", leave);
    };
  }, [isMobile, reduce, x, y]);

  if (isMobile || reduce) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="pointer-events-none fixed top-0 left-0 z-[100] hidden lg:block"
          style={{ x: sx, y: sy }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="-translate-x-1/2 -translate-y-1/2 rounded-full border border-neon"
            animate={{
              width: hovering ? 56 : 18,
              height: hovering ? 56 : 18,
              backgroundColor: hovering ? "oklch(0.74 0.082 245 / 0.12)" : "oklch(0.74 0.082 245 / 0.9)",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
