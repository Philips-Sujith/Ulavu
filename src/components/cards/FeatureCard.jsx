import React from "react";
import { ArrowRight } from "lucide-react";

export default function FeatureCard({ icon: Icon, title, description, badge, onClick }) {
  return (
    <div className="feature-card card card-hover" onClick={onClick}>
      <div className="feature-card-top">
        <div className="feature-icon-box">
          <Icon size={24} />
        </div>
        {badge && <span className="badge badge-amber">{badge}</span>}
      </div>
      <h3 className="feature-title">{title}</h3>
      <p className="feature-desc">{description}</p>
      {onClick && (
        <div className="feature-action">
          <span>Explore workflow</span>
          <ArrowRight size={14} />
        </div>
      )}

      <style>{`
        .feature-card {
          cursor: pointer;
          display: flex;
          flex-direction: column;
          height: 100%;
          border-radius: var(--radius-xl);
          padding: 2rem;
          background: var(--bg-surface);
          position: relative;
        }
        .feature-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.5rem;
        }
        .feature-icon-box {
          width: 52px;
          height: 52px;
          border-radius: var(--radius-lg);
          background-color: var(--color-primary-50);
          color: var(--color-primary-600);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all var(--transition-normal);
        }
        .feature-card:hover .feature-icon-box {
          background-color: var(--color-primary-600);
          color: #ffffff;
          transform: scale(1.05);
        }
        .feature-title {
          font-size: 1.3rem;
          color: var(--color-primary-900);
          margin-bottom: 0.75rem;
        }
        .feature-desc {
          color: var(--text-secondary);
          font-size: 0.95rem;
          line-height: 1.6;
          flex: 1;
        }
        .feature-action {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          margin-top: 1.5rem;
          color: var(--color-primary-600);
          font-weight: 600;
          font-size: 0.88rem;
          transition: gap var(--transition-fast);
        }
        .feature-card:hover .feature-action {
          color: var(--color-primary-800);
          gap: 0.6rem;
        }
      `}</style>
    </div>
  );
}
