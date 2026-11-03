import { motion, useReducedMotion, type MotionStyle } from "motion/react";

type Props = {
  motionStyle?: MotionStyle;
};

const CODE: { indent: number; tokens: { t: string; c: string }[] }[] = [
  {
    indent: 0,
    tokens: [
      { t: "const", c: "text-neon" },
      { t: "developer", c: "text-foreground" },
      { t: "=", c: "text-muted-foreground" },
      { t: "{", c: "text-ice" },
    ],
  },
  {
    indent: 1,
    tokens: [
      { t: "name:", c: "text-muted-foreground" },
      { t: "'Muhammad Taha',", c: "text-ice" },
    ],
  },
  {
    indent: 1,
    tokens: [
      { t: "role:", c: "text-muted-foreground" },
      { t: "'MERN Stack Developer',", c: "text-ice" },
    ],
  },
  {
    indent: 1,
    tokens: [
      { t: "stack:", c: "text-muted-foreground" },
      { t: "['React', 'Next.js',", c: "text-ice" },
    ],
  },
  {
    indent: 2,
    tokens: [{ t: "'TypeScript', 'Motion'],", c: "text-ice" }],
  },
  {
    indent: 1,
    tokens: [
      { t: "ships:", c: "text-muted-foreground" },
      { t: "true", c: "text-neon" },
    ],
  },
  { indent: 0, tokens: [{ t: "};", c: "text-ice" }] },
];

const FLOATERS = ["</>", "{ }", "( )", "=>", "[ ]", "#!"];

export function CodeObject({ motionStyle }: Props) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      aria-hidden
      className="relative"
      style={motionStyle ?? {}}
      initial={{ opacity: 0, scale: 0.86, rotateX: 14 }}
      animate={
        reduce
          ? { opacity: 1, scale: 1, rotateX: 0 }
          : { opacity: 1, scale: 1, rotateX: 0, y: [0, -18, 0] }
      }
      transition={{
        opacity: { duration: 1.2 },
        scale: { duration: 1.4, ease: [0.16, 1, 0.3, 1] },
        rotateX: { duration: 1.4, ease: [0.16, 1, 0.3, 1] },
        y: { duration: 10, repeat: Infinity, ease: "easeInOut" },
      }}
    >
      {/* glow behind the panel */}
      <div className="pointer-events-none absolute -inset-16 -z-10 rounded-[50%] bg-neon-soft blur-[90px]" />

      {/* code panel */}
      <div className="glass-panel w-[min(86vw,540px)] rounded-xl border border-border/80 p-5 shadow-[0_40px_120px_-40px_rgba(90,70,50,0.3)] md:p-7">
        <div className="mb-5 flex items-center gap-2 border-b border-border/70 pb-4">
          <span className="h-2 w-2 rounded-full bg-neon" />
          <span className="h-2 w-2 rounded-full bg-border" />
          <span className="h-2 w-2 rounded-full bg-border" />
          <span className="label-mono ml-3 text-[0.55rem]">developer.ts</span>
        </div>

        <div className="space-y-2 font-mono text-[clamp(0.6rem,1.35vw,0.9rem)] leading-relaxed">
          {CODE.map((line, i) => (
            <motion.div
              key={i}
              className="flex gap-3"
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="w-4 shrink-0 text-right text-muted-foreground/40">{i + 1}</span>
              <span
                style={{ paddingLeft: `${line.indent * 1.25}rem` }}
                className="flex flex-wrap gap-x-2"
              >
                {line.tokens.map((tk, j) => (
                  <span key={j} className={tk.c}>
                    {tk.t}
                  </span>
                ))}
                {i === CODE.length - 1 && (
                  <motion.span
                    className="ml-1 inline-block h-[1em] w-[0.5em] translate-y-[0.15em] bg-neon"
                    animate={reduce ? {} : { opacity: [1, 0, 1] }}
                    transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }}
                  />
                )}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* floating dev tokens */}
      {FLOATERS.map((f, i) => {
        const positions = [
          "-top-10 -left-8",
          "-top-14 right-6",
          "top-1/3 -right-14",
          "-bottom-12 left-10",
          "-bottom-8 right-1/4",
          "top-1/2 -left-16",
        ];
        return (
          <motion.span
            key={f}
            className={`pointer-events-none absolute ${positions[i]} font-mono text-sm tracking-[0.2em] text-neon/60 md:text-base`}
            animate={reduce ? {} : { y: [0, -14, 0], opacity: [0.35, 0.9, 0.35] }}
            transition={{ duration: 6 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
          >
            {f}
          </motion.span>
        );
      })}
    </motion.div>
  );
}
