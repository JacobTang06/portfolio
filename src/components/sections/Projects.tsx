interface ProjectsProps {
  id: string;
}

const PROJECTS = [
  {
    title: "AI Tutor",
    description:
      "A comprehensive learning platform that helps students study smarter by organizing course materials and using AI to explain concepts, summarize notes, generate quizzes, and provide personalized tutoring.",
    tags: ["Python", "FastAPI", "React", "TypeScript", "Docker"],
    year: "2026",
    image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=600&h=400&fit=crop&auto=format",
    link: "https://github.com/SDSU-CompE-561-Fall-2025/ai-tutor",
  },
  {
    title: "StockPicker",
    description:
      "A real-time stock-picking competition platform that tracks team portfolios, processes market data, and delivers API-powered leaderboards through scalable event processing.",
    tags: ["Python", "FastAPI", "NGINX", "Kafka"],
    year: "2026",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=400&fit=crop&auto=format",
    link: "architecture-diagram.html",
  },
];

export default function Projects({ id }: ProjectsProps) {
  return (
    <section id={id} className="py-16 sm:py-20 md:py-24 px-5 sm:px-8 md:px-16 lg:px-32">
      <div className="max-w-5xl mx-auto w-full">
        <div className="mb-10 sm:mb-14 md:mb-16">
          <p className="text-xs tracking-widest uppercase mb-3" style={{ color: "#4dffc3" }}>
            03 — Projects
          </p>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl leading-tight"
            style={{ fontFamily: '"DM Serif Display", serif', color: "#e8edf5" }}
          >
            What I've{" "}
            <em style={{ color: "#ff6b4a" }}>built</em>
          </h2>
        </div>

        <div className="flex flex-col gap-5 sm:gap-6 md:gap-8">
          {PROJECTS.map((project) => (
            <a
              key={project.title}
              href={project.link}
              className="group block rounded-2xl overflow-hidden border transition-all duration-300"
              style={{ background: "#0d1526", borderColor: "rgba(77,255,195,0.1)" }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "rgba(77,255,195,0.32)";
                el.style.boxShadow = "0 0 40px rgba(77,255,195,0.05)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "rgba(77,255,195,0.1)";
                el.style.boxShadow = "none";
              }}
            >
              <div className="flex flex-col sm:grid sm:grid-cols-5">
                {/* Image */}
                <div
                  className="w-full h-44 sm:h-auto sm:col-span-2 overflow-hidden"
                  style={{ background: "#071a35" }}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-80"
                    style={{ transition: "transform 0.6s ease, opacity 0.5s ease" }}
                  />
                </div>

                {/* Content */}
                <div className="sm:col-span-3 p-6 sm:p-7 md:p-8 flex flex-col justify-between gap-4">
                  <div>
                    <div className="flex items-start justify-between gap-4 mb-2 sm:mb-3">
                      <h3
                        className="text-xl sm:text-2xl"
                        style={{ fontFamily: '"DM Serif Display", serif', color: "#e8edf5" }}
                      >
                        {project.title}
                      </h3>
                      <span className="text-xs mt-1.5 shrink-0" style={{ color: "#7a8aaa" }}>
                        {project.year}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: "#7a8aaa" }}>
                      {project.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2.5 py-1 rounded-full"
                          style={{
                            background: "rgba(77,255,195,0.06)",
                            color: "#4dffc3",
                            border: "1px solid rgba(77,255,195,0.15)",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span
                      className="text-xs tracking-wide uppercase shrink-0"
                      style={{ color: "rgba(77,255,195,0.4)" }}
                    >
                      View →
                    </span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
