interface TechSkillsProps {
  id: string;
}

const SKILL_GROUPS = [
  {
    index: "01",
    category: "Languages",
    accent: "#4dffc3",
    skills: [
      "Java", "Python", "C++", "SQL", "Kotlin", "Bash", "TypeScript",
    ],
  },
  {
    index: "02",
    category: "Frameworks & Tools",
    accent: "#ff6b4a",
    skills: [
      "Django", "FastAPI", "Spring Boot", "Datadog", "Docker", "Kubernetes", "Jira", "Git/GitHub", "Terraform",
    ],
  },
  {
    index: "03",
    category: "Databases",
    accent: "#8fa7ff",
    skills: [
      "MongoDB", "PostgreSQL", "SQLite",
    ],
  },
];

const TECHNOLOGY_TAGS = ["Java", "Python", "C++", "SQL", "Kotlin", "Bash", "TypeScript", "Django", "FastAPI", "Spring Boot", "Datadog", "Docker", "Kubernetes", "Jira", "Git/GitHub", "Terraform", "MongoDB", "PostgreSQL", "SQLite"];

export default function TechSkills({ id }: TechSkillsProps) {
  return (
    <section id={id} className="py-16 sm:py-20 md:py-24 px-5 sm:px-8 md:px-16 lg:px-32">
      <div className="max-w-5xl mx-auto w-full">
        <div className="mb-10 sm:mb-14 md:mb-16">
          <p className="text-xs tracking-widest uppercase mb-3" style={{ color: "#4dffc3" }}>
            04 — Skills & Technology
          </p>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl leading-tight"
            style={{ fontFamily: '"DM Serif Display", serif', color: "#e8edf5" }}
          >
            What{" "}
            <em style={{ color: "#4dffc3" }}>I use</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
          {SKILL_GROUPS.map((group) => (
            <div
              key={group.category}
              className="group relative overflow-hidden min-h-64 p-5 sm:p-6 border transition-transform duration-300 hover:-translate-y-1"
              style={{
                background: "linear-gradient(145deg, rgba(13,21,38,0.98), rgba(8,14,27,0.98))",
                borderColor: `${group.accent}26`,
              }}
            >
              <div
                className="absolute -right-8 -top-10 text-[8rem] leading-none font-light opacity-[0.035] select-none"
                style={{ color: group.accent }}
                aria-hidden="true"
              >
                {group.index}
              </div>
              <div className="relative flex h-full flex-col">
                <div className="flex items-start justify-between gap-4 mb-8">
                  <div>
                    <h3 className="text-lg sm:text-xl" style={{ fontFamily: '"DM Serif Display", serif', color: "#e8edf5" }}>
                      {group.category}
                    </h3>
                  </div>
                  <span className="text-xs tabular-nums" style={{ color: "#7a8aaa" }}>
                    {group.index}
                  </span>
                </div>
                <div className="mt-auto flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1.5 text-xs transition-colors duration-200"
                      style={{
                        color: "#cbd4e5",
                        background: `${group.accent}0d`,
                        border: `1px solid ${group.accent}20`,
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-3 sm:mt-4 border" style={{ background: "#0d1526", borderColor: "rgba(77,255,195,0.1)" }}>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 px-5 py-4 sm:px-6 border-b" style={{ borderColor: "rgba(77,255,195,0.08)" }}>
            <span className="text-[0.65rem] tracking-[0.24em] uppercase" style={{ color: "#4dffc3" }}>
              Full stack
            </span>
            <span className="hidden sm:block h-px flex-1" style={{ background: "rgba(77,255,195,0.12)" }} />
            <span className="text-xs" style={{ color: "#7a8aaa" }}></span>
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-3 px-5 py-5 sm:px-6">
            {TECHNOLOGY_TAGS.map((tech, index) => (
              <span key={tech} className="inline-flex items-center gap-2 text-xs sm:text-sm" style={{ color: "#aebbd1" }}>
                <span className="h-1 w-1 rounded-full" style={{ background: index % 3 === 1 ? "#ff6b4a" : "#4dffc3" }} />
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
