import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { ArrowDownRight } from "lucide-react";
import { CodeObject } from "./CodeObject";
import { MagneticButton } from "./MagneticButton";
import { easeOut, useIsMobile } from "./motion-primitives";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const objectScroll = useTransform(scrollYProgress, [0, 1], [0, 260]);

  // mouse parallax
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useSpring(mx, { stiffness: 90, damping: 20 });
  const py = useSpring(my, { stiffness: 90, damping: 20 });
  const rotY = useTransform(px, [-0.5, 0.5], [22, -22]);
  const rotX = useTransform(py, [-0.5, 0.5], [-18, 18]);
  const objX = useTransform(px, [-0.5, 0.5], [40, -40]);
  const objY = useTransform(py, [-0.5, 0.5], [26, -26]);
  const textX = useTransform(px, [-0.5, 0.5], [-14, 14]);

  const interactive = !reduce && !isMobile;

  return (
    <section
      ref={ref}
      id="hero"
      onMouseMove={(e) => {
        if (!interactive) return;
        mx.set(e.clientX / window.innerWidth - 0.5);
        my.set(e.clientY / window.innerHeight - 0.5);
      }}
      className="noise-overlay relative flex min-h-[100svh] flex-col justify-center overflow-hidden pt-28 pb-20"
    >
      {/* depth layers */}
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute top-1/2 right-[8%] -z-10 h-[58vmin] w-[58vmin] -translate-y-1/2 rounded-full bg-neon-soft blur-[120px]"
        animate={reduce ? {} : { scale: [1, 1.12, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* 3D floating code object */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-[52%] z-0 flex items-center justify-center opacity-25 lg:inset-y-0 lg:left-1/2 lg:right-0 lg:top-0 lg:opacity-100"
        style={{ y: objectScroll, perspective: 1200 }}
      >
        <CodeObject
          {...(interactive ? { motionStyle: { x: objX, rotateX: rotX, rotateY: rotY } } : {})}
        />
      </motion.div>

      <motion.div
        className="relative z-10 mx-auto grid w-full max-w-[1400px] grid-cols-1 px-6 md:px-10 lg:grid-cols-2 lg:items-center lg:gap-16"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <div className="lg:max-w-[680px]">
          <motion.div
            className="mb-8 flex items-center gap-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-neon opacity-70" />
              <span className="relative h-2 w-2 rounded-full bg-neon" />
            </span>
            <span className="label-mono">Available for work — Karachi, PK</span>
          </motion.div>

          <motion.h1
            className="display-xl text-[clamp(4.25rem,10vw,9.5rem)]"
            style={interactive ? { x: textX } : {}}
          >
            {["Muhammad", "Taha"].map((line, i) => (
              <span key={line} className="block overflow-hidden pb-[0.04em]">
                <motion.span
                  className={i === 0 ? "chrome-text block" : "block"}
                  initial={reduce ? { opacity: 0 } : { y: "108%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{ duration: 1.3, delay: 0.15 + i * 0.14, ease: easeOut }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </motion.h1>

          <div className="mt-8 flex flex-col gap-8 border-t border-border pt-6">
            <div className="overflow-hidden">
              <motion.p
                className="font-mono text-[clamp(0.72rem,1.5vw,1rem)] tracking-[0.42em] uppercase text-neon"
                initial={reduce ? { opacity: 0 } : { y: "120%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{ duration: 1.1, delay: 0.55, ease: easeOut }}
              >
                MERN Stack Developer
              </motion.p>
            </div>

            <motion.div
              className="flex max-w-lg flex-col gap-6"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8, ease: easeOut }}
            >
              <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
                I build fast, precise and highly interactive interfaces with React, Next.js and
                Motion — currently studying Computer Science while shipping real products.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <MagneticButton href="#projects">
                  View Work <ArrowDownRight className="h-4 w-4" />
                </MagneticButton>
              </div>
            </motion.div>
          </div>
        </div>
        <div aria-hidden className="hidden lg:block" />
      </motion.div>

      {/* scroll indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
      >
        <span className="label-mono text-[0.6rem]">Scroll</span>
        <span className="relative h-14 w-px overflow-hidden bg-border">
          <motion.span
            className="absolute inset-x-0 top-0 h-5 bg-neon"
            animate={reduce ? {} : { y: [-20, 56] }}
            transition={{ duration: 1.9, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.div>
    </section>
  );
}
