import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { MaskLine, Reveal, SectionLabel, WordReveal } from "./motion-primitives";
import profile from "@/assets/profile.jpg";

const stats = [
  { k: "Focus", v: "React / Next.js" },
  { k: "Studying", v: "BS Computer Science" },
  { k: "Craft", v: "Motion & Interaction" },
  { k: "Based in", v: "Karachi, Pakistan" },
];

export function About() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);

  return (
    <section
      ref={ref}
      id="about"
      className="relative mx-auto max-w-[1400px] px-4 py-20 sm:px-6 sm:py-28 md:px-10 md:py-40"
    >
      <SectionLabel index="01">About</SectionLabel>

      <div className="mt-14 grid gap-14 lg:grid-cols-[0.75fr_1.6fr] lg:gap-16">
        <Reveal>
          <div className="border-border bg-elevated relative aspect-[3/4] overflow-hidden rounded-sm border">
            <img
              src={profile}
              alt="Muhammad Taha"
              width={800}
              height={1067}
              className="h-full w-full object-cover"
            />
          </div>
        </Reveal>

        <div>
          <h2 className="display-xl text-[clamp(2.2rem,5.5vw,4.6rem)]">
            <MaskLine>I design and build</MaskLine>
            <MaskLine delay={0.08}>
              <span className="neon-text">interfaces with intent.</span>
            </MaskLine>
          </h2>

          <div className="mt-8 max-w-2xl space-y-5 text-base leading-relaxed text-muted-foreground md:text-lg">
            <Reveal>
              <p>
                I'm Muhammad Taha, a MERN stack developer and Computer Science student. I care about
                the small things — how a page loads, how a button responds, how type sits on a grid
                — because that's where a good interface becomes a great one.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p>
                My work sits between engineering and design: component architecture, accessible
                markup and clean TypeScript on one side, motion, layout and rhythm on the other. I'm
                still learning, constantly, and I build real projects to do it.
              </p>
            </Reveal>
          </div>

          <motion.div
            style={{ y }}
            className="mt-10 grid grid-cols-2 gap-x-8 gap-y-5 border-t border-border pt-8 sm:grid-cols-4"
          >
            {stats.map((s, i) => (
              <Reveal key={s.k} delay={i * 0.05}>
                <div className="group">
                  <p className="label-mono">{s.k}</p>
                  <p className="font-display mt-1 text-lg tracking-wide transition-colors group-hover:text-neon md:text-xl">
                    {s.v}
                  </p>
                </div>
              </Reveal>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="mt-24 overflow-hidden border-y border-border py-6">
        <WordReveal
          text="CLEAN CODE · PURPOSEFUL MOTION · PIXEL DISCIPLINE · PERFORMANCE FIRST"
          className="label-mono text-[0.7rem] md:text-xs"
          stagger={0.03}
        />
      </div>
    </section>
  );
}
