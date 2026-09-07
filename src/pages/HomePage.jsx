import React from "react";
import { Tractor, Store, Phone, ArrowRight, CheckCircle2, Leaf, Shield } from "lucide-react";
import CropCard from "../components/cards/CropCard";

export default function HomePage({ setActivePage, produceList }) {
  const handleNav = (page) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const recentProduce = produceList.slice(0, 3);

  return (
    <div className="clean-homepage">
      {/* ================= HERO SECTION ================= */}
      <section className="hero-section">
        <div className="container hero-container">
          <div className="hero-badge">
            <Leaf size={14} className="leaf-icon" />
            <span>Direct Farmer-to-Buyer Marketplace</span>
          </div>

          <h1 className="hero-heading">ULAVU</h1>

          <p className="hero-headline">
            Connecting farmers directly with buyers.
          </p>

          <p className="hero-description">
            A simple digital platform that helps farmers list their produce and lets commercial retailers call them directly without unnecessary middlemen.
          </p>

          <div className="hero-cta-group">
            <button
              onClick={() => handleNav("farmer")}
              className="btn btn-primary btn-lg"
            >
              <Tractor size={20} />
              <span>Farmer: Post Produce</span>
            </button>

            <button
              onClick={() => handleNav("retailer")}
              className="btn btn-secondary btn-lg"
            >
              <Store size={20} />
              <span>Retailer: Find Produce</span>
            </button>
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS (SIMPLE 3 STEPS) ================= */}
      <section className="how-it-works-section">
        <div className="container">
          <div className="section-header-clean">
            <span className="eyebrow-tag">Simple 3 Steps</span>
            <h2 className="clean-section-title">How ULAVU Works</h2>
            <p className="clean-section-subtitle">
              Straightforward and transparent for every farmer and buyer.
            </p>
          </div>

          <div className="three-steps-grid">
            <div className="step-box card">
              <div className="step-num">01</div>
              <h3 className="step-head">Farmer Posts Produce</h3>
              <p className="step-text">
                Enter your name, mobile number, location, and the vegetable or fruit with quantity in <strong>kg</strong> or <strong>bags</strong>.
              </p>
            </div>

            <div className="step-box card">
              <div className="step-num">02</div>
              <h3 className="step-head">Appears for Retailers</h3>
              <p className="step-text">
                Your produce listing instantly displays in the retailer window for supermarkets, wholesalers, and local vendors.
              </p>
            </div>

            <div className="step-box card">
              <div className="step-num">03</div>
              <h3 className="step-head">Direct Phone Call</h3>
              <p className="step-text">
                The retailer directly calls your mobile number to negotiate delivery and complete the purchase. Zero middleman cuts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= RECENT PRODUCE PREVIEW ================= */}
      <section className="recent-produce-section">
        <div className="container">
          <div className="recent-header-row">
            <div>
              <span className="eyebrow-tag">Live Market</span>
              <h2 className="clean-section-title">Fresh Produce Available Now</h2>
            </div>
            <button
              onClick={() => handleNav("retailer")}
              className="btn btn-secondary"
            >
              <span>View All Produce</span>
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="recent-grid">
            {recentProduce.map((item) => (
              <CropCard
                key={item.id}
                produce={item}
                isRetailerView={true}
              />
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .clean-homepage {
          display: flex;
          flex-direction: column;
          gap: 4.5rem;
          padding-bottom: 3rem;
        }
        .hero-section {
          padding: 4.5rem 0 2rem;
          text-align: center;
        }
        .hero-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          max-width: 800px;
          margin: 0 auto;
        }
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background-color: var(--color-primary-100);
          color: var(--color-primary-800);
          font-size: 0.85rem;
          font-weight: 700;
          padding: 0.35rem 1rem;
          border-radius: var(--radius-full);
          margin-bottom: 1.5rem;
        }
        .leaf-icon {
          color: var(--color-primary-600);
        }
        .hero-heading {
          font-size: clamp(3.5rem, 8vw, 5.5rem);
          font-weight: 800;
          color: var(--color-primary-900);
          letter-spacing: -0.04em;
          line-height: 1;
          margin-bottom: 1rem;
        }
        .hero-headline {
          font-family: var(--font-heading);
          font-size: clamp(1.35rem, 3vw, 1.85rem);
          font-weight: 600;
          color: var(--color-primary-600);
          margin-bottom: 1.25rem;
        }
        .hero-description {
          font-size: 1.15rem;
          color: var(--text-secondary);
          line-height: 1.6;
          max-width: 650px;
          margin-bottom: 2.5rem;
        }
        .hero-cta-group {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          flex-wrap: wrap;
          justify-content: center;
        }
        .section-header-clean {
          text-align: center;
          margin-bottom: 3rem;
        }
        .eyebrow-tag {
          font-size: 0.78rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--color-accent-600);
          display: block;
          margin-bottom: 0.4rem;
        }
        .clean-section-title {
          font-size: 2.25rem;
          color: var(--color-primary-900);
          margin-bottom: 0.5rem;
        }
        .clean-section-subtitle {
          font-size: 1.05rem;
          color: var(--text-secondary);
        }
        .three-steps-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }
        .step-box {
          padding: 2.25rem 2rem;
          border-radius: var(--radius-xl);
          background: #ffffff;
          border: 1px solid var(--border-medium);
        }
        .step-num {
          font-family: var(--font-heading);
          font-size: 2.5rem;
          font-weight: 800;
          color: var(--color-primary-300);
          line-height: 1;
          margin-bottom: 1.25rem;
        }
        .step-head {
          font-size: 1.3rem;
          color: var(--color-primary-900);
          margin-bottom: 0.75rem;
        }
        .step-text {
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }
        .recent-header-row {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 2rem;
          flex-wrap: wrap;
          gap: 1rem;
        }
        .recent-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }
        @media (max-width: 960px) {
          .three-steps-grid, .recent-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
