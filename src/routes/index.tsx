import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/portfolio/Nav";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Skills } from "@/components/portfolio/Skills";
import { Projects } from "@/components/portfolio/Projects";
import { CinematicSequence } from "@/components/portfolio/CinematicSequence";
import { Journey } from "@/components/portfolio/Journey";
import { Contact } from "@/components/portfolio/Contact";
import { CustomCursor } from "@/components/portfolio/CustomCursor";
import { IntroLoader } from "@/components/portfolio/IntroLoader";
import { WorkIntro } from "@/components/portfolio/WorkIntro";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Muhammad Taha — MERN Stack Developer" },
      {
        name: "description",
        content:
          "Portfolio of Muhammad Taha, MERN stack developer and computer science student building full-stack apps with MongoDB, Express, React, Node.js, Firebase and SQLite.",
      },
      { property: "og:title", content: "Muhammad Taha — MERN Stack Developer" },
      {
        property: "og:description",
        content:
          "Cinematic MERN stack portfolio: React, Next.js, TypeScript, Tailwind and Motion projects by Muhammad Taha.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="relative bg-background text-foreground">
      <IntroLoader />
      <CustomCursor />
      <Nav />
      <Hero />
      <About />
      <Skills />
      <WorkIntro />
      <Projects />
      <CinematicSequence />
      <Journey />
      <Contact />
    </main>
  );
}
