interface AboutMeProps {
  id: string;
}

export default function AboutMe({ id }: AboutMeProps) {
  return (
    <section id={id} className="py-16 sm:py-20 md:py-24 px-5 sm:px-8 md:px-16 lg:px-32">
      <div className="max-w-5xl mx-auto w-full grid md:grid-cols-2 gap-10 md:gap-16 items-center">
        {/* Photo */}
        <div className="relative group max-w-xs sm:max-w-sm mx-auto md:max-w-none">
          <div
            className="relative overflow-hidden rounded-2xl aspect-[4/5]"
            style={{ background: "#0d1526" }}
          >
            <img
              src="https://cdn.britannica.com/13/77413-050-95217C0B/Golden-Gate-Bridge-San-Francisco.jpg"
              alt="San Francisco"
              className="w-full h-full object-cover opacity-80 group-hover:opacity-90 transition-opacity duration-500"
              style={{ transition: "transform 0.6s ease, opacity 0.5s ease" }}
            />
          </div>
        </div>

        {/* Bio */}
        <div className="flex flex-col gap-5 sm:gap-6">
          <div>
            <p className="text-xs tracking-widest uppercase mb-3" style={{ color: "#4dffc3" }}>
              01 — About Me
            </p>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl leading-tight mb-4 sm:mb-6"
              style={{ fontFamily: '"DM Serif Display", serif', color: "#e8edf5" }}
            >
              Who{" "}
              <em style={{ color: "#4dffc3" }}>I am</em>
            </h2>
          </div>
          <p className="text-sm sm:text-base leading-relaxed" style={{ color: "#7a8aaa" }}>
            I'm a software engineer focused on backend systems, cloud infrastructure, and developer
            tooling. I enjoy turning complex product requirements into reliable APIs, observable
            services, and testable systems.
          </p>
          <p className="text-sm sm:text-base leading-relaxed" style={{ color: "#7a8aaa" }}>
            When I'm not in the editor, I'm exploring new cities, playing sports, or hanging out with friends.
          </p>

          <div
            className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 pt-5 border-t"
            style={{ borderColor: "rgba(77,255,195,0.12)" }}
          >
            <div>
              <div
                className="text-lg sm:text-xl leading-tight font-semibold"
                style={{ color: "#e8edf5", fontFamily: '"DM Serif Display", serif' }}
              >
                San Diego State University
              </div>
              <div className="text-sm mt-1" style={{ color: "#7a8aaa" }}>
                Bachelor of Science in Computer Science
              </div>
            </div>
            <div
              className="self-start sm:self-auto px-4 py-2 rounded-full border"
              style={{
                borderColor: "rgba(77,255,195,0.22)",
                background: "rgba(77,255,195,0.05)",
              }}
            >
              <span className="text-xs uppercase tracking-widest" style={{ color: "#7a8aaa" }}>
                GPA{" "}
              </span>
              <span
                className="text-lg font-semibold"
                style={{ color: "#4dffc3", fontFamily: '"DM Serif Display", serif' }}
              >
                3.9
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
