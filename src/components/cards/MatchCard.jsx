import React from "react";
import { ArrowRight, MapPin, Sparkles, CheckCircle2, UserCheck, ShieldCheck } from "lucide-react";
import MatchScore from "../common/MatchScore";

export default function MatchCard({
  match,
  onOpenDetails,
  onInitiateDeal
}) {
  const { produce, requirement, matchScore, matchDetails } = match;

  return (
    <div className="match-card card card-hover">
      {/* Top Bar: Match Score & Crop */}
      <div className="match-card-top">
        <div className="match-crop-tag">
          <span className="crop-emoji">🌾</span>
          <span className="crop-title-bold">{produce.crop}</span>
          <span className="deal-indicator">Direct Pairing</span>
        </div>

        <MatchScore
          score={matchScore}
          breakdown={matchDetails?.breakdown}
          reasons={matchDetails?.reasons}
          showDetails={false}
        />
      </div>

      {/* Two Column Visual Comparison: Farmer Offer vs Buyer Requirement */}
      <div className="match-comparison-grid">
        {/* Left Column: Farmer */}
        <div className="party-box farmer-box">
          <div className="party-badge farmer-badge">
            <span>Farmer Offer</span>
          </div>
          <h4 className="party-name">{produce.farmerName}</h4>
          <div className="party-location">
            <MapPin size={13} />
            <span>{produce.village ? `${produce.village}, ` : ""}{produce.district}</span>
          </div>

          <div className="party-deal-metric">
            <div className="metric-row">
              <span className="m-label">Volume:</span>
              <strong className="m-val">{produce.quantity} {produce.unit}</strong>
            </div>
            <div className="metric-row">
              <span className="m-label">Price:</span>
              <strong className="m-val price-text">₹{produce.expectedPrice}/{produce.unit}</strong>
            </div>
          </div>
        </div>

        {/* Center Connection Arrow */}
        <div className="connector-indicator">
          <div className="connector-circle">
            <ArrowRight size={16} />
          </div>
        </div>

        {/* Right Column: Buyer / Retailer */}
        <div className="party-box buyer-box">
          <div className="party-badge buyer-badge">
            <span>Buyer Need</span>
          </div>
          <h4 className="party-name">{requirement.businessName}</h4>
          <div className="party-location">
            <MapPin size={13} />
            <span>{requirement.preferredLocation || requirement.preferredDistrict}</span>
          </div>

          <div className="party-deal-metric">
            <div className="metric-row">
              <span className="m-label">Demand:</span>
              <strong className="m-val">{requirement.quantity} {requirement.unit}</strong>
            </div>
            <div className="metric-row">
              <span className="m-label">Budget:</span>
              <strong className="m-val budget-text">₹{requirement.minBudget}–₹{requirement.maxBudget}/{requirement.unit}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Intelligent Match Explanation */}
      <div className="match-explanation-box">
        <Sparkles size={16} className="sparkle-icon" />
        <p className="explanation-text">
          {matchDetails?.summaryExplanation || "Crop matches, quantity is compatible, and location aligns with sourcing radius."}
        </p>
      </div>

      {/* Card Actions */}
      <div className="match-card-actions">
        <button
          onClick={() => onOpenDetails(match)}
          className="btn btn-secondary btn-sm"
        >
          <span>View Compatibility Breakdown</span>
        </button>

        <button
          onClick={() => onInitiateDeal(match)}
          className="btn btn-primary btn-sm btn-deal"
        >
          <span>Initiate Deal</span>
          <ArrowRight size={14} />
        </button>
      </div>

      <style>{`
        .match-card {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          border-radius: var(--radius-xl);
          padding: 1.5rem;
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
        }
        .match-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 0.75rem;
          border-bottom: 1px solid var(--border-subtle);
        }
        .match-crop-tag {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .crop-emoji {
          font-size: 1.2rem;
        }
        .crop-title-bold {
          font-family: var(--font-heading);
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--color-primary-900);
        }
        .deal-indicator {
          font-size: 0.75rem;
          background-color: var(--color-primary-50);
          color: var(--color-primary-700);
          padding: 0.15rem 0.5rem;
          border-radius: var(--radius-full);
          font-weight: 600;
        }
        .match-comparison-grid {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          gap: 1rem;
        }
        .party-box {
          background: var(--bg-surface-subtle);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }
        .party-badge {
          display: inline-block;
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          padding: 0.1rem 0.5rem;
          border-radius: var(--radius-sm);
          width: fit-content;
        }
        .farmer-badge {
          background: var(--color-primary-100);
          color: var(--color-primary-800);
        }
        .buyer-badge {
          background: var(--color-accent-100);
          color: var(--color-accent-800);
        }
        .party-name {
          font-size: 1.05rem;
          color: var(--color-primary-900);
          font-weight: 700;
          margin-top: 2px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .party-location {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.82rem;
          color: var(--text-muted);
        }
        .party-deal-metric {
          margin-top: 0.5rem;
          padding-top: 0.5rem;
          border-top: 1px solid var(--border-subtle);
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        .metric-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.82rem;
        }
        .m-label {
          color: var(--text-muted);
        }
        .m-val {
          color: var(--text-main);
        }
        .price-text {
          color: var(--color-primary-600);
        }
        .budget-text {
          color: var(--color-accent-700);
        }
        .connector-indicator {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .connector-circle {
          width: 34px;
          height: 34px;
          border-radius: var(--radius-full);
          background: var(--bg-surface);
          border: 1px solid var(--border-medium);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-primary-600);
          box-shadow: var(--shadow-xs);
        }
        .match-explanation-box {
          display: flex;
          align-items: flex-start;
          gap: 0.6rem;
          background: var(--color-primary-50);
          border: 1px solid var(--color-primary-100);
          padding: 0.75rem 1rem;
          border-radius: var(--radius-md);
        }
        .sparkle-icon {
          color: var(--color-primary-600);
          margin-top: 2px;
          flex-shrink: 0;
        }
        .explanation-text {
          font-size: 0.85rem;
          color: var(--color-primary-900);
          line-height: 1.45;
          margin: 0;
        }
        .match-card-actions {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.75rem;
          padding-top: 0.5rem;
        }
        .btn-deal {
          background-color: var(--color-primary-700);
        }
        @media (max-width: 640px) {
          .match-comparison-grid {
            grid-template-columns: 1fr;
            gap: 0.75rem;
          }
          .connector-indicator {
            transform: rotate(90deg);
          }
          .match-card-actions {
            flex-direction: column;
            gap: 0.5rem;
          }
          .match-card-actions button {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
}
