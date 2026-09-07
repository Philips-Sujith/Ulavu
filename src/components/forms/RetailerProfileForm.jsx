import React, { useState } from "react";
import { TAMILNADU_DISTRICTS } from "../../data/mockData";

export default function RetailerProfileForm({ initialData, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    businessName: initialData?.businessName || "",
    contactPerson: initialData?.contactPerson || "",
    phone: initialData?.phone || "",
    location: initialData?.location || "",
    district: initialData?.district || "Chennai",
    state: initialData?.state || "Tamil Nadu",
    businessType: initialData?.businessType || "Supermarket Chain",
    preferredSourcingArea: initialData?.preferredSourcingArea || "Kanchipuram, Chengalpattu, Tiruvallur",
    bio: initialData?.bio || ""
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!formData.businessName.trim()) errs.businessName = "Business / Enterprise name is required";
    if (!formData.contactPerson.trim()) errs.contactPerson = "Contact person name is required";
    if (!formData.phone.trim()) errs.phone = "Phone number is required";
    if (!formData.location.trim()) errs.location = "Business hub location is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="retailer-form">
      <div className="form-grid-2">
        <div className="form-group">
          <label className="form-label">
            Enterprise / Business Name *
            {errors.businessName && <span className="field-err">{errors.businessName}</span>}
          </label>
          <input
            type="text"
            className="form-input"
            placeholder="e.g. FreshMart Supermarkets"
            value={formData.businessName}
            onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            Procurement Contact Person *
            {errors.contactPerson && <span className="field-err">{errors.contactPerson}</span>}
          </label>
          <input
            type="text"
            className="form-input"
            placeholder="e.g. Dinesh Anand"
            value={formData.contactPerson}
            onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
          />
        </div>
      </div>

      <div className="form-grid-3">
        <div className="form-group">
          <label className="form-label">
            Phone Number *
            {errors.phone && <span className="field-err">{errors.phone}</span>}
          </label>
          <input
            type="text"
            className="form-input"
            placeholder="e.g. +91 98410 44556"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Commercial Hub / Town *</label>
          <input
            type="text"
            className="form-input"
            placeholder="e.g. Koyambedu, Chennai"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label className="form-label">District Hub</label>
          <select
            className="form-select"
            value={formData.district}
            onChange={(e) => setFormData({ ...formData, district: e.target.value })}
          >
            {TAMILNADU_DISTRICTS.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-grid-2">
        <div className="form-group">
          <label className="form-label">Buyer Type</label>
          <select
            className="form-select"
            value={formData.businessType}
            onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
          >
            <option value="Supermarket Chain">Supermarket Chain</option>
            <option value="Wholesale Mandi Merchant">Wholesale Mandi Merchant</option>
            <option value="Organic Retail Store">Organic Retail Store</option>
            <option value="Food Processing Unit">Food Processing Unit</option>
            <option value="Modern Greengrocer">Modern Greengrocer</option>
            <option value="Agricultural Exporter">Agricultural Exporter</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Preferred Sourcing Districts</label>
          <input
            type="text"
            className="form-input"
            placeholder="e.g. Kanchipuram, Chengalpattu, Tiruvallur"
            value={formData.preferredSourcingArea}
            onChange={(e) => setFormData({ ...formData, preferredSourcingArea: e.target.value })}
          />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">About Sourcing Requirements</label>
        <textarea
          rows={2}
          className="form-textarea"
          placeholder="Describe your purchase volumes, weekly turnover, and quality criteria..."
          value={formData.bio}
          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
        />
      </div>

      <div className="form-actions-row">
        {onCancel && (
          <button type="button" onClick={onCancel} className="btn btn-secondary">
            Cancel
          </button>
        )}
        <button type="submit" className="btn btn-primary">
          Save Retailer Profile
        </button>
      </div>

      <style>{`
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
          margin-top: 1rem;
        }
      `}</style>
    </form>
  );
}
