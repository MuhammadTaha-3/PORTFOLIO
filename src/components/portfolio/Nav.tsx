import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { Download, Menu, X } from "lucide-react";

const links = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#journey", label: "Journey" },
  { href: "#contact", label: "Contact" },
];

const RESUME_HREF = "/muhammad-taha-resume.pdf";

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
          scrolled ? "glass-panel border-x-0 border-t-0" : "border-transparent"
        } text-foreground`}
      >
        <nav className="mx-auto grid max-w-[1400px] grid-cols-[1fr_auto_1fr] items-center gap-4 px-6 py-4 md:px-10">
          <a
            href="#hero"
            className="hidden font-display text-2xl tracking-wide md:inline-block"
            data-cursor="hover"
          >
            MT<span className="text-neon">.</span>
          </a>

          <ul className="hidden items-center justify-self-center gap-8 md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  data-cursor="hover"
                  className="label-mono relative py-1 opacity-80 transition-opacity hover:opacity-100 after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-neon after:transition-transform after:duration-300 hover:after:origin-left hover:after:scale-x-100"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href={RESUME_HREF}
            download
            data-cursor="hover"
            className="label-mono border-border hover:border-neon hover:text-neon hidden items-center gap-2 justify-self-end rounded-full border px-4 py-2 transition-colors md:flex"
          >
            Resume <Download className="h-3.5 w-3.5" />
          </a>

          {/* mobile — logo left, labelled résumé shortcut + menu toggle right */}
          <div className="col-span-3 flex items-center justify-between md:hidden">
            <a href="#hero" className="font-display text-2xl tracking-wide" data-cursor="hover">
              MT<span className="text-neon">.</span>
            </a>
            <div className="flex items-center gap-2">
              <a
                href={RESUME_HREF}
                download
                data-cursor="hover"
                className="label-mono border-border flex items-center gap-1.5 rounded-full border py-2 pr-3 pl-3.5"
              >
                Resume <Download className="h-3.5 w-3.5" />
              </a>
              <button
                aria-label={open ? "Close menu" : "Open menu"}
                onClick={() => setOpen((v) => !v)}
                className="border-border flex h-10 w-10 shrink-0 items-center justify-center rounded-full border"
              >
                {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </nav>
        <motion.div className="h-px origin-left bg-neon" style={{ scaleX: progress }} />
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col justify-center bg-background px-8 md:hidden"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {links.map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.08 * i + 0.1 }}
                className="display-xl border-b border-border py-5 text-5xl"
              >
                {l.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
