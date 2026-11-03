import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion, animate } from "motion/react";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  Undo2,
  CircleDollarSign,
  Settings,
  Search,
  Bell,
  TrendingUp,
} from "lucide-react";

const easeOut = [0.16, 1, 0.3, 1] as const;

const navItems = [
  { icon: LayoutDashboard, label: "Overview", active: true },
  { icon: BookOpen, label: "Catalog" },
  { icon: Users, label: "Members" },
  { icon: Undo2, label: "Returns" },
  { icon: CircleDollarSign, label: "Fines" },
  { icon: Settings, label: "Settings" },
];

const baseStats = [
  { label: "Total Books", value: 12480 },
  { label: "Active Members", value: 3210 },
  { label: "Borrowed Today", value: 128 },
  { label: "Overdue", value: 14 },
];

const rows = [
  { book: "Atomic Habits", member: "S. Malik", due: "Today", status: "Due" },
  { book: "Dune", member: "A. Raza", due: "Sep 14", status: "Borrowed" },
  { book: "Clean Code", member: "H. Fatima", due: "Sep 10", status: "Overdue" },
  { book: "Sapiens", member: "M. Bilal", due: "Sep 18", status: "Borrowed" },
  { book: "The Hobbit", member: "Z. Khan", due: "Sep 09", status: "Returned" },
];

const statusStyle: Record<string, string> = {
  Due: "bg-neon/15 text-neon border-neon/30",
  Borrowed: "bg-sky-400/10 text-sky-300 border-sky-400/25",
  Overdue: "bg-red-500/10 text-red-400 border-red-500/25",
  Returned: "bg-emerald-500/10 text-emerald-400 border-emerald-500/25",
};

const chartBars = [40, 65, 50, 80, 55, 90, 70];

/** Counts up once when `active` flips true, then (optionally) keeps nudging
 *  by small live increments so the dashboard never looks frozen. */
function LiveStat({ value, active, live }: { value: number; active: boolean; live?: boolean }) {
  const [display, setDisplay] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!active) return;
    if (reduce) {
      setDisplay(value);
      return;
    }
    const controls = animate(0, value, {
      duration: 1.4,
      ease: easeOut,
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [active, value, reduce]);

  useEffect(() => {
    if (!active || !live || reduce) return;
    const id = window.setInterval(() => {
      setDisplay((d) => d + Math.round(Math.random() * 3));
    }, 2600);
    return () => window.clearInterval(id);
  }, [active, live, reduce]);

  return <>{display.toLocaleString()}</>;
}

/**
 * A fully coded, animated admin-dashboard mockup for the Library Management
 * System project — shown inside a browser-chrome frame like the other live
 * previews in the reference video. Entrance staggers in on scroll, then a
 * set of small idle loops (scanning highlight, breathing chart, blinking
 * cursor, ticking counter) keep it visibly alive instead of settling into a
 * static frame.
 */
