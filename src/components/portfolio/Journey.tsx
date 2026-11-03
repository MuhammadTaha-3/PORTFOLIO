import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { GraduationCap, Code2, Rocket, Sparkles } from "lucide-react";
import { MaskLine, SectionLabel } from "./motion-primitives";

const steps = [
  {
    icon: Code2,
    title: "First lines of code",
    meta: "HTML · CSS · JavaScript",
    body: "Started with static pages and kept rebuilding them until layout, responsiveness and semantics clicked.",
  },
  {
    icon: GraduationCap,
    title: "BS Computer Science",
    meta: "Ilma University",
    body: "Studying computer science — data structures, algorithms and software fundamentals alongside frontend and backend work.",
  },
  {
    icon: Sparkles,
    title: "Into React & TypeScript",
    meta: "Components · Types · State",
    body: "Moved to component thinking: typed props, reusable UI systems, and interfaces that scale beyond one page.",
  },
  {
    icon: Rocket,
    title: "Motion & product polish",
    meta: "Next.js · Motion · Tailwind",
    body: "Now building complete products where animation, performance and accessibility are part of the design, not extras.",
  },
];

export function Journey() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 60%"] });
  const line = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <section id="journey" className="relative mx-auto max-w-[1400px] px-6 py-28 md:px-10 md:py-40">
      <SectionLabel index="04">Journey</SectionLabel>
      <h2 className="display-xl mt-10 text-[clamp(2.4rem,7vw,6.5rem)]">
        <MaskLine>How I got here</MaskLine>
      </h2>

      <div ref={ref} className="relative mt-16 pl-10 md:pl-20">
        <span className="absolute top-0 left-1 h-full w-px bg-border md:left-6" />
        <motion.span
          className="absolute top-0 left-1 w-px origin-top bg-neon md:left-6"
          style={{ height: "100%", scaleY: line }}
        />

        <div className="space-y-14 md:space-y-20">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-15%" }}
                transition={{ duration: 0.9, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="group relative"
              >
                <span className="absolute top-2 -left-[2.4rem] flex h-6 w-6 items-center justify-center rounded-full border border-border bg-background transition-colors group-hover:border-neon md:-left-[4.2rem]">
                  <Icon className="h-3 w-3 text-muted-foreground transition-colors group-hover:text-neon" />
                </span>
                <p className="label-mono">{s.meta}</p>
                <h3 className="font-display mt-2 text-3xl tracking-wide md:text-5xl">{s.title}</h3>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
                  {s.body}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
