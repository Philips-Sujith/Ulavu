import React from "react";
import { CheckCircle2, AlertTriangle, Info, XCircle, X } from "lucide-react";

export default function Toast({ toasts, onDismiss }) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="toast-container" aria-live="polite">
      {toasts.map((toast) => {
        let Icon = CheckCircle2;
        let iconColor = "var(--color-success)";

        if (toast.type === "warning") {
          Icon = AlertTriangle;
          iconColor = "var(--color-accent-600)";
        } else if (toast.type === "danger") {
          Icon = XCircle;
          iconColor = "var(--color-danger)";
        } else if (toast.type === "info") {
          Icon = Info;
          iconColor = "var(--color-info)";
        }

        return (
          <div key={toast.id} className={`toast-item toast-${toast.type || "success"}`}>
            <Icon size={20} style={{ color: iconColor, flexShrink: 0, marginTop: "2px" }} />
            <div className="toast-content" style={{ flex: 1 }}>
              {toast.title && <div className="toast-title">{toast.title}</div>}
              <div className="toast-message">{toast.message}</div>
            </div>
            <button
              onClick={() => onDismiss(toast.id)}
              className="toast-close"
              aria-label="Dismiss notification"
            >
              <X size={16} />
            </button>
          </div>
        );
      })}

      <style>{`
        .toast-title {
          font-weight: 700;
          font-size: 0.9rem;
          color: var(--text-main);
          margin-bottom: 2px;
        }
        .toast-message {
          font-size: 0.85rem;
          color: var(--text-secondary);
          line-height: 1.4;
        }
        .toast-close {
          background: none;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          padding: 2px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: var(--radius-sm);
        }
        .toast-close:hover {
          color: var(--text-main);
        }
      `}</style>
    </div>
  );
}