export function LibraryDashboard({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <div
      ref={ref}
      className={`relative flex w-full select-none flex-col overflow-hidden rounded-sm border border-white/10 bg-[#0c0e0b] shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)] ${className}`}
    >
      {/* browser chrome */}
      <div className="flex shrink-0 items-center gap-2 border-b border-white/10 bg-[#111310] px-2 py-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-red-400/70" />
        <span className="h-1.5 w-1.5 rounded-full bg-yellow-400/70" />
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/70" />
        <span className="mx-auto flex items-center gap-1 rounded-full bg-white/5 px-3 py-0.5 text-[6px] text-white/40">
          app.libraryos.dev
        </span>
      </div>

      <div className="flex flex-1 aspect-[4/3] font-sans text-[6px] sm:text-[7px]">
        {/* sidebar */}
        <motion.div
          initial={reduce ? {} : { x: -16, opacity: 0 }}
          animate={inView ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6, ease: easeOut }}
          className="flex w-[22%] flex-col gap-3 border-r border-white/10 bg-[#0c0e0b] px-2 py-3"
        >
          <div className="flex items-center gap-1.5">
            <span className="flex h-3.5 w-3.5 items-center justify-center rounded-[3px] bg-neon text-[6px] font-bold text-[#111310]">
              L
            </span>
            <span className="truncate text-[6px] font-semibold tracking-wide text-white/90 sm:text-[7px]">
              Library OS
            </span>
          </div>

          <div className="mt-1 flex flex-col gap-1">
            {navItems.map((item, i) => (
              <motion.div
                key={item.label}
                initial={reduce ? {} : { opacity: 0, x: -6 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.15 + i * 0.06, ease: easeOut }}
                className={`flex items-center gap-1.5 rounded-[3px] px-1.5 py-1 ${
                  item.active ? "bg-neon/15 text-neon" : "text-white/50"
                }`}
              >
                <item.icon className="h-2 w-2 shrink-0" strokeWidth={2.2} />
                <span className="truncate">{item.label}</span>
              </motion.div>
            ))}
          </div>

          <div className="mt-auto flex items-center gap-1 rounded-[3px] border border-white/10 px-1.5 py-1 text-white/40">
            <motion.span
              className="h-1 w-1 shrink-0 rounded-full bg-emerald-400"
              animate={reduce ? {} : { opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            />
            <span className="truncate">System online</span>
          </div>
        </motion.div>

        {/* main */}
        <div className="flex flex-1 flex-col gap-2 px-2.5 py-3">
          {/* topbar */}
          <motion.div
            initial={reduce ? {} : { opacity: 0, y: -6 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: easeOut }}
            className="flex items-center justify-between"
          >
            <div>
              <p className="text-[7px] font-semibold text-white/90 sm:text-[8px]">
                Library Management System
              </p>
              <p className="text-white/40">Circulation overview</p>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="flex items-center gap-1 rounded-[3px] border border-white/10 bg-white/[0.03] px-1.5 py-0.5 text-white/40">
                <Search className="h-2 w-2" />
                <span className="hidden items-center gap-[1px] sm:flex">
                  Search
                  <motion.span
                    className="ml-[1px] inline-block h-[6px] w-[1px] bg-white/40"
                    animate={reduce ? {} : { opacity: [1, 1, 0, 0] }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                </span>
              </div>
              <Bell className="h-2.5 w-2.5 text-white/40" />
              <span className="h-3.5 w-3.5 rounded-full bg-gradient-to-br from-neon/70 to-neon/20" />
            </div>
          </motion.div>

          {/* stat cards */}
          <div className="grid grid-cols-4 gap-1.5">
            {baseStats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={reduce ? {} : { opacity: 0, y: 8 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.08, ease: easeOut }}
                className="rounded-[3px] border border-white/10 bg-white/[0.03] px-1.5 py-1"
              >
                <p className="text-white/40">{s.label}</p>
                <p className="mt-0.5 text-[7px] font-semibold text-white sm:text-[8px]">
                  <LiveStat value={s.value} active={inView} live={s.label === "Borrowed Today"} />
                </p>
              </motion.div>
            ))}
          </div>

          <div className="grid flex-1 grid-cols-5 gap-1.5">
            {/* table */}
            <motion.div
              initial={reduce ? {} : { opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.4, ease: easeOut }}
              className="relative col-span-3 flex flex-col overflow-hidden rounded-[3px] border border-white/10 bg-white/[0.02] px-1.5 py-1.5"
            >
              <div className="mb-1 flex items-center justify-between text-white/40">
                <span>Recent circulation</span>
                <span>{rows.length} entries</span>
              </div>
              <div className="relative flex flex-col gap-1">
                {rows.map((r, i) => (
                  <motion.div
                    key={r.book}
                    initial={reduce ? {} : { opacity: 0, x: -6 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.55 + i * 0.08, ease: easeOut }}
                    className="flex items-center justify-between gap-1 border-t border-white/5 pt-1 first:border-t-0 first:pt-0"
                  >
                    <span className="truncate text-white/80">{r.book}</span>
                    <span className="hidden truncate text-white/40 sm:inline">{r.member}</span>
                    <span
                      className={`shrink-0 rounded-full border px-1 py-[1px] ${statusStyle[r.status]}`}
                    >
                      {r.status}
                    </span>
                  </motion.div>
                ))}

                {/* continuous scan-line highlight, cycles down the rows */}
                {!reduce && (
                  <motion.div
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 h-[15%] rounded-[2px] bg-neon/5"
                    initial={{ opacity: 0 }}
                    animate={
                      inView ? { top: ["0%", "0%", "85%", "85%"], opacity: [0, 1, 1, 0] } : {}
                    }
                    transition={{
                      duration: 4.5,
                      delay: 1.4,
                      repeat: Infinity,
                      repeatDelay: 1,
                      ease: easeOut,
                    }}
                  />
                )}
              </div>
            </motion.div>

            {/* mini chart */}
            <motion.div
              initial={reduce ? {} : { opacity: 0, y: 8 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.35, ease: easeOut }}
              className="col-span-2 flex flex-col rounded-[3px] border border-white/10 bg-white/[0.02] px-1.5 py-1.5"
            >
              <div className="mb-1 flex items-center gap-1 text-white/40">
                <TrendingUp className="h-2 w-2 text-neon" />
                <span>Borrow trend</span>
              </div>
              <div className="flex flex-1 items-end gap-[3px]">
                {chartBars.map((h, i) => (
                  <motion.span
                    key={i}
                    initial={reduce ? {} : { scaleY: 0 }}
                    animate={
                      inView
                        ? reduce
                          ? { scaleY: 1 }
                          : { scaleY: [0, 1, 1 - (i % 3) * 0.05, 1] }
                        : {}
                    }
                    transition={{
                      duration: 0.6,
                      delay: 0.6 + i * 0.06,
                      times: [0, 0.4, 0.7, 1],
                      repeat: Infinity,
                      repeatDelay: 2.2,
                      ease: easeOut,
                    }}
                    style={{ height: `${h}%` }}
                    className="w-full origin-bottom rounded-t-[2px] bg-gradient-to-t from-neon/70 to-neon"
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
