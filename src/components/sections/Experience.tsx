interface ExperienceProps {
  id: string;
}

const JOBS = [
  {
    company: "ResMed",
    role: "Software Engineer Intern",
    period: "May 2025 — July 2026",
    location: "San Diego, CA",
    description:
      "Built backend services and test infrastructure for remote patient-device systems, with an emphasis on reliability, observability, and safe schema evolution.",
    highlights: ["Java", "Spring Boot", "MongoDB", "Kubernetes", "Terraform", "Datadog", "AWS"],
  },
  {
    company: "BarBuddy",
    role: "Founding Backend Engineer",
    period: "Feb 2025 — May 2025",
    location: "San Diego, CA",
    description:
      "Built the backend for a mobile social discovery app in a three-person team, launching REST APIs that helped users discover and coordinate bar outings.",
    highlights: ["Python", "Django REST Framework", "PostgreSQL", "REST APIs", "Docker"],
  },
  {
    company: "Natera",
    role: "Information Technology Intern",
    period: "May 2024 — Aug 2024",
    location: "San Carlos, CA",
    description:
      "Configured more than 200 laptops for new hires and analyzed over 1,000 Jira tickets with SQL queries against Snowflake data.",
    highlights: ["SQL", "Snowflake", "Jira", "IT Operations"],
  },
];

export default function Experience({ id }: ExperienceProps) {
  return (
    <section id={id} className="py-16 sm:py-20 md:py-24 px-5 sm:px-8 md:px-16 lg:px-32">
      <div className="max-w-5xl mx-auto w-full">
        <div className="mb-10 sm:mb-14 md:mb-16">
          <p className="text-xs tracking-widest uppercase mb-3" style={{ color: "#4dffc3" }}>
            02 — Experience
          </p>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl leading-tight"
            style={{ fontFamily: '"DM Serif Display", serif', color: "#e8edf5" }}
          >
            Where I've{" "}
            <em style={{ color: "#4dffc3" }}>worked</em>
          </h2>
        </div>

        <div className="relative">
          {/* Vertical timeline line — desktop only */}
          <div
            className="absolute left-0 top-2 bottom-2 w-px hidden md:block"
            style={{
              background:
                "linear-gradient(to bottom, rgba(77,255,195,0.35), rgba(77,255,195,0.04))",
            }}
          />

          <div className="flex flex-col">
            {JOBS.map((job) => (
              <div key={job.company} className="group relative md:pl-10 lg:pl-12">
                {/* Timeline dot */}
                <div
                  className="absolute left-0 top-9 -translate-x-1/2 w-2.5 h-2.5 rounded-full border hidden md:block transition-colors duration-300"
                  style={{ background: "#050810", borderColor: "rgba(77,255,195,0.45)" }}
                />

                <div
                  className="p-6 sm:p-8 rounded-2xl border mb-4 transition-all duration-300"
                  style={{ background: "transparent", borderColor: "rgba(77,255,195,0.08)" }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = "rgba(13,21,38,0.6)";
                    el.style.borderColor = "rgba(77,255,195,0.2)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = "transparent";
                    el.style.borderColor = "rgba(77,255,195,0.08)";
                  }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 sm:gap-4 mb-3 sm:mb-4">
                    <div>
                      <h3
                        className="text-lg sm:text-xl mb-0.5"
                        style={{ fontFamily: '"DM Serif Display", serif', color: "#e8edf5" }}
                      >
                        {job.role}
                      </h3>
                      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                        <span className="text-sm font-medium" style={{ color: "#4dffc3" }}>
                          {job.company}
                        </span>
                        <span style={{ color: "rgba(77,255,195,0.3)" }}>·</span>
                        <span className="text-sm" style={{ color: "#7a8aaa" }}>
                          {job.location}
                        </span>
                      </div>
                    </div>
                    <span
                      className="text-xs tracking-wide shrink-0"
                      style={{ color: "#7a8aaa" }}
                    >
                      {job.period}
                    </span>
                  </div>

                  <p className="text-sm leading-relaxed mb-4 sm:mb-5" style={{ color: "#7a8aaa" }}>
                    {job.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {job.highlights.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2.5 py-1 rounded-full"
                        style={{
                          background: "rgba(77,255,195,0.05)",
                          color: "rgba(77,255,195,0.7)",
                          border: "1px solid rgba(77,255,195,0.12)",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
