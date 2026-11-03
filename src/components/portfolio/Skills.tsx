import { useRef, useState } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform, useReducedMotion } from "motion/react";
import {
  Boxes,
  Braces,
  Cloud,
  Code2,
  Component,
  Figma,
  FileCode2,
  Flame,
  GitBranch,
  Github,
  Database,
  Layers,
  Leaf,
  Network,
  Palette,
  Server,
  Sparkles,
  Terminal,
  Webhook,
  Wind,
} from "lucide-react";
import { Reveal, SectionLabel, MaskLine, useIsMobile } from "./motion-primitives";

const skills = [
  { name: "HTML", icon: FileCode2, tag: "Markup" },
  { name: "CSS", icon: Palette, tag: "Styling" },
  { name: "JavaScript", icon: Braces, tag: "Language" },
  { name: "TypeScript", icon: Code2, tag: "Language" },
  { name: "React", icon: Component, tag: "Framework" },
  { name: "Next.js", icon: Layers, tag: "Framework" },
  { name: "Tailwind", icon: Wind, tag: "Styling" },
  { name: "Bootstrap", icon: Boxes, tag: "Styling" },
  { name: "Motion", icon: Sparkles, tag: "Animation" },
  { name: "Git", icon: GitBranch, tag: "Tooling" },
  { name: "GitHub", icon: Github, tag: "Tooling" },
  { name: "Figma", icon: Figma, tag: "Design" },
  { name: "Firebase", icon: Flame, tag: "Backend" },
  { name: "Vercel", icon: Cloud, tag: "Deploy" },
  { name: "Node.js", icon: Server, tag: "Backend" },
  { name: "Express.js", icon: Terminal, tag: "Backend" },
  { name: "MongoDB", icon: Leaf, tag: "Database" },
  { name: "Mongoose", icon: Network, tag: "ODM" },
  { name: "SQLite", icon: Database, tag: "Database" },
  { name: "REST APIs", icon: Webhook, tag: "Backend" },
];

function SkillCard({ skill, index }: { skill: (typeof skills)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const isMobile = useIsMobile();
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 220, damping: 18 });
  const sry = useSpring(ry, { stiffness: 220, damping: 18 });
  const Icon = skill.icon;
  const tilt = !reduce && !isMobile;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.7, delay: (index % 5) * 0.06, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: 900 }}
    >
      <motion.div
        ref={ref}
        data-cursor="hover"
        onMouseMove={(e) => {
          if (!tilt || !ref.current) return;
          const r = ref.current.getBoundingClientRect();
          ry.set(((e.clientX - (r.left + r.width / 2)) / r.width) * 26);
          rx.set((-(e.clientY - (r.top + r.height / 2)) / r.height) * 26);
        }}
        onMouseLeave={() => {
          rx.set(0);
          ry.set(0);
        }}
        style={tilt ? { rotateX: srx, rotateY: sry, transformStyle: "preserve-3d" } : {}}
        whileHover={{ scale: tilt ? 1.04 : 1 }}
        className="group relative flex aspect-square flex-col justify-between overflow-hidden border border-border bg-elevated/40 p-4 md:p-5"
      >
        <span className="pointer-events-none absolute inset-0 bg-neon-soft opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <span className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-500 group-hover:opacity-100 [box-shadow:inset_0_0_40px_oklch(0.64_0.1_45/0.18)]" />
        <div className="flex items-start justify-between">
          <Icon
            className="h-6 w-6 text-muted-foreground transition-colors duration-300 group-hover:text-neon md:h-7 md:w-7"
            style={tilt ? { transform: "translateZ(38px)" } : {}}
          />
          <span className="font-mono text-[0.6rem] text-muted-foreground/60">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
        <div style={tilt ? { transform: "translateZ(26px)" } : {}}>
          <p className="font-display text-xl leading-none tracking-wide md:text-2xl">{skill.name}</p>
          <p className="label-mono mt-1.5 text-[0.55rem]">{skill.tag}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Skills() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const marqueeX = useTransform(scrollYProgress, [0, 1], ["6%", "-26%"]);
  const [active] = useState<string | null>(null);

  return (
    <section ref={ref} id="skills" className="relative overflow-hidden py-28 md:py-40">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <SectionLabel index="02">Skills</SectionLabel>
        <h2 className="display-xl mt-10 text-[clamp(2.4rem,7vw,6.5rem)]">
          <MaskLine>The toolkit</MaskLine>
        </h2>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
            Everything here is something I use to actually ship — not a logo wall.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-5">
          {skills.map((s, i) => (
            <SkillCard key={s.name} skill={s} index={i} />
          ))}
        </div>
      </div>

      <motion.div style={{ x: marqueeX }} className="mt-20 flex w-max gap-10 whitespace-nowrap opacity-[0.07]">
        {[0, 1].map((r) => (
          <span key={r} className="display-xl text-[16vw]">
            MERN STACK · MOTION · TYPESCRIPT ·
          </span>
        ))}
      </motion.div>
      <span className="sr-only">{active}</span>
    </section>
  );
}
