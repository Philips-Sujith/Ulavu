import React from "react";
import { FolderSearch, Plus } from "lucide-react";

export default function EmptyState({
  icon: Icon = FolderSearch,
  title,
  description,
  actionLabel,
  onAction
}) {
  return (
    <div className="empty-state-box">
      <div className="empty-icon-wrap">
        <Icon size={32} />
      </div>
      <h4 className="empty-title">{title}</h4>
      <p className="empty-desc">{description}</p>
      {actionLabel && onAction && (
        <button onClick={onAction} className="btn btn-primary btn-sm">
          <Plus size={16} />
          <span>{actionLabel}</span>
        </button>
      )}

      <style>{`
        .empty-state-box {
          background: var(--bg-surface);
          border: 2px dashed var(--border-medium);
          border-radius: var(--radius-lg);
          padding: 3.5rem 2rem;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          max-width: 520px;
          margin: 1.5rem auto;
        }
        .empty-icon-wrap {
          width: 64px;
          height: 64px;
          border-radius: var(--radius-full);
          background-color: var(--color-primary-50);
          color: var(--color-primary-600);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.25rem;
        }
        .empty-title {
          font-size: 1.15rem;
          color: var(--color-primary-900);
          margin-bottom: 0.5rem;
        }
        .empty-desc {
          font-size: 0.9rem;
          color: var(--text-muted);
          line-height: 1.5;
          margin-bottom: 1.5rem;
          max-width: 400px;
        }
      `}</style>
    </div>
  );
}
