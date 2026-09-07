import React, { useState } from "react";
import Modal from "../common/Modal";
import MatchScore from "../common/MatchScore";
import { CheckCircle2, ArrowRight, Shield, MapPin, IndianRupee, Truck } from "lucide-react";

export default function InitiateDealModal({
  isOpen,
  onClose,
  match,
  onConfirmDeal
}) {
  if (!match) return null;
  const { produce, requirement, matchScore, matchDetails } = match;

  const [dealQuantity, setDealQuantity] = useState(
    Math.min(Number(produce.quantity), Number(requirement.quantity))
  );
  const [proposedPrice, setProposedPrice] = useState(Number(produce.expectedPrice));
  const [deliveryDate, setDeliveryDate] = useState(
    requirement.requiredBy || new Date(Date.now() + 5 * 86400000).toISOString().split("T")[0]
  );
  const [logisticsPlan, setLogisticsPlan] = useState("Buyer Farm-Gate Pickup");
  const [dealNotes, setDealNotes] = useState(
    `Proposing direct purchase of ${produce.crop} from ${produce.village ? `${produce.village}, ` : ""}${produce.district}.`
  );
  const [submitted, setSubmitted] = useState(false);

  const totalEstimatedValue = (Number(dealQuantity) || 0) * (Number(proposedPrice) || 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    const dealPayload = {
      farmerId: produce.farmerId,
      farmerName: produce.farmerName,
      farmerPhone: produce.farmerPhone,
      retailerId: requirement.retailerId,
      retailerName: requirement.businessName,
      retailerPhone: requirement.phone,
      crop: produce.crop,
      produceId: produce.id,
      requirementId: requirement.id,
      agreedQuantity: Number(dealQuantity),
      unit: produce.unit,
      proposedPrice: Number(proposedPrice),
      totalValue: totalEstimatedValue,
      deliveryDate,
      logisticsPlan,
      notes: dealNotes
    };

    setSubmitted(true);
    setTimeout(() => {
      onConfirmDeal(dealPayload);
      setSubmitted(false);
      onClose();
    }, 1200);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={submitted ? "Deal Request Confirmed" : `Initiate Deal: ${produce.crop}`}
      subtitle={
        submitted
          ? "Your direct connection has been established on ULAVU."
          : "Review mutual terms and submit a direct trade proposal."
      }
    >
      {submitted ? (
        <div className="deal-success-state">
          <div className="success-icon-wrap">
            <CheckCircle2 size={48} />
          </div>
          <h4 className="success-title">Deal Request Created Successfully!</h4>
          <p className="success-desc">
            A direct trade proposal has been logged between <strong>{produce.farmerName}</strong> and{" "}
            <strong>{requirement.businessName}</strong>.
          </p>
          <div className="success-stats">
            <div className="s-stat">
              <span>Agreed Quantity</span>
              <strong>{dealQuantity} {produce.unit}</strong>
            </div>
            <div className="s-stat">
              <span>Proposed Rate</span>
              <strong>₹{proposedPrice}/{produce.unit}</strong>
            </div>
            <div className="s-stat">
              <span>Estimated Value</span>
              <strong className="text-green">₹{totalEstimatedValue.toLocaleString("en-IN")}</strong>
            </div>
          </div>
          <p className="status-note">
            Both parties can track this deal from their respective dashboards.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="deal-form">
          {/* Match Score Strip */}
          <div className="deal-match-strip">
            <MatchScore
              score={matchScore}
              breakdown={matchDetails?.breakdown}
              reasons={matchDetails?.reasons}
              showDetails={true}
            />
          </div>

          {/* Parties Overview */}
          <div className="deal-parties-summary">
            <div className="party-tile">
              <span className="p-tag farmer-tag">Producer / Farmer</span>
              <h4 className="p-name">{produce.farmerName}</h4>
              <span className="p-loc">
                <MapPin size={12} /> {produce.district}, {produce.state}
              </span>
              <span className="p-detail">Listed: {produce.quantity} {produce.unit} @ ₹{produce.expectedPrice}/{produce.unit}</span>
            </div>

            <div className="party-tile">
              <span className="p-tag buyer-tag">Buyer / Retailer</span>
              <h4 className="p-name">{requirement.businessName}</h4>
              <span className="p-loc">
                <MapPin size={12} /> {requirement.preferredLocation || requirement.preferredDistrict}
              </span>
              <span className="p-detail">Demand: {requirement.quantity} {requirement.unit} @ ₹{requirement.minBudget}–₹{requirement.maxBudget}/{requirement.unit}</span>
            </div>
          </div>

          {/* Negotiable Terms Form */}
          <div className="terms-section">
            <h5 className="terms-title">Proposed Deal Terms</h5>

            <div className="form-grid-2">
              <div className="form-group">
                <label className="form-label">Order Quantity ({produce.unit})</label>
                <input
                  type="number"
                  min="1"
                  max={produce.quantity * 2}
                  className="form-input"
                  value={dealQuantity}
                  onChange={(e) => setDealQuantity(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Proposed Price (₹/{produce.unit})</label>
                <input
                  type="number"
                  min="1"
                  className="form-input"
                  value={proposedPrice}
                  onChange={(e) => setProposedPrice(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-grid-2">
              <div className="form-group">
                <label className="form-label">Target Fulfillment Date</label>
                <input
                  type="date"
                  className="form-input"
                  value={deliveryDate}
                  onChange={(e) => setDeliveryDate(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Logistics Arrangement</label>
                <select
                  className="form-select"
                  value={logisticsPlan}
                  onChange={(e) => setLogisticsPlan(e.target.value)}
                >
                  <option value="Buyer Farm-Gate Pickup">Buyer Farm-Gate Pickup (Recommended)</option>
                  <option value="Farmer Hub Delivery">Farmer Hub Delivery</option>
                  <option value="Third-Party Rural Transit">Third-Party Rural Transit</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Special Notes / Packaging Requirements</label>
              <textarea
                rows={2}
                className="form-textarea"
                value={dealNotes}
                onChange={(e) => setDealNotes(e.target.value)}
              />
            </div>
          </div>

          {/* Total Value Bar */}
          <div className="deal-total-bar">
            <div>
              <span className="total-label">Estimated Deal Total:</span>
              <span className="total-amount">₹{totalEstimatedValue.toLocaleString("en-IN")}</span>
            </div>
            <div className="direct-badge">
              <Shield size={14} />
              <span>0% Middleman Commission</span>
            </div>
          </div>

          <div className="modal-actions-row">
            <button type="button" onClick={onClose} className="btn btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary btn-lg">
              <span>Confirm & Initiate Deal</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </form>
      )}

      <style>{`
        .deal-match-strip {
          margin-bottom: 1.25rem;
        }
        .deal-parties-summary {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
        }
        .party-tile {
          background: var(--bg-surface-subtle);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 0.85rem;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        .p-tag {
          font-size: 0.68rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          padding: 0.1rem 0.4rem;
          border-radius: var(--radius-sm);
          width: fit-content;
        }
        .farmer-tag {
          background: var(--color-primary-100);
          color: var(--color-primary-800);
        }
        .buyer-tag {
          background: var(--color-accent-100);
          color: var(--color-accent-800);
        }
        .p-name {
          font-size: 1rem;
          color: var(--color-primary-900);
        }
        .p-loc {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          font-size: 0.78rem;
          color: var(--text-muted);
        }
        .p-detail {
          font-size: 0.78rem;
          color: var(--text-secondary);
          margin-top: 2px;
        }
        .terms-section {
          background: var(--bg-page);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 1.25rem;
          margin-bottom: 1.25rem;
        }
        .terms-title {
          font-size: 0.85rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--text-muted);
          margin-bottom: 1rem;
        }
        .deal-total-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: var(--color-primary-50);
          border: 1px solid var(--color-primary-100);
          padding: 0.85rem 1.25rem;
          border-radius: var(--radius-md);
          margin-bottom: 1.25rem;
        }
        .total-label {
          font-size: 0.85rem;
          color: var(--text-secondary);
          margin-right: 0.5rem;
        }
        .total-amount {
          font-family: var(--font-heading);
          font-size: 1.4rem;
          font-weight: 800;
          color: var(--color-primary-800);
        }
        .direct-badge {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--color-primary-700);
        }
        .modal-actions-row {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 0.75rem;
        }
        .deal-success-state {
          padding: 2.5rem 1.5rem;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .success-icon-wrap {
          width: 72px;
          height: 72px;
          border-radius: var(--radius-full);
          background-color: var(--color-success-bg);
          color: var(--color-success);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.25rem;
        }
        .success-title {
          font-size: 1.35rem;
          color: var(--color-primary-900);
          margin-bottom: 0.5rem;
        }
        .success-desc {
          color: var(--text-secondary);
          font-size: 0.95rem;
          margin-bottom: 1.5rem;
          max-width: 440px;
        }
        .success-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
          background: var(--bg-surface-subtle);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 1rem;
          width: 100%;
          margin-bottom: 1rem;
        }
        .s-stat {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .s-stat span {
          font-size: 0.72rem;
          text-transform: uppercase;
          color: var(--text-muted);
        }
        .s-stat strong {
          font-size: 0.95rem;
          color: var(--text-main);
        }
        .text-green {
          color: var(--color-success) !important;
        }
        .status-note {
          font-size: 0.8rem;
          color: var(--text-muted);
        }
        @media (max-width: 600px) {
          .deal-parties-summary {
            grid-template-columns: 1fr;
          }
          .success-stats {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </Modal>
  );
}
