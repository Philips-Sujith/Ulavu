import React from "react";
import { MapPin, Calendar, Trash2, Tractor, IndianRupee, Sparkles } from "lucide-react";
import StatusBadge from "../common/StatusBadge";

export default function RequirementCard({
  requirement,
  matchingFarmersCount = 0,
  onFindFarmers,
  onDelete
}) {
  return (
    <div className="req-card card card-hover">
      {/* Header */}
      <div className="req-card-header">
        <div className="req-title-group">
          <div className="req-badge-icon">
            <span>📦</span>
          </div>
          <div>
            <h3 className="req-crop-name">{requirement.crop}</h3>
            <span className="req-business-name">{requirement.businessName}</span>
          </div>
        </div>
        <span className="badge badge-amber">Procurement Active</span>
      </div>

      {/* Target stats grid */}
      <div className="req-stats-grid">
        <div className="req-stat-box">
          <span className="stat-label">Quantity Needed</span>
          <span className="stat-value">
            {requirement.quantity} <span className="stat-unit">{requirement.unit}</span>
          </span>
        </div>

        <div className="req-stat-box">
          <span className="stat-label">Target Budget</span>
          <span className="stat-value price-highlight">
            ₹{requirement.minBudget}–₹{requirement.maxBudget}{" "}
            <span className="stat-unit">/{requirement.unit}</span>
          </span>
        </div>
      </div>

      {/* Sourcing Location & Target Date */}
      <div className="req-meta-list">
        <div className="req-meta-item">
          <MapPin size={15} className="meta-icon" />
          <span>
            Preferred Sourcing: <strong>{requirement.preferredLocation}</strong>
          </span>
        </div>

        <div className="req-meta-item">
          <Calendar size={15} className="meta-icon" />
          <span>
            Required Delivery By: <strong>{requirement.requiredBy}</strong>
          </span>
        </div>

        {requirement.qualityNotes && (
          <p className="req-notes">"{requirement.qualityNotes}"</p>
        )}
      </div>

      {/* Bottom Footer */}
      <div className="req-card-footer">
        <div className="farmer-match-indicator" onClick={onFindFarmers}>
          <div className="match-counter-pill">
            <Tractor size={14} />
            <span>
              <strong>{matchingFarmersCount}</strong> {matchingFarmersCount === 1 ? "farmer" : "farmers"} match
            </span>
          </div>
        </div>

        <div className="req-actions">
          {onDelete && (
            <button
              onClick={() => onDelete(requirement.id)}
              className="btn-icon-delete"
              title="Remove requirement"
              aria-label="Delete requirement"
            >
              <Trash2 size={16} />
            </button>
          )}

          <button onClick={onFindFarmers} className="btn btn-primary btn-sm">
            <Sparkles size={14} />
            <span>Find Farmers</span>
          </button>
        </div>
      </div>

      <style>{`
        .req-card {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          border-radius: var(--radius-lg);
          padding: 1.5rem;
          background: var(--bg-surface);
        }
        .req-card-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 0.75rem;
        }
        .req-title-group {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .req-badge-icon {
          width: 44px;
          height: 44px;
          border-radius: var(--radius-md);
          background-color: var(--color-accent-50);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.4rem;
        }
        .req-crop-name {
          font-size: 1.35rem;
          color: var(--color-primary-900);
          line-height: 1.2;
        }
        .req-business-name {
          font-size: 0.8rem;
          color: var(--text-muted);
          display: block;
          margin-top: 2px;
        }
        .req-stats-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
          background: var(--bg-surface-subtle);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 0.85rem 1rem;
        }
        .req-stat-box {
          display: flex;
          flex-direction: column;
        }
        .stat-label {
          font-size: 0.72rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--text-muted);
          font-weight: 600;
          margin-bottom: 2px;
        }
        .stat-value {
          font-family: var(--font-heading);
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--color-primary-900);
        }
        .stat-unit {
          font-size: 0.8rem;
          font-weight: 500;
          color: var(--text-secondary);
        }
        .price-highlight {
          color: var(--color-accent-700);
        }
        .req-meta-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .req-meta-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.86rem;
          color: var(--text-secondary);
        }
        .meta-icon {
          color: var(--color-accent-600);
          flex-shrink: 0;
        }
        .req-notes {
          font-size: 0.82rem;
          font-style: italic;
          color: var(--text-muted);
          margin-top: 0.25rem;
          line-height: 1.4;
          background: var(--bg-page);
          padding: 0.5rem 0.75rem;
          border-radius: var(--radius-sm);
        }
        .req-card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 1rem;
          border-top: 1px solid var(--border-subtle);
          margin-top: auto;
        }
        .match-counter-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background-color: var(--color-primary-50);
          color: var(--color-primary-800);
          border: 1px solid var(--color-primary-100);
          font-size: 0.82rem;
          font-weight: 600;
          padding: 0.3rem 0.65rem;
          border-radius: var(--radius-full);
          cursor: pointer;
          transition: background-color var(--transition-fast);
        }
        .match-counter-pill:hover {
          background-color: var(--color-primary-100);
        }
        .req-actions {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .btn-icon-delete {
          background: none;
          border: 1px solid transparent;
          color: var(--text-muted);
          width: 32px;
          height: 32px;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all var(--transition-fast);
        }
        .btn-icon-delete:hover {
          background: var(--color-danger-bg);
          color: var(--color-danger);
          border-color: rgba(220, 38, 38, 0.2);
        }
      `}</style>
    </div>
  );
}
