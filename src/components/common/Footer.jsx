import React from "react";
import { Sprout, Heart, ShieldCheck, BarChart3, PhoneCall, ArrowUpRight } from "lucide-react";

export default function Footer({ setActivePage }) {
  const handleNav = (page) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="site-footer">
      <div className="container footer-container">
        <div className="footer-grid">
          {/* Col 1: Brand & Mission */}
          <div className="footer-col brand-col">
            <div className="footer-brand" onClick={() => handleNav("home")}>
              <div className="footer-logo-icon">
                <Sprout size={20} />
              </div>
              <span className="footer-brand-title">ULAVU</span>
            </div>
            <p className="footer-mission">
              Connecting farmers directly with commercial buyers and retailers. Empowering Indian agriculture with fair pricing, zero unnecessary middlemen, and accessible technology.
            </p>
            <div className="developer-tag">
              <span>Developed by</span>
              <strong>Sujith B</strong>
              <span className="tag-muted">• Anna University - MIT Campus</span>
            </div>
          </div>

          {/* Col 2: Active Modules (1-3) */}
          <div className="footer-col">
            <h4 className="footer-heading">Active Modules (Prototype)</h4>
            <ul className="footer-links">
              <li>
                <button onClick={() => handleNav("farmer")} className="footer-link">
                  Module 1: Farmer Produce Management
                </button>
              </li>
              <li>
                <button onClick={() => handleNav("retailer")} className="footer-link">
                  Module 2: Retailer Procurement Hub
                </button>
              </li>
              <li>
                <button onClick={() => handleNav("marketplace")} className="footer-link">
                  Module 3: Smart Matching Engine
                </button>
              </li>
              <li>
                <button onClick={() => handleNav("project-info")} className="footer-link">
                  Architecture & Impact Overview
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Roadmap Modules (4-6) */}
          <div className="footer-col">
            <h4 className="footer-heading">Architecture Roadmap</h4>
            <ul className="footer-roadmap-list">
              <li className="roadmap-item">
                <ShieldCheck size={16} className="roadmap-icon" />
                <div>
                  <span className="roadmap-title">Module 4: Trust & Verification</span>
                  <span className="roadmap-badge">Phase 2</span>
                </div>
              </li>
              <li className="roadmap-item">
                <BarChart3 size={16} className="roadmap-icon" />
                <div>
                  <span className="roadmap-title">Module 5: Market Intelligence</span>
                  <span className="roadmap-badge">Phase 2</span>
                </div>
              </li>
              <li className="roadmap-item">
                <PhoneCall size={16} className="roadmap-icon" />
                <div>
                  <span className="roadmap-title">Module 6: Voice & SMS Layer</span>
                  <span className="roadmap-badge">Accessibility</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Col 4: About Developer & Tech */}
          <div className="footer-col">
            <h4 className="footer-heading">Creator & College</h4>
            <p className="footer-desc-sm">
              Dept. of Computer Science & Engineering (CSE)<br />
              Anna University - MIT Campus<br />
              Roll No: <strong>2025503560</strong>
            </p>
            <button
              onClick={() => handleNav("developer")}
              className="btn btn-outline btn-sm developer-btn"
            >
              <span>View Developer Profile</span>
              <ArrowUpRight size={14} />
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} ULAVU. Direct Farmer-to-Buyer Agricultural Platform.</p>
          <div className="footer-bottom-notes">
            <span>Social Impact Prototype</span>
            <span>•</span>
            <span>Tamil Nadu Agricultural Hub</span>
          </div>
        </div>
      </div>

      <style>{`
        .site-footer {
          background-color: var(--color-primary-900);
          color: #e5ede7;
          padding: 4rem 0 2rem;
          margin-top: 5rem;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }
        .footer-grid {
          display: grid;
          grid-template-columns: 1.6fr 1.2fr 1.2fr 1fr;
          gap: 2.5rem;
          margin-bottom: 3.5rem;
        }
        .footer-brand {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          cursor: pointer;
          margin-bottom: 1rem;
        }
        .footer-logo-icon {
          width: 34px;
          height: 34px;
          border-radius: var(--radius-sm);
          background-color: var(--color-primary-400);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-primary-900);
        }
        .footer-brand-title {
          font-family: var(--font-heading);
          font-size: 1.4rem;
          font-weight: 800;
          color: #ffffff;
          letter-spacing: -0.02em;
        }
        .footer-mission {
          color: #a8b8ae;
          font-size: 0.9rem;
          line-height: 1.6;
          margin-bottom: 1.25rem;
          max-width: 320px;
        }
        .developer-tag {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.8rem;
          color: #92a498;
          background: rgba(255, 255, 255, 0.05);
          padding: 0.4rem 0.75rem;
          border-radius: var(--radius-full);
          width: fit-content;
        }
        .developer-tag strong {
          color: #ffffff;
        }
        .tag-muted {
          color: #7d9084;
        }
        .footer-heading {
          color: #ffffff;
          font-size: 0.95rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 1.25rem;
        }
        .footer-links {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .footer-link {
          background: none;
          border: none;
          color: #b7c6bc;
          font-size: 0.88rem;
          padding: 0;
          cursor: pointer;
          text-align: left;
          transition: color var(--transition-fast);
        }
        .footer-link:hover {
          color: var(--color-accent-400);
        }
        .footer-roadmap-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }
        .roadmap-item {
          display: flex;
          align-items: flex-start;
          gap: 0.6rem;
        }
        .roadmap-icon {
          color: var(--color-primary-300);
          margin-top: 2px;
          flex-shrink: 0;
        }
        .roadmap-title {
          display: block;
          font-size: 0.85rem;
          color: #d1ded5;
        }
        .roadmap-badge {
          display: inline-block;
          font-size: 0.68rem;
          font-weight: 700;
          text-transform: uppercase;
          background: rgba(217, 119, 6, 0.2);
          color: var(--color-accent-400);
          padding: 0.1rem 0.45rem;
          border-radius: var(--radius-full);
          margin-top: 2px;
        }
        .footer-desc-sm {
          color: #a8b8ae;
          font-size: 0.85rem;
          line-height: 1.5;
          margin-bottom: 1.25rem;
        }
        .developer-btn {
          color: #ffffff;
          border-color: rgba(255, 255, 255, 0.2);
        }
        .developer-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          color: #ffffff;
        }
        .footer-bottom {
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          padding-top: 1.75rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.82rem;
          color: #798b80;
        }
        .footer-bottom-notes {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        @media (max-width: 900px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
          }
        }
        @media (max-width: 600px) {
          .footer-grid {
            grid-template-columns: 1fr;
          }
          .footer-bottom {
            flex-direction: column;
            gap: 0.75rem;
            text-align: center;
          }
        }
      `}</style>
    </footer>
  );
}
