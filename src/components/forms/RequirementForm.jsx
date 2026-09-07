import React, { useState } from "react";
import { COMMON_CROPS, TAMILNADU_DISTRICTS } from "../../data/mockData";

export default function RequirementForm({ activeRetailer, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    crop: "Tomato",
    quantity: "",
    unit: "kg",
    preferredLocation: activeRetailer?.preferredSourcingArea || "Kanchipuram, Chengalpattu",
    preferredDistrict: "Kanchipuram",
    minBudget: "",
    maxBudget: "",
    requiredBy: new Date(Date.now() + 7 * 86400000).toISOString().split("T")[0],
    qualityNotes: ""
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!formData.crop.trim()) errs.crop = "Crop is required";
    if (!formData.quantity || Number(formData.quantity) <= 0) {
      errs.quantity = "Enter valid quantity (> 0)";
    }
    if (!formData.maxBudget || Number(formData.maxBudget) <= 0) {
      errs.maxBudget = "Enter max budget (> 0)";
    }
    if (formData.minBudget && Number(formData.minBudget) > Number(formData.maxBudget)) {
      errs.minBudget = "Min budget cannot exceed max budget";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSave({
      ...formData,
      retailerId: activeRetailer?.id || "retailer-1",
      businessName: activeRetailer?.businessName || "Retailer",
      contactPerson: activeRetailer?.contactPerson || "Procurement Manager",
      phone: activeRetailer?.phone || "",
      quantity: Number(formData.quantity),
      minBudget: Number(formData.minBudget) || Number(formData.maxBudget) * 0.8,
      maxBudget: Number(formData.maxBudget)
    });
  };

  return (
    <form onSubmit={handleSubmit} className="requirement-form">
      {/* Quick crop pills */}
      <div className="crop-quick-select">
        <label className="quick-label">Select Crop to Procure:</label>
        <div className="quick-pills">
          {COMMON_CROPS.slice(0, 8).map((cropName) => (
            <button
              key={cropName}
              type="button"
              className={`crop-pill ${formData.crop.toLowerCase() === cropName.toLowerCase() ? "active" : ""}`}
              onClick={() => setFormData({ ...formData, crop: cropName })}
            >
              {cropName}
            </button>
          ))}
        </div>
      </div>

      <div className="form-grid-3">
        <div className="form-group">
          <label className="form-label">
            Crop Name *
            {errors.crop && <span className="field-err">{errors.crop}</span>}
          </label>
          <input
            type="text"
            className="form-input"
            value={formData.crop}
            onChange={(e) => setFormData({ ...formData, crop: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            Quantity Required *
            {errors.quantity && <span className="field-err">{errors.quantity}</span>}
          </label>
          <input
            type="number"
            min="1"
            className="form-input"
            placeholder="e.g. 500"
            value={formData.quantity}
            onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Unit</label>
          <select
            className="form-select"
            value={formData.unit}
            onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
          >
            <option value="kg">kg (Kilograms)</option>
            <option value="Quintal">Quintal</option>
            <option value="Tonnes">Tonnes</option>
            <option value="Bags">Bags</option>
            <option value="Pieces">Pieces / Count</option>
          </select>
        </div>
      </div>

      {/* Target Price Range */}
      <div className="form-grid-3">
        <div className="form-group">
          <label className="form-label">
            Min Target Budget (₹/{formData.unit})
            {errors.minBudget && <span className="field-err">{errors.minBudget}</span>}
          </label>
          <input
            type="number"
            min="1"
            className="form-input"
            placeholder="e.g. 24"
            value={formData.minBudget}
            onChange={(e) => setFormData({ ...formData, minBudget: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            Max Budget Ceiling (₹/{formData.unit}) *
            {errors.maxBudget && <span className="field-err">{errors.maxBudget}</span>}
          </label>
          <input
            type="number"
            min="1"
            className="form-input"
            placeholder="e.g. 30"
            value={formData.maxBudget}
            onChange={(e) => setFormData({ ...formData, maxBudget: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Required Delivery By</label>
          <input
            type="date"
            className="form-input"
            value={formData.requiredBy}
            onChange={(e) => setFormData({ ...formData, requiredBy: e.target.value })}
          />
        </div>
      </div>

      {/* Location */}
      <div className="form-grid-2">
        <div className="form-group">
          <label className="form-label">Preferred Sourcing District</label>
          <select
            className="form-select"
            value={formData.preferredDistrict}
            onChange={(e) => setFormData({ ...formData, preferredDistrict: e.target.value })}
          >
            {TAMILNADU_DISTRICTS.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Location Notes / Radius</label>
          <input
            type="text"
            className="form-input"
            placeholder="e.g. Within 80km of Koyambedu market"
            value={formData.preferredLocation}
            onChange={(e) => setFormData({ ...formData, preferredLocation: e.target.value })}
          />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Quality Standards & Specifications</label>
        <textarea
          rows={2}
          className="form-textarea"
          placeholder="e.g. Grade 1, uniform color, low moisture, minimum crate sorting..."
          value={formData.qualityNotes}
          onChange={(e) => setFormData({ ...formData, qualityNotes: e.target.value })}
        />
      </div>

      <div className="form-actions-row">
        {onCancel && (
          <button type="button" onClick={onCancel} className="btn btn-secondary">
            Cancel
          </button>
        )}
        <button type="submit" className="btn btn-primary">
          Post Procurement Requirement
        </button>
      </div>

      <style>{`
        .crop-quick-select {
          margin-bottom: 1.25rem;
          background: var(--bg-surface-subtle);
          padding: 0.75rem 1rem;
          border-radius: var(--radius-md);
        }
        .quick-label {
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.04em;
          display: block;
          margin-bottom: 0.4rem;
        }
        .quick-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
        }
        .crop-pill {
          background: var(--bg-surface);
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-full);
          padding: 0.25rem 0.65rem;
          font-size: 0.8rem;
          color: var(--text-secondary);
          cursor: pointer;
          transition: all var(--transition-fast);
        }
        .crop-pill:hover {
          background: var(--color-primary-50);
          border-color: var(--color-primary-300);
          color: var(--color-primary-800);
        }
        .crop-pill.active {
          background: var(--color-primary-700);
          color: #ffffff;
          border-color: var(--color-primary-700);
          font-weight: 600;
        }
        .field-err {
          color: var(--color-danger);
          font-size: 0.75rem;
          font-weight: 500;
        }
        .form-actions-row {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 0.75rem;
          margin-top: 1.25rem;
        }
      `}</style>
    </form>
  );
}
