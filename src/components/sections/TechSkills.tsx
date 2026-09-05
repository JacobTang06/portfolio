interface TechSkillsProps {
  id: string;
}

const SKILL_GROUPS = [
  {
    category: "Languages",
    skills: [
      "Java", "Python", "C++", "SQL", "Kotlin", "Bash", "TypeScript",
    ],
  },
  {
    category: "Frameworks & Tools",
    skills: [
      "Django", "FastAPI", "Spring Boot", "Datadog", "Docker", "Kubernetes", "Jira", "Git/GitHub", "Terraform",
    ],
  },
  {
    category: "Databases",
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

        {/* Resume skill groups */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10 mb-14 sm:mb-18 md:mb-20">
          {SKILL_GROUPS.map((group) => (
            <div key={group.category}>
              <h3
                className="text-xs font-medium tracking-widest uppercase mb-5 sm:mb-6"
                style={{ color: "#4dffc3" }}
              >
                {group.category}
              </h3>
              <div className="flex flex-col gap-4 sm:gap-5">
                {group.skills.map((skill) => (
                  <span key={skill} className="text-sm" style={{ color: "#e8edf5" }}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Technology tag cloud */}
        <div
          className="p-6 sm:p-8 rounded-2xl border"
          style={{ background: "#0d1526", borderColor: "rgba(77,255,195,0.1)" }}
        >
          <p className="text-xs tracking-widest uppercase mb-4 sm:mb-6" style={{ color: "#7a8aaa" }}>
            Full stack
          </p>
          <div className="flex flex-wrap gap-2 sm:gap-2.5">
            {TECHNOLOGY_TAGS.map((tech) => (
              <span
                key={tech}
                className="px-2.5 sm:px-3 py-1.5 rounded-lg text-xs sm:text-sm transition-all duration-200 cursor-default"
                style={{
                  background: "rgba(77,255,195,0.04)",
                  color: "#e8edf5",
                  border: "1px solid rgba(77,255,195,0.1)",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "rgba(77,255,195,0.1)";
                  el.style.borderColor = "rgba(77,255,195,0.3)";
                  el.style.color = "#4dffc3";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "rgba(77,255,195,0.04)";
                  el.style.borderColor = "rgba(77,255,195,0.1)";
                  el.style.color = "#e8edf5";
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
