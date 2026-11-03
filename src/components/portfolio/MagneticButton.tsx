import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";
import { useIsMobile } from "./motion-primitives";

type Props = {
  children: ReactNode;
  href: string;
  variant?: "solid" | "ghost";
  className?: string;
  download?: boolean;
};

export function MagneticButton({
  children,
  href,
  variant = "solid",
  className = "",
  download = false,
}: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduce = useReducedMotion();
  const isMobile = useIsMobile();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 15 });
  const sy = useSpring(y, { stiffness: 180, damping: 15 });

  const disabled = reduce || isMobile;

  return (
    <motion.a
      ref={ref}
      href={href}
      {...(download ? { download: "" } : {})}
      style={disabled ? {} : { x: sx, y: sy }}

      onMouseMove={(e) => {
        if (disabled || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * 0.28);
        y.set((e.clientY - (r.top + r.height / 2)) * 0.35);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      whileHover={{ scale: disabled ? 1 : 1.03 }}
      whileTap={{ scale: 0.97 }}
      data-cursor="hover"
      className={[
        "group relative inline-flex items-center gap-3 overflow-hidden rounded-full px-7 py-3.5",
        "font-mono text-[0.7rem] tracking-[0.22em] uppercase transition-colors",
        variant === "solid"
          ? "bg-primary text-primary-foreground"
          : "border border-border text-foreground hover:border-neon",
        className,
      ].join(" ")}
    >
      {variant === "ghost" && (
        <span className="absolute inset-0 -z-10 origin-bottom scale-y-0 bg-neon-soft transition-transform duration-500 group-hover:scale-y-100" />
      )}
      {children}
    </motion.a>
  );
}
