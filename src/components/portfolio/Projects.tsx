import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { ArrowUpRight } from "lucide-react";
import beanco from "@/assets/proj-beanco.png";
import shoeshead from "@/assets/proj-shoeshead.png";
import foodholic from "@/assets/proj-foodholic.png";
import { MaskLine, SectionLabel, useIsMobile } from "./motion-primitives";
import { LibraryDashboard } from "./LibraryDashboard";

type Project = {
  name: string;
  year: string;
  type: string;
  stack: string[];
  blurb: string;
  image?: string;
  isDashboard?: boolean;
  url: string;
};

const projects: Project[] = [
  {
    name: "Bean & Co",
    year: "2026",
    type: "Coffee Shop Website",
    stack: ["React", "Tailwind", "Vercel"],
    blurb:
      "Small-batch roastery storefront with a warm, editorial layout and a smooth ordering flow.",
    image: beanco,
    url: "https://bean-and-co-beta.vercel.app/",
  },
  {
    name: "ShoesHead",
    year: "2026",
    type: "Sneaker E-Commerce Store",
    stack: ["React", "Tailwind", "Vercel"],
    blurb:
      "Dark, bold sneaker store with curated collections, categories and a fast shopping experience.",
    image: shoeshead,
    url: "https://shoesshead.vercel.app/",
  },
  {
    name: "Food-holic",
    year: "2026",
    type: "Food Ordering Website",
    stack: ["React", "Tailwind", "Vercel"],
    blurb:
      "Restaurant ordering experience with a rich menu, dashboard and handcrafted dish showcases.",
    image: foodholic,
    url: "https://food-holic.vercel.app/",
  },
];

function ProjectRow({
  project,
  index,
  onHover,
}: {
  project: (typeof projects)[number];
  index: number;
  onHover: (i: number | null) => void;
}) {
  const isMobile = useIsMobile();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLAnchorElement>(null);
  const rx = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 200, damping: 20 });

  return (
    <motion.a
      ref={ref}
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor="hover"
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => {
        onHover(null);
        rx.set(0);
      }}
      onMouseMove={(e) => {
        if (isMobile || reduce || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        rx.set((-(e.clientY - (r.top + r.height / 2)) / r.height) * 8);
      }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: 1000 }}
      className="group block border-t border-border last:border-b"
    >
      <motion.div
        style={isMobile || reduce ? {} : { rotateX: srx, transformStyle: "preserve-3d" }}
        className="relative flex flex-col gap-5 py-8 md:flex-row md:items-center md:justify-between md:py-10"
      >
        <span className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-0 bg-elevated transition-[height] duration-500 group-hover:h-full" />

        <div className="flex items-baseline gap-5 md:gap-8">
          <span className="font-mono text-[0.65rem] text-muted-foreground">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="display-xl text-[clamp(1.9rem,5.5vw,4.4rem)] transition-colors duration-500 group-hover:text-neon">
            {project.name}
          </h3>
        </div>

        {/* mobile / tablet inline preview */}
        <div className="overflow-hidden lg:hidden">
          {project.isDashboard ? (
            <LibraryDashboard />
          ) : (
            <motion.img
              src={project.image}
              alt={`${project.name} interface preview`}
              width={1280}
              height={960}
              loading="lazy"
              className="aspect-[2/1] w-full object-cover"
              whileInView={reduce ? {} : { scale: [1.12, 1] }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            />
          )}
        </div>

        <div className="flex items-end justify-between gap-8 md:items-center">
          <div className="max-w-sm">
            <p className="label-mono">{project.type}</p>
            <p className="mt-2 text-sm text-muted-foreground">{project.blurb}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.stack.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-border px-2.5 py-1 font-mono text-[0.6rem] tracking-widest uppercase text-muted-foreground transition-colors group-hover:border-neon/40 group-hover:text-foreground"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-mono text-[0.65rem] text-muted-foreground">{project.year}</span>
            <motion.span
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border transition-colors group-hover:border-neon group-hover:text-neon"
              whileHover={{ rotate: 45 }}
            >
              <ArrowUpRight className="h-4 w-4" />
            </motion.span>
          </div>
        </div>
      </motion.div>
    </motion.a>
  );
}

export function Projects() {
  const [hovered, setHovered] = useState<number | null>(null);
  const isMobile = useIsMobile();
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const headY = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 140, damping: 20 });
  const sy = useSpring(my, { stiffness: 140, damping: 20 });

  const showFloating = !isMobile && !reduce;

  return (
    <section
      ref={sectionRef}
      id="projects"
      onMouseMove={(e) => {
        if (!showFloating) return;
        mx.set(e.clientX);
        my.set(e.clientY);
      }}
      className="relative mx-auto max-w-[1400px] px-6 py-28 md:px-10 md:py-40"
    >
      <SectionLabel index="03">Projects</SectionLabel>
      <motion.h2 style={{ y: headY }} className="display-xl mt-10 text-[clamp(2.4rem,7vw,6.5rem)]">
        <MaskLine>Selected work</MaskLine>
      </motion.h2>

      <div className="mt-14">
        {projects.map((p, i) => (
          <ProjectRow key={p.name} project={p} index={i} onHover={setHovered} />
        ))}
      </div>

      {showFloating && (
        <AnimatePresence>
          {hovered !== null && (
            <motion.div
              className="pointer-events-none fixed top-0 left-0 z-40 hidden lg:block"
              style={{ x: sx, y: sy }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="-translate-x-1/2 -translate-y-[112%] overflow-hidden border border-border shadow-[0_30px_80px_-30px_oklch(0.35_0.03_65/0.35)]">
                {projects[hovered]!.isDashboard ? (
                  <div className="h-[16rem] w-[24rem]">
                    <LibraryDashboard className="h-full" />
                  </div>
                ) : (
                  <motion.img
                    key={projects[hovered]!.name}
                    src={projects[hovered]!.image}
                    alt=""
                    width={1280}
                    height={960}
                    loading="lazy"
                    className="h-[12rem] w-[24rem] object-cover"
                    initial={{ scale: 1.18 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  />
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </section>
  );
}
