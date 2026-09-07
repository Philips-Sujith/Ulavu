import React, { useState } from "react";
import { ChevronDown, ChevronUp, Sparkles, CheckCircle2 } from "lucide-react";

export default function MatchScore({ score, breakdown, reasons = [], showDetails = true }) {
  const [expanded, setExpanded] = useState(false);

  // Color logic for score
  let strokeColor = "var(--color-primary-500)";
  let bgColor = "var(--color-primary-50)";
  let textColor = "var(--color-primary-800)";

  if (score >= 90) {
    strokeColor = "var(--color-success)";
    bgColor = "var(--color-success-bg)";
    textColor = "#15803d";
  } else if (score >= 75) {
    strokeColor = "var(--color-primary-500)";
    bgColor = "var(--color-primary-100)";
    textColor = "var(--color-primary-900)";
  } else {
    strokeColor = "var(--color-accent-600)";
    bgColor = "var(--color-accent-100)";
    textColor = "var(--color-accent-900)";
  }

  return (
    <div className="match-score-widget">
      <div className="match-score-header" onClick={() => setExpanded(!expanded)}>
        <div className="score-badge" style={{ backgroundColor: bgColor, color: textColor }}>
          <Sparkles size={14} style={{ color: strokeColor }} />
          <span className="score-number">{score}%</span>
          <span className="score-label">Match</span>
        </div>

        {showDetails && (
          <button
            type="button"
            className="score-toggle-btn"
            aria-label="Toggle match score explanation"
          >
            <span>Algorithm Analysis</span>
            {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
        )}
      </div>

      {showDetails && expanded && (
        <div className="match-score-breakdown">
          <div className="breakdown-title">Compatibility Breakdown</div>
          {breakdown && (
            <div className="factor-bars">
              <div className="factor-row">
                <span className="factor-name">Crop Variety (40% max)</span>
                <div className="factor-bar-track">
                  <div
                    className="factor-bar-fill"
                    style={{ width: `${(breakdown.crop / 40) * 100}%` }}
                  />
                </div>
                <span className="factor-val">{breakdown.crop}/40</span>
              </div>

              <div className="factor-row">
                <span className="factor-name">Quantity Fit (20% max)</span>
                <div className="factor-bar-track">
                  <div
                    className="factor-bar-fill"
                    style={{ width: `${(breakdown.quantity / 20) * 100}%` }}
                  />
                </div>
                <span className="factor-val">{breakdown.quantity}/20</span>
              </div>

              <div className="factor-row">
                <span className="factor-name">Location Proximity (20% max)</span>
                <div className="factor-bar-track">
                  <div
                    className="factor-bar-fill"
                    style={{ width: `${(breakdown.location / 20) * 100}%` }}
                  />
                </div>
                <span className="factor-val">{breakdown.location}/20</span>
              </div>

              <div className="factor-row">
                <span className="factor-name">Price Compatibility (10% max)</span>
                <div className="factor-bar-track">
                  <div
                    className="factor-bar-fill"
                    style={{ width: `${(breakdown.price / 10) * 100}%` }}
                  />
                </div>
                <span className="factor-val">{breakdown.price}/10</span>
              </div>

              <div className="factor-row">
                <span className="factor-name">Harvest Window (10% max)</span>
                <div className="factor-bar-track">
                  <div
                    className="factor-bar-fill"
                    style={{ width: `${(breakdown.availability / 10) * 100}%` }}
                  />
                </div>
                <span className="factor-val">{breakdown.availability}/10</span>
              </div>
            </div>
          )}

          {reasons && reasons.length > 0 && (
            <div className="match-reasons-list">
              {reasons.map((r, i) => (
                <div key={i} className="reason-item">
                  <CheckCircle2 size={13} className="reason-icon" />
                  <span>{r}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <style>{`
        .match-score-widget {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .match-score-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          cursor: pointer;
          user-select: none;
        }
        .score-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.35rem 0.8rem;
          border-radius: var(--radius-full);
          font-weight: 700;
          font-size: 0.95rem;
        }
        .score-number {
          font-family: var(--font-heading);
          font-size: 1.05rem;
        }
        .score-label {
          font-size: 0.78rem;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          opacity: 0.85;
        }
        .score-toggle-btn {
          background: none;
          border: none;
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          font-size: 0.78rem;
          font-weight: 600;
          color: var(--color-primary-600);
          cursor: pointer;
        }
        .score-toggle-btn:hover {
          color: var(--color-primary-800);
        }
        .match-score-breakdown {
          background: var(--bg-surface-subtle);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 0.85rem 1rem;
          animation: slideDown 150ms ease-out;
        }
        .breakdown-title {
          font-size: 0.78rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--text-muted);
          margin-bottom: 0.65rem;
        }
        .factor-bars {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          margin-bottom: 0.75rem;
        }
        .factor-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.78rem;
        }
        .factor-name {
          width: 170px;
          color: var(--text-secondary);
          flex-shrink: 0;
        }
        .factor-bar-track {
          flex: 1;
          height: 6px;
          background: var(--border-medium);
          border-radius: var(--radius-full);
          overflow: hidden;
        }
        .factor-bar-fill {
          height: 100%;
          background: var(--color-primary-500);
          border-radius: var(--radius-full);
        }
        .factor-val {
          font-weight: 600;
          color: var(--text-main);
          width: 38px;
          text-align: right;
          font-size: 0.75rem;
        }
        .match-reasons-list {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          padding-top: 0.5rem;
          border-top: 1px solid var(--border-subtle);
        }
        .reason-item {
          display: flex;
          align-items: flex-start;
          gap: 0.4rem;
          font-size: 0.78rem;
          color: var(--text-secondary);
          line-height: 1.35;
        }
        .reason-icon {
          color: var(--color-success);
          margin-top: 2px;
          flex-shrink: 0;
        }
      `}</style>
    </div>
  );
}
