interface LetsConnectProps {
  id: string;
}

const LINKS = [
  {
    label: "GitHub",
    href: "https://github.com/JacobTang06",
    description: "See what I'm building",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/jacob-tang-75071122a/",
    description: "Let's be professional",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Email",
    href: "mailto:jake.tang@gmail.com",
    description: "For serious conversations",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
        <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    label: "Resume",
    href: "/JacobTangResume.pdf",
    description: "View my experience",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

export default function LetsConnect({ id }: LetsConnectProps) {
  return (
    <section id={id} className="py-16 sm:py-20 md:py-24 px-5 sm:px-8 md:px-16 lg:px-32">
      <div className="max-w-5xl mx-auto w-full">
        <div className="mb-10 sm:mb-14 md:mb-16">
          <p className="text-xs tracking-widest uppercase mb-3" style={{ color: "#4dffc3" }}>
            05 — Let's Connect
          </p>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl leading-tight mb-4 sm:mb-6"
            style={{ fontFamily: '"DM Serif Display", serif', color: "#e8edf5" }}
          >
            Questions? Feel free{" "}
            <em style={{ color: "#4dffc3" }}>to reach out</em>
            !
          </h2>
          <p
            className="text-sm sm:text-base leading-relaxed max-w-xl"
            style={{ color: "#7a8aaa" }}
          >
            Whether you want to collaborate on a project, talk through an idea, or just say hello,
            my inbox is open.
          </p>
        </div>

        {/* Social links — 2 cols on mobile, 4 on md+ */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col gap-3 p-5 sm:p-6 rounded-2xl border transition-all duration-300"
              style={{ background: "#0d1526", borderColor: "rgba(77,255,195,0.1)" }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "rgba(77,255,195,0.3)";
                el.style.boxShadow = "0 0 30px rgba(77,255,195,0.05)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "rgba(77,255,195,0.1)";
                el.style.boxShadow = "none";
              }}
            >
              <span style={{ color: "#4dffc3" }}>{link.icon}</span>
              <div>
                <div className="text-sm font-medium mb-0.5" style={{ color: "#e8edf5" }}>
                  {link.label}
                </div>
                <div className="text-xs" style={{ color: "#7a8aaa" }}>
                  {link.description}
                </div>
              </div>
            </a>
          ))}
        </div>

        <div
          className="mt-16 sm:mt-20 md:mt-24 pt-6 sm:pt-8 border-t"
          style={{ borderColor: "rgba(77,255,195,0.07)" }}
        >
          <p className="text-xs text-center" style={{ color: "rgba(122,138,170,0.35)" }}>
            Jacob Tang · {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </section>
  );
}
