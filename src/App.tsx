import { useState, useRef, useCallback, useEffect } from "react";
import Globe, { type SectionId } from "./components/Globe";
import AboutMe from "./components/sections/AboutMe";
import Experience from "./components/sections/Experience";
import Projects from "./components/sections/Projects";
import TechSkills from "./components/sections/TechSkills";
import LetsConnect from "./components/sections/LetsConnect";

const SECTION_MAP: Record<SectionId, string> = {
  about: "about",
  experience: "experience",
  projects: "projects",
  skills: "skills",
  connect: "connect",
};

const NAV_ITEMS: { id: SectionId; label: string }[] = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "connect", label: "Connect" },
];

const SECTION_IDS = Object.values(SECTION_MAP);
const DIVIDER = <div style={{ height: "1px", background: "rgba(77,255,195,0.06)" }} />;

export default function App() {
  const [activeSection, setActiveSection] = useState<SectionId | null>(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const sectionsRef = useRef<HTMLDivElement>(null);

  const handleSectionClick = useCallback((id: SectionId) => {
    setActiveSection(id);
    setMobileNavOpen(false);
    const el = document.getElementById(SECTION_MAP[id]);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const scrollToGlobe = () => {
    setMobileNavOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Update active section based on scroll position
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id as SectionId;
            if (SECTION_IDS.includes(id)) setActiveSection(id as SectionId);
          }
        });
      },
      { threshold: 0.35 }
    );
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-full" style={{ background: "#050810", color: "#e8edf5" }}>
      {/* Fixed nav */}
      <nav
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: "rgba(5,8,16,0.8)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(77,255,195,0.07)",
        }}
      >
        <div className="flex items-center justify-between px-5 sm:px-8 md:px-12 py-3.5">
          <button onClick={scrollToGlobe} className="flex items-center gap-2">
            <div
              className="w-2 h-2 rounded-full shrink-0"
              style={{ background: "#4dffc3", boxShadow: "0 0 8px rgba(77,255,195,0.8)" }}
            />
            <span className="text-sm font-medium tracking-wide" style={{ color: "#e8edf5" }}>
              Jacob Tang
            </span>
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => handleSectionClick(item.id)}
                className="text-sm tracking-wide transition-colors duration-200 py-1"
                style={{ color: activeSection === item.id ? "#4dffc3" : "#7a8aaa" }}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-1"
            onClick={() => setMobileNavOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-5 h-px transition-all duration-200"
                style={{
                  background: "#7a8aaa",
                  transform:
                    mobileNavOpen
                      ? i === 0
                        ? "rotate(45deg) translate(3.5px, 3.5px)"
                        : i === 1
                        ? "scaleX(0)"
                        : "rotate(-45deg) translate(3.5px, -3.5px)"
                      : "none",
                  opacity: mobileNavOpen && i === 1 ? 0 : 1,
                }}
              />
            ))}
          </button>
        </div>

        {/* Mobile dropdown */}
        {mobileNavOpen && (
          <div
            className="md:hidden flex flex-col border-t"
            style={{ borderColor: "rgba(77,255,195,0.07)" }}
          >
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => handleSectionClick(item.id)}
                className="text-sm px-6 py-3.5 text-left transition-colors duration-150"
                style={{
                  color: activeSection === item.id ? "#4dffc3" : "#7a8aaa",
                  background:
                    activeSection === item.id
                      ? "rgba(77,255,195,0.04)"
                      : "transparent",
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Globe hero — shorter on small screens */}
      <div
        className="relative w-full"
        style={{ height: "100svh", minHeight: "min(500px, 100svh)" }}
      >
        <div
          className="absolute left-0 pointer-events-none z-10 text-left w-full"
          style={{
            top: "clamp(5.5rem, 13svh, 8rem)",
            paddingLeft: "clamp(1.25rem, 6vw, 5rem)",
            paddingRight: "clamp(1.25rem, 6vw, 5rem)",
            maxWidth: "36rem",
          }}
        >
          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-none mb-2 sm:mb-3"
            style={{ fontFamily: '"DM Serif Display", serif', color: "#e8edf5" }}
          >
            Jacob Tang
          </h1>
          <p
            className="text-xs sm:text-sm md:text-base tracking-widest uppercase"
            style={{ color: "rgba(77,255,195,0.7)" }}
          >
            Software Engineer
          </p>
        </div>

        <Globe onSectionClick={handleSectionClick} activeSection={activeSection} />
      </div>

      {/* Sections */}
      <div ref={sectionsRef} style={{ borderTop: "1px solid rgba(77,255,195,0.06)" }}>
        <AboutMe id="about" />
        {DIVIDER}
        <Experience id="experience" />
        {DIVIDER}
        <Projects id="projects" />
        {DIVIDER}
        <TechSkills id="skills" />
        {DIVIDER}
        <LetsConnect id="connect" />
      </div>
    </div>
  );
}
