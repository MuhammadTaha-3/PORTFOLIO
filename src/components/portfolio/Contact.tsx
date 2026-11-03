import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { Mail, Github, Linkedin, ArrowUpRight } from "lucide-react";
import { MaskLine, Reveal, SectionLabel } from "./motion-primitives";
import { MagneticButton } from "./MagneticButton";

const channels = [
  {
    icon: Mail,
    label: "Email",
    value: "muhammadtaha2277@gmail.com",
    href: "mailto:muhammadtaha2277@gmail.com",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "github.com/MuhammadTaha-3",
    href: "https://github.com/MuhammadTaha-3",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/muhmmad-taha",
    href: "https://www.linkedin.com/in/muhmmad-taha/",
  },
];

export function Contact() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const scale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [0.82, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [0.25, 1]);

  return (
    <section
      ref={ref}
      id="contact"
      className="relative mx-auto max-w-[1400px] px-6 pt-28 pb-16 md:px-10 md:pt-40"
    >
      <SectionLabel index="05">Contact</SectionLabel>

      <div className="mt-12 grid gap-14 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <h2 className="display-xl text-[clamp(2.2rem,5.5vw,4.5rem)]">
            <MaskLine>Open to internships,</MaskLine>
            <MaskLine delay={0.08}>freelance work</MaskLine>
            <MaskLine delay={0.16}>and collaboration.</MaskLine>
          </h2>
          <Reveal delay={0.1} className="mt-8 max-w-lg">
            <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
              If you have an interface that deserves motion, structure and care — send it over. I
              reply to every message.
            </p>
          </Reveal>
          <Reveal delay={0.18} className="mt-10 flex flex-wrap gap-4">
            <MagneticButton href="mailto:muhammadtaha2277@gmail.com">
              Start a conversation <ArrowUpRight className="h-4 w-4" />
            </MagneticButton>
          </Reveal>
        </div>

        <ul className="divide-y divide-border border-y border-border">
          {channels.map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.li
                key={c.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-12%" }}
                transition={{ duration: 0.8, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              >
                <a
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : "_self"}
                  rel="noreferrer"
                  data-cursor="hover"
                  className="group flex items-center justify-between gap-6 py-6 transition-colors hover:text-neon"
                >
                  <span className="flex items-center gap-4">
                    <Icon className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-neon" />
                    <span className="label-mono">{c.label}</span>
                  </span>
                  <span className="truncate text-sm md:text-base">{c.value}</span>
                </a>
              </motion.li>
            );
          })}
        </ul>
      </div>

      <motion.div
        style={{ scale, opacity }}
        className="mt-24 origin-center overflow-hidden border-y border-border py-12 text-center md:mt-40 md:py-20"
      >
        <motion.p
          className="display-xl text-[clamp(4rem,14vw,13rem)] leading-[0.75]"
          initial={{ y: "105%", skewY: 7, filter: "blur(12px)" }}
          whileInView={{ y: "0%", skewY: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 1.35, ease: [0.16, 1, 0.3, 1] }}
        >
          Muhammad
          <br />
          <motion.span
            className="inline-block text-neon"
            initial={{ scaleX: 0.5, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
          >
            Taha
          </motion.span>
        </motion.p>
        <motion.p
          className="label-mono mt-8 text-neon"
          initial={{ opacity: 0, letterSpacing: "0.6em" }}
          whileInView={{ opacity: 1, letterSpacing: "0.28em" }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          MERN Stack Developer
        </motion.p>
      </motion.div>

      <div className="mt-20 flex flex-col items-center justify-between gap-3 border-t border-neon/40 pt-8 text-center md:flex-row md:text-left">
        <p className="label-mono text-xs text-foreground">Muhammad Taha — MERN Stack Developer</p>
        <p className="label-mono text-xs text-muted-foreground">Karachi, Pakistan</p>
      </div>
    </section>
  );
}
