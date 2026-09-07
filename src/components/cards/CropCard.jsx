import React, { useState } from "react";
import { MapPin, Phone, Trash2, Check, User } from "lucide-react";

export default function CropCard({
  produce,
  isRetailerView = false,
  onDelete
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(produce.farmerPhone);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="clean-crop-card card card-hover">
      {/* Top Header */}
      <div className="clean-card-top">
        <div className="crop-title-group">
          <h3 className="clean-crop-name">{produce.crop}</h3>
          <span className="clean-crop-quantity">
            {produce.quantity} <span className="unit-tag">{produce.unit}</span>
          </span>
        </div>

        {produce.postedAt && (
          <span className="posted-time-badge">{produce.postedAt}</span>
        )}
      </div>

      {/* Location */}
      <div className="clean-location-row">
        <MapPin size={16} className="loc-icon" />
        <span>{produce.location}</span>
      </div>

      {/* Farmer Details */}
      <div className="clean-farmer-row">
        <div className="farmer-left">
          <User size={15} className="farmer-icon" />
          <span className="farmer-name-text">{produce.farmerName}</span>
        </div>

        <div className="farmer-phone-text">
          <Phone size={14} />
          <span>{produce.farmerPhone}</span>
        </div>
      </div>

      {/* Action Footer */}
      <div className="clean-card-footer">
        {isRetailerView ? (
          <div className="retailer-actions-row">
            <a
              href={`tel:${produce.farmerPhone}`}
              className="btn btn-primary btn-call"
            >
              <Phone size={16} />
              <span>Call {produce.farmerName}</span>
            </a>
            <button
              type="button"
              onClick={handleCopy}
              className="btn btn-secondary btn-sm"
              title="Copy Phone Number"
            >
              {copied ? <Check size={14} /> : "Copy No."}
            </button>
          </div>
        ) : (
          <div className="farmer-card-actions">
            <span className="active-status-dot">
              <span className="dot"></span> Live for Retailers
            </span>
            {onDelete && (
              <button
                onClick={() => onDelete(produce.id)}
                className="btn-delete"
                title="Remove produce listing"
              >
                <Trash2 size={16} />
                <span>Remove</span>
              </button>
            )}
          </div>
        )}
      </div>

      <style>{`
        .clean-crop-card {
          background: #ffffff;
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-lg);
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          transition: transform var(--transition-fast), box-shadow var(--transition-fast);
        }
        .clean-crop-card:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }
        .clean-card-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 0.5rem;
        }
        .crop-title-group {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        .clean-crop-name {
          font-family: var(--font-heading);
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--color-primary-900);
          line-height: 1.2;
        }
        .clean-crop-quantity {
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--color-primary-600);
        }
        .unit-tag {
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--text-secondary);
        }
        .posted-time-badge {
          font-size: 0.75rem;
          color: var(--text-muted);
          background: var(--bg-surface-subtle);
          padding: 0.2rem 0.6rem;
          border-radius: var(--radius-full);
          white-space: nowrap;
        }
        .clean-location-row {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.9rem;
          color: var(--text-secondary);
        }
        .loc-icon {
          color: var(--color-accent-600);
          flex-shrink: 0;
        }
        .clean-farmer-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.75rem 0.9rem;
          background: var(--bg-surface-subtle);
          border-radius: var(--radius-md);
          font-size: 0.88rem;
          gap: 0.5rem;
        }
        .farmer-left {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }
        .farmer-icon {
          color: var(--color-primary-600);
        }
        .farmer-name-text {
          font-weight: 600;
          color: var(--text-main);
        }
        .farmer-phone-text {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          color: var(--color-primary-700);
          font-weight: 600;
        }
        .clean-card-footer {
          margin-top: auto;
          padding-top: 0.75rem;
          border-top: 1px solid var(--border-subtle);
        }
        .retailer-actions-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          width: 100%;
        }
        .btn-call {
          flex: 1;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          text-decoration: none;
        }
        .farmer-card-actions {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .active-status-dot {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.8rem;
          color: var(--color-success);
          font-weight: 600;
        }
        .dot {
          width: 8px;
          height: 8px;
          border-radius: var(--radius-full);
          background: var(--color-success);
          display: inline-block;
        }
        .btn-delete {
          background: none;
          border: none;
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          font-size: 0.8rem;
          color: var(--color-danger);
          cursor: pointer;
          padding: 0.3rem 0.5rem;
          border-radius: var(--radius-sm);
        }
        .btn-delete:hover {
          background: var(--color-danger-bg);
        }
      `}</style>
    </div>
  );
}
