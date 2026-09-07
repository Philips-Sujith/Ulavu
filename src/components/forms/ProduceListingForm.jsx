import React, { useState } from "react";
import { POPULAR_CROPS } from "../../data/mockData";

export default function ProduceListingForm({ activeFarmer, onSave, onCancel }) {
  const [crop, setCrop] = useState("Tomato");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("kg"); // strictly "kg" or "bag"
  const [location, setLocation] = useState(activeFarmer?.location || "Walajabad, Kanchipuram");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!crop.trim()) {
      setError("Please select or enter the vegetable or fruit name");
      return;
    }
    if (!quantity || Number(quantity) <= 0) {
      setError("Please enter a valid quantity");
      return;
    }
    if (!location.trim()) {
      setError("Please enter your location");
      return;
    }

    onSave({
      farmerId: activeFarmer.id,
      farmerName: activeFarmer.name,
      farmerPhone: activeFarmer.phone,
      crop: crop.trim(),
      quantity: Number(quantity),
      unit: unit, // "kg" or "bag"
      location: location.trim()
    });
  };

  return (
    <form onSubmit={handleSubmit} className="simple-produce-form">
      {/* Quick Select Vegetable / Fruit */}
      <div className="crop-selector-section">
        <label className="simple-label">Select or Type Vegetable / Fruit *</label>
        <div className="popular-crops-pills">
          {POPULAR_CROPS.map((c) => (
            <button
              key={c}
              type="button"
              className={`crop-select-pill ${crop.toLowerCase() === c.toLowerCase() ? "active" : ""}`}
              onClick={() => {
                setCrop(c);
                setError("");
              }}
            >
              {c}
            </button>
          ))}
        </div>
        <input
          type="text"
          className="form-input custom-crop-input"
          placeholder="Or type another crop name (e.g. Tomato, Watermelon, Carrot...)"
          value={crop}
          onChange={(e) => {
            setCrop(e.target.value);
            setError("");
          }}
        />
      </div>

      {/* Quantity & Unit (Strictly kg or bag) */}
      <div className="quantity-unit-row">
        <div className="form-group flex-2">
          <label className="simple-label">Quantity Available *</label>
          <input
            type="number"
            min="1"
            className="form-input big-input"
            placeholder="e.g. 500"
            value={quantity}
            onChange={(e) => {
              setQuantity(e.target.value);
              setError("");
            }}
            autoFocus
          />
        </div>

        <div className="form-group flex-1">
          <label className="simple-label">Unit *</label>
          <div className="unit-toggle-group">
            <button
              type="button"
              className={`unit-toggle-btn ${unit === "kg" ? "active" : ""}`}
              onClick={() => setUnit("kg")}
            >
              Kilograms (kg)
            </button>
            <button
              type="button"
              className={`unit-toggle-btn ${unit === "bag" ? "active" : ""}`}
              onClick={() => setUnit("bag")}
            >
              Bags (bag)
            </button>
          </div>
        </div>
      </div>

      {/* Location */}
      <div className="form-group">
        <label className="simple-label">Your Location (Village / Town / District) *</label>
        <input
          type="text"
          className="form-input"
          placeholder="e.g. Walajabad, Kanchipuram"
          value={location}
          onChange={(e) => {
            setLocation(e.target.value);
            setError("");
          }}
        />
      </div>

      {error && <div className="simple-error-msg">{error}</div>}

      <div className="form-actions">
        {onCancel && (
          <button type="button" onClick={onCancel} className="btn btn-secondary">
            Cancel
          </button>
        )}
        <button type="submit" className="btn btn-primary btn-lg">
          Post Produce
        </button>
      </div>

      <style>{`
        .simple-produce-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .simple-label {
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--text-main);
          margin-bottom: 0.4rem;
          display: block;
        }
        .popular-crops-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 0.75rem;
        }
        .crop-select-pill {
          background: var(--bg-surface-subtle);
          border: 1px solid var(--border-medium);
          color: var(--text-main);
          padding: 0.4rem 0.9rem;
          border-radius: var(--radius-full);
          font-size: 0.88rem;
          font-weight: 500;
          cursor: pointer;
          transition: all var(--transition-fast);
        }
        .crop-select-pill:hover {
          background: var(--color-primary-50);
          border-color: var(--color-primary-300);
        }
        .crop-select-pill.active {
          background: var(--color-primary-700);
          color: #ffffff;
          border-color: var(--color-primary-700);
          font-weight: 600;
        }
        .custom-crop-input {
          font-size: 1rem;
        }
        .quantity-unit-row {
          display: flex;
          gap: 1rem;
          align-items: flex-start;
        }
        .flex-2 { flex: 2; }
        .flex-1 { flex: 1.5; }
        .big-input {
          font-size: 1.25rem;
          font-weight: 700;
        }
        .unit-toggle-group {
          display: flex;
          background: var(--bg-surface-subtle);
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-md);
          padding: 4px;
          gap: 4px;
        }
        .unit-toggle-btn {
          flex: 1;
          background: none;
          border: none;
          padding: 0.65rem 0.5rem;
          border-radius: var(--radius-sm);
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-secondary);
          cursor: pointer;
          transition: all var(--transition-fast);
          text-align: center;
        }
        .unit-toggle-btn.active {
          background: var(--bg-surface);
          color: var(--color-primary-700);
          box-shadow: var(--shadow-xs);
        }
        .simple-error-msg {
          color: var(--color-danger);
          font-size: 0.85rem;
          font-weight: 600;
          background: var(--color-danger-bg);
          padding: 0.6rem 1rem;
          border-radius: var(--radius-md);
        }
        .form-actions {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 0.75rem;
          padding-top: 0.5rem;
        }
        @media (max-width: 600px) {
          .quantity-unit-row {
            flex-direction: column;
          }
          .flex-1, .flex-2 {
            width: 100%;
          }
        }
      `}</style>
    </form>
  );
}
