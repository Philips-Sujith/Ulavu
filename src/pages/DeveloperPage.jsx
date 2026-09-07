import React from "react";
import {
  Code,
  Cloud,
  Terminal,
  Cpu,
  Hammer,
  GraduationCap,
  Sparkles,
  BookOpen,
  Award,
  Laptop
} from "lucide-react";

export default function DeveloperPage() {
  const techInterests = [
    {
      title: "Software Development",
      icon: Code,
      desc: "Building clean, maintainable, user-focused applications with modern web architectures and component design systems."
    },
    {
      title: "Cloud Computing",
      icon: Cloud,
      desc: "Exploring scalable cloud infrastructure, distributed microservices, and reliable deployment workflows."
    },
    {
      title: "Linux",
      icon: Terminal,
      desc: "Deep curiosity for operating systems, command-line environments, kernel foundations, and system-level performance."
    },
    {
      title: "Artificial Intelligence",
      icon: Cpu,
      desc: "Investigating algorithmic intelligence, machine learning applications, and computational models for real-world utility."
    },
    {
      title: "Building & Experimentation",
      icon: Hammer,
      desc: "Transforming conceptual ideas into functional, interactive prototypes that solve tangible social and engineering problems."
    }
  ];

  return (
    <div className="developer-page container">
      {/* Profile Header Hero */}
      <section className="dev-hero card">
        <div className="dev-hero-grid">
          {/* Avatar and Badges */}
          <div className="dev-avatar-box">
            <div className="avatar-monogram">
              <span>SB</span>
            </div>
            <div className="dev-role-badge">
              <Sparkles size={13} />
              <span>Developer & Tech Enthusiast</span>
            </div>
          </div>

          {/* Main Info */}
          <div className="dev-main-info">
            <h1 className="dev-name">Sujith B</h1>

            <div className="academic-badge-row">
              <div className="acad-pill">
                <GraduationCap size={15} />
                <span>Anna University - MIT Campus</span>
              </div>
              <div className="acad-pill">
                <Laptop size={15} />
                <span>Computer Science and Engineering (CSE)</span>
              </div>
              <div className="acad-pill roll-pill">
                <span>Roll No: <strong>2025503560</strong></span>
              </div>
            </div>

            <div className="bio-block">
              <h3 className="bio-heading">About Me</h3>
              <p className="bio-text">
                "I’m a curious and driven tech enthusiast who enjoys learning, building, and experimenting with technology. I’m especially interested in software development, cloud computing, Linux, and AI, and I like turning ideas into practical projects while continuously improving my skills."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Technical Focus / Interests */}
      <section className="dev-section">
        <div className="dev-section-header">
          <span className="dev-eyebrow">Technical Exploration</span>
          <h2 className="dev-section-title">Core Interests & Learning Focus</h2>
          <p className="dev-section-subtitle">
            Areas of technology where I actively learn, experiment, and turn concepts into working solutions.
          </p>
        </div>

        <div className="interests-grid">
          {techInterests.map((interest, idx) => {
            const Icon = interest.icon;
            return (
              <div key={idx} className="interest-card card card-hover">
                <div className="interest-icon-wrap">
                  <Icon size={24} />
                </div>
                <h3 className="interest-title">{interest.title}</h3>
                <p className="interest-desc">{interest.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Philosophy on Project ULAVU */}
      <section className="philosophy-card card">
        <div className="phil-header">
          <div className="phil-icon">
            <BookOpen size={22} />
          </div>
          <div>
            <h3 className="phil-title">Project Purpose & Motivation</h3>
            <span className="phil-subtitle">Why ULAVU was built as a practical prototype</span>
          </div>
        </div>
        <p className="phil-text">
          ULAVU was conceived as an impactful demonstration of applying software engineering principles to a vital real-world sector: agriculture.
          Rather than building a decorative static interface, the platform implements genuine multi-factor matching algorithms,
          responsive dual-sided dashboards, and a future-ready modular architecture designed around true rural accessibility.
        </p>
      </section>

      <style>{`
        .developer-page {
          padding-top: 2.5rem;
          padding-bottom: 4rem;
          display: flex;
          flex-direction: column;
          gap: 3.5rem;
        }
        .dev-hero {
          padding: 3rem;
          border-radius: var(--radius-xl);
          background: linear-gradient(135deg, var(--bg-surface) 0%, var(--bg-surface-subtle) 100%);
        }
        .dev-hero-grid {
          display: grid;
          grid-template-columns: auto 1fr;
          gap: 2.5rem;
          align-items: flex-start;
        }
        .dev-avatar-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }
        .avatar-monogram {
          width: 130px;
          height: 130px;
          border-radius: var(--radius-xl);
          background: linear-gradient(135deg, var(--color-primary-700) 0%, var(--color-primary-900) 100%);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-heading);
          font-size: 3rem;
          font-weight: 800;
          letter-spacing: -0.02em;
          box-shadow: 0 8px 24px rgba(27, 67, 50, 0.25);
        }
        .dev-role-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          background: var(--color-primary-100);
          color: var(--color-primary-800);
          font-size: 0.75rem;
          font-weight: 700;
          padding: 0.25rem 0.75rem;
          border-radius: var(--radius-full);
          text-align: center;
        }
        .dev-main-info {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .dev-name {
          font-size: 2.75rem;
          color: var(--color-primary-900);
          line-height: 1.1;
        }
        .academic-badge-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-wrap: wrap;
        }
        .acad-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: var(--bg-surface);
          border: 1px solid var(--border-medium);
          padding: 0.4rem 0.85rem;
          border-radius: var(--radius-full);
          font-size: 0.85rem;
          color: var(--text-secondary);
          font-weight: 500;
        }
        .acad-pill svg {
          color: var(--color-primary-600);
        }
        .roll-pill {
          background: var(--color-accent-50);
          border-color: var(--color-accent-100);
          color: var(--color-accent-900);
        }
        .bio-block {
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-lg);
          padding: 1.5rem;
          margin-top: 0.5rem;
        }
        .bio-heading {
          font-size: 0.95rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--text-muted);
          margin-bottom: 0.5rem;
        }
        .bio-text {
          font-size: 1.05rem;
          line-height: 1.65;
          color: var(--text-main);
          font-style: italic;
        }
        .dev-section-header {
          margin-bottom: 2rem;
        }
        .dev-eyebrow {
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--color-accent-600);
          display: block;
          margin-bottom: 0.35rem;
        }
        .dev-section-title {
          font-size: 2rem;
          color: var(--color-primary-900);
          margin-bottom: 0.5rem;
        }
        .dev-section-subtitle {
          font-size: 1rem;
          color: var(--text-secondary);
        }
        .interests-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }
        .interest-card {
          padding: 2rem 1.5rem;
          border-radius: var(--radius-xl);
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .interest-icon-wrap {
          width: 50px;
          height: 50px;
          border-radius: var(--radius-md);
          background: var(--color-primary-50);
          color: var(--color-primary-600);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 0.5rem;
          transition: all var(--transition-normal);
        }
        .interest-card:hover .interest-icon-wrap {
          background: var(--color-primary-600);
          color: #ffffff;
          transform: scale(1.05);
        }
        .interest-title {
          font-size: 1.25rem;
          color: var(--color-primary-900);
        }
        .interest-desc {
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.55;
        }
        .philosophy-card {
          padding: 2.25rem;
          border-radius: var(--radius-xl);
          background: var(--bg-surface);
        }
        .phil-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
        }
        .phil-icon {
          width: 44px;
          height: 44px;
          border-radius: var(--radius-md);
          background: var(--color-primary-100);
          color: var(--color-primary-700);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .phil-title {
          font-size: 1.35rem;
          color: var(--color-primary-900);
        }
        .phil-subtitle {
          font-size: 0.85rem;
          color: var(--text-muted);
        }
        .phil-text {
          font-size: 1rem;
          color: var(--text-secondary);
          line-height: 1.65;
        }

        @media (max-width: 960px) {
          .dev-hero-grid {
            grid-template-columns: 1fr;
            text-align: center;
            align-items: center;
          }
          .dev-avatar-box {
            margin: 0 auto;
          }
          .academic-badge-row {
            justify-content: center;
          }
          .interests-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 600px) {
          .interests-grid {
            grid-template-columns: 1fr;
          }
          .dev-hero {
            padding: 1.75rem;
          }
        }
      `}</style>
    </div>
  );
}
