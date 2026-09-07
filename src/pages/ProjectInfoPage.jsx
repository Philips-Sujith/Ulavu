import React from "react";
import {
  Sprout,
  AlertOctagon,
  CheckCircle2,
  Tractor,
  Store,
  Users,
  Sparkles,
  PhoneCall,
  ShieldCheck,
  BarChart3,
  Layers,
  ArrowRight
} from "lucide-react";

export default function ProjectInfoPage({ setActivePage }) {
  const handleNav = (page) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="project-info-page container">
      {/* Hero / Header */}
      <section className="info-hero card">
        <div className="info-hero-left">
          <span className="info-badge">Platform Vision & Architecture</span>
          <h1 className="info-title">About ULAVU</h1>
          <p className="info-subtitle">
            A social-impact digital bridge connecting agricultural producers directly with commercial buyers,
            engineered around transparent price discovery, smart local matching, and rural accessibility.
          </p>
        </div>
        <div className="info-hero-right">
          <div className="brand-emblem">
            <Sprout size={48} />
            <span>ULAVU</span>
          </div>
        </div>
      </section>

      {/* 1. THE PROBLEM */}
      <section className="info-section">
        <div className="section-title-wrap">
          <div className="section-icon-badge text-danger-bg">
            <AlertOctagon size={20} className="icon-danger" />
          </div>
          <div>
            <span className="eyebrow">The Agricultural Reality</span>
            <h2 className="section-heading">The Structural Problem</h2>
          </div>
        </div>

        <div className="problem-grid">
          <div className="problem-card card">
            <h3 className="card-subheading">Heavy Intermediary Dependency</h3>
            <p>
              Small and medium farmers frequently rely on layers of village brokers, transport aggregators,
              and commission agents at wholesale mandis, which extracts up to 25–40% of the produce margin
              before reaching retail shelves.
            </p>
          </div>

          <div className="problem-card card">
            <h3 className="card-subheading">Fragmented Market Information</h3>
            <p>
              Supply and demand information remains localized and opaque. Farmers are unable to gauge which
              nearby town or retailer has immediate demand for their perishable harvest at fair rates.
            </p>
          </div>

          <div className="problem-card card">
            <h3 className="card-subheading">Weak Bargaining Leverage</h3>
            <p>
              Due to crop perishability and lack of alternative buyer contacts, farmers are forced into distressed
              sales at gate prices dictated entirely by visiting middlemen.
            </p>
          </div>

          <div className="problem-card card">
            <h3 className="card-subheading">Inefficient Demand Matching</h3>
            <p>
              Simultaneously, regional retailers, supermarket chains, and food processors struggle to procure fresh,
              graded produce consistently without relying on long, costly aggregator supply chains.
            </p>
          </div>
        </div>
      </section>

      {/* 2. THE SOLUTION */}
      <section className="info-section">
        <div className="section-title-wrap">
          <div className="section-icon-badge text-primary-bg">
            <CheckCircle2 size={20} className="icon-primary" />
          </div>
          <div>
            <span className="eyebrow">The ULAVU Approach</span>
            <h2 className="section-heading">Our Direct Digital Bridge</h2>
          </div>
        </div>

        <div className="solution-box card">
          <p className="solution-lead">
            ULAVU establishes a direct, bilateral channel between cultivators and commercial buyers.
            Instead of building an impersonal classifieds board, ULAVU pairs precise supply with genuine demand
            using multi-dimensional compatibility algorithms.
          </p>

          <div className="solution-pillars-grid">
            <div className="pillar-item">
              <div className="pillar-num">01</div>
              <h4>Farmer Listings</h4>
              <p>Farmers list active harvest batches, specifying quantity, unit, location, expected rate, and harvest date window.</p>
            </div>

            <div className="pillar-item">
              <div className="pillar-num">02</div>
              <h4>Retailer Demands</h4>
              <p>Commercial buyers post structured procurement requirements with target volumes, price ceilings, and preferred sourcing districts.</p>
            </div>

            <div className="pillar-item">
              <div className="pillar-num">03</div>
              <h4>Smart Compatibility</h4>
              <p>The platform computes real-time match scores across crop variety (40%), quantity (20%), proximity (20%), price (10%), and availability (10%).</p>
            </div>

            <div className="pillar-item">
              <div className="pillar-num">04</div>
              <h4>Direct Trade Initiation</h4>
              <p>Both parties review terms transparently and initiate structured trade agreements with zero middleman commissions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. BENEFITS MATRIX */}
      <section className="info-section">
        <div className="section-title-wrap">
          <div className="section-icon-badge text-accent-bg">
            <Sparkles size={20} className="icon-accent" />
          </div>
          <div>
            <span className="eyebrow">Measurable Value</span>
            <h2 className="section-heading">Platform Benefits</h2>
          </div>
        </div>

        <div className="benefits-grid">
          {/* For Farmers */}
          <div className="benefit-card card">
            <div className="benefit-header">
              <div className="b-icon-wrap farmer-icon-bg">
                <Tractor size={24} />
              </div>
              <h3>For Farmers</h3>
            </div>
            <ul className="benefit-list">
              <li>
                <strong>Expanded Buyer Reach:</strong> Discover multiple competing commercial buyers across neighboring districts.
              </li>
              <li>
                <strong>Reduced Middlemen:</strong> Eliminate broker cuts and retain farm-gate value directly in their pockets.
              </li>
              <li>
                <strong>Clear Price Expectations:</strong> Set expected prices openly based on harvest quality and market realities.
              </li>
              <li>
                <strong>Faster Liquidity:</strong> Secure firm procurement commitments prior to or immediately upon harvesting.
              </li>
            </ul>
          </div>

          {/* For Retailers */}
          <div className="benefit-card card">
            <div className="benefit-header">
              <div className="b-icon-wrap retailer-icon-bg">
                <Store size={24} />
              </div>
              <h3>For Retailers</h3>
            </div>
            <ul className="benefit-list">
              <li>
                <strong>Direct Sourcing:</strong> Source fresh produce directly from verified farmers within preferred districts.
              </li>
              <li>
                <strong>Traceability & Freshness:</strong> Reduce transit time from farm to store, ensuring higher shelf-life and grade.
              </li>
              <li>
                <strong>Predictable Volumes:</strong> Post scheduled procurement needs and match with multi-acre farm capacity.
              </li>
              <li>
                <strong>Cost Optimization:</strong> Avoid multi-tier aggregator markups while offering fair prices to producers.
              </li>
            </ul>
          </div>

          {/* For Society */}
          <div className="benefit-card card">
            <div className="benefit-header">
              <div className="b-icon-wrap society-icon-bg">
                <Users size={24} />
              </div>
              <h3>For Society & Economy</h3>
            </div>
            <ul className="benefit-list">
              <li>
                <strong>Supply Chain Efficiency:</strong> Minimizes transit wastage and post-harvest spoilage of perishables.
              </li>
              <li>
                <strong>Rural Digital Inclusion:</strong> Empowers agricultural communities with practical, accessible software tools.
              </li>
              <li>
                <strong>Equitable Food Ecosystem:</strong> Bridges the economic divide between rural food producers and urban consumption centres.
              </li>
              <li>
                <strong>Transparent Market Discovery:</strong> Levels information asymmetry through open, democratic matching algorithms.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 4. UNIQUENESS & THE FARMER-CENTRIC PHILOSOPHY */}
      <section className="info-section">
        <div className="uniqueness-banner card">
          <div className="uniqueness-content">
            <span className="uniqueness-tag">Core Differentiator</span>
            <h2 className="uniqueness-title">
              "Technology designed around the farmer, rather than forcing every farmer to adapt to technology."
            </h2>
            <p className="uniqueness-desc">
              Most existing agricultural portals fail because they assume every farmer possesses an expensive
              smartphone, high-speed mobile data, and digital fluency.
            </p>
            <p className="uniqueness-desc">
              ULAVU's architectural vision separates the core matching engine from the access layer. While commercial
              retailers use the web interface, the long-term vision incorporates a dedicated <strong>Voice Call & SMS
              Accessibility Layer (Module 6)</strong>, enabling farmers to list crops, state quantities, and receive
              buyer matches over standard telephony in regional languages without needing a smartphone or app installation.
            </p>
            <div className="uniqueness-note">
              <PhoneCall size={16} />
              <span>Module 6 (Voice/SMS) is reserved for Phase 3 and not implemented in this prototype.</span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SIX-MODULE PRODUCT ARCHITECTURE */}
      <section className="info-section">
        <div className="section-title-wrap">
          <div className="section-icon-badge text-primary-bg">
            <Layers size={20} className="icon-primary" />
          </div>
          <div>
            <span className="eyebrow">System Architecture</span>
            <h2 className="section-heading">6-Module Product Framework</h2>
          </div>
        </div>

        <div className="architecture-grid">
          {/* Module 1 */}
          <div className="module-card card active-module-card">
            <div className="module-top">
              <span className="module-num">MODULE 1</span>
              <span className="badge badge-green">Operational</span>
            </div>
            <h3 className="module-title">Farmer Profile & Produce Management</h3>
            <p className="module-desc">
              Farmer onboarding, farm holding details, multi-crop listings, quantity, price expectation, harvest dates, and farmer dashboard.
            </p>
            <button onClick={() => handleNav("farmer")} className="module-nav-btn">
              <span>Explore Module 1</span>
              <ArrowRight size={14} />
            </button>
          </div>

          {/* Module 2 */}
          <div className="module-card card active-module-card">
            <div className="module-top">
              <span className="module-num">MODULE 2</span>
              <span className="badge badge-green">Operational</span>
            </div>
            <h3 className="module-title">Retailer Profile & Requirements</h3>
            <p className="module-desc">
              Commercial retailer onboarding, enterprise profiling, multi-requirement publishing, budget ceilings, and procurement dashboard.
            </p>
            <button onClick={() => handleNav("retailer")} className="module-nav-btn">
              <span>Explore Module 2</span>
              <ArrowRight size={14} />
            </button>
          </div>

          {/* Module 3 */}
          <div className="module-card card active-module-card">
            <div className="module-top">
              <span className="module-num">MODULE 3</span>
              <span className="badge badge-green">Operational</span>
            </div>
            <h3 className="module-title">Smart Matching & Deal Workflow</h3>
            <p className="module-desc">
              5-factor weighted matching algorithm, human-readable compatibility explanations, bilateral match inspection, and prototype deal initiation.
            </p>
            <button onClick={() => handleNav("marketplace")} className="module-nav-btn">
              <span>Explore Module 3</span>
              <ArrowRight size={14} />
            </button>
          </div>

          {/* Module 4 */}
          <div className="module-card card roadmap-module-card">
            <div className="module-top">
              <span className="module-num">MODULE 4</span>
              <span className="badge badge-neutral">Phase 2 Roadmap</span>
            </div>
            <h3 className="module-title">Trust, Verification & Transparency</h3>
            <p className="module-desc">
              Kisan ID integration, FPO credentials, verified retailer audit records, bilateral trade ratings, and historical transaction transparency.
            </p>
            <span className="module-status-tag">Architecture Ready (Hooks Prepared)</span>
          </div>

          {/* Module 5 */}
          <div className="module-card card roadmap-module-card">
            <div className="module-top">
              <span className="module-num">MODULE 5</span>
              <span className="badge badge-neutral">Phase 2 Roadmap</span>
            </div>
            <h3 className="module-title">Analytics, Market Intelligence & Impact</h3>
            <p className="module-desc">
              APMC Mandi benchmark price comparisons, district-level crop demand heatmaps, price trend forecasts, and social impact metrics.
            </p>
            <span className="module-status-tag">Architecture Ready (Data Contracts In Place)</span>
          </div>

          {/* Module 6 */}
          <div className="module-card card voice-module-card">
            <div className="module-top">
              <span className="module-num">MODULE 6</span>
              <span className="badge badge-amber">Accessibility Layer</span>
            </div>
            <h3 className="module-title">Voice Call & SMS Accessibility Layer</h3>
            <p className="module-desc">
              Toll-free IVR phone gateway with regional speech-to-text recognition, automated crop listing from voice calls, and deal notifications via SMS.
            </p>
            <span className="module-status-tag highlight-tag">Critical Long-Term Differentiator</span>
          </div>
        </div>
      </section>

      <style>{`
        .project-info-page {
          padding-top: 2.5rem;
          padding-bottom: 4rem;
          display: flex;
          flex-direction: column;
          gap: 3.5rem;
        }
        .info-hero {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 3rem;
          border-radius: var(--radius-xl);
          background: linear-gradient(135deg, var(--bg-surface) 0%, var(--bg-surface-subtle) 100%);
          gap: 2rem;
        }
        .info-hero-left {
          max-width: 680px;
        }
        .info-badge {
          display: inline-block;
          font-size: 0.78rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--color-primary-700);
          background: var(--color-primary-100);
          padding: 0.25rem 0.75rem;
          border-radius: var(--radius-full);
          margin-bottom: 0.75rem;
        }
        .info-title {
          font-size: 2.75rem;
          color: var(--color-primary-900);
          margin-bottom: 0.75rem;
        }
        .info-subtitle {
          font-size: 1.1rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }
        .info-hero-right {
          flex-shrink: 0;
        }
        .brand-emblem {
          width: 120px;
          height: 120px;
          border-radius: var(--radius-xl);
          background: var(--color-primary-700);
          color: #ffffff;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          box-shadow: var(--shadow-md);
        }
        .brand-emblem span {
          font-family: var(--font-heading);
          font-size: 1.25rem;
          font-weight: 800;
          letter-spacing: -0.02em;
          margin-top: 4px;
        }
        .info-section {
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
        }
        .section-title-wrap {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .section-icon-badge {
          width: 44px;
          height: 44px;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .text-danger-bg { background: var(--color-danger-bg); }
        .text-primary-bg { background: var(--color-primary-50); }
        .text-accent-bg { background: var(--color-accent-50); }
        .icon-danger { color: var(--color-danger); }
        .icon-primary { color: var(--color-primary-600); }
        .icon-accent { color: var(--color-accent-600); }
        .eyebrow {
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--text-muted);
          display: block;
        }
        .section-heading {
          font-size: 1.85rem;
          color: var(--color-primary-900);
          margin-top: 2px;
        }
        .problem-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
        }
        .problem-card {
          padding: 1.75rem;
          border-radius: var(--radius-lg);
        }
        .card-subheading {
          font-size: 1.2rem;
          color: var(--color-primary-900);
          margin-bottom: 0.5rem;
        }
        .problem-card p {
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }
        .solution-box {
          padding: 2.25rem;
          border-radius: var(--radius-xl);
        }
        .solution-lead {
          font-size: 1.125rem;
          color: var(--color-primary-900);
          line-height: 1.6;
          margin-bottom: 2rem;
          max-width: 850px;
        }
        .solution-pillars-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
        }
        .pillar-item {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .pillar-num {
          font-family: var(--font-heading);
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--color-primary-500);
        }
        .pillar-item h4 {
          font-size: 1.05rem;
          color: var(--color-primary-900);
        }
        .pillar-item p {
          font-size: 0.88rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }
        .benefits-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }
        .benefit-card {
          padding: 1.75rem;
          border-radius: var(--radius-xl);
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .benefit-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .b-icon-wrap {
          width: 44px;
          height: 44px;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
        }
        .farmer-icon-bg { background-color: var(--color-primary-600); }
        .retailer-icon-bg { background-color: var(--color-accent-600); }
        .society-icon-bg { background-color: var(--color-info); }
        .benefit-header h3 {
          font-size: 1.25rem;
          color: var(--color-primary-900);
        }
        .benefit-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }
        .benefit-list li {
          font-size: 0.88rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }
        .benefit-list strong {
          color: var(--text-main);
        }
        .uniqueness-banner {
          background: linear-gradient(135deg, var(--color-primary-900) 0%, #173827 100%);
          color: #ffffff;
          padding: 3rem;
          border-radius: var(--radius-xl);
        }
        .uniqueness-tag {
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--color-accent-400);
          display: block;
          margin-bottom: 0.75rem;
        }
        .uniqueness-title {
          font-size: clamp(1.4rem, 2.5vw, 1.9rem);
          color: #ffffff;
          font-weight: 700;
          line-height: 1.35;
          margin-bottom: 1.25rem;
          max-width: 800px;
        }
        .uniqueness-desc {
          color: #c7d8cc;
          font-size: 1rem;
          line-height: 1.6;
          margin-bottom: 1rem;
          max-width: 820px;
        }
        .uniqueness-note {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: #e5ede7;
          padding: 0.5rem 1rem;
          border-radius: var(--radius-full);
          font-size: 0.85rem;
          margin-top: 0.75rem;
        }
        .architecture-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }
        .module-card {
          padding: 1.75rem;
          border-radius: var(--radius-lg);
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }
        .active-module-card {
          border-top: 4px solid var(--color-primary-500);
        }
        .roadmap-module-card {
          border-top: 4px solid var(--border-medium);
          opacity: 0.85;
        }
        .voice-module-card {
          border-top: 4px solid var(--color-accent-600);
          background: var(--color-accent-50);
        }
        .module-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .module-num {
          font-size: 0.75rem;
          font-weight: 800;
          letter-spacing: 0.06em;
          color: var(--text-muted);
        }
        .module-title {
          font-size: 1.15rem;
          color: var(--color-primary-900);
        }
        .module-desc {
          font-size: 0.88rem;
          color: var(--text-secondary);
          line-height: 1.55;
          flex: 1;
        }
        .module-nav-btn {
          background: none;
          border: none;
          color: var(--color-primary-600);
          font-weight: 600;
          font-size: 0.85rem;
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          cursor: pointer;
          padding: 0;
          margin-top: 0.5rem;
        }
        .module-nav-btn:hover {
          color: var(--color-primary-800);
        }
        .module-status-tag {
          font-size: 0.78rem;
          color: var(--text-muted);
          font-weight: 500;
          margin-top: 0.5rem;
        }
        .highlight-tag {
          color: var(--color-accent-700);
          font-weight: 700;
        }

        @media (max-width: 1024px) {
          .benefits-grid, .architecture-grid, .solution-pillars-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .problem-grid {
            grid-template-columns: 1fr;
          }
          .info-hero {
            flex-direction: column;
            align-items: flex-start;
          }
        }
        @media (max-width: 640px) {
          .benefits-grid, .architecture-grid, .solution-pillars-grid {
            grid-template-columns: 1fr;
          }
          .uniqueness-banner {
            padding: 1.75rem;
          }
        }
      `}</style>
    </div>
  );
}
