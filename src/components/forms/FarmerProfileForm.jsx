import React, { useState } from "react";

export default function FarmerProfileForm({ initialData, onSave, onCancel }) {
  const [name, setName] = useState(initialData?.name || "");
  const [phone, setPhone] = useState(initialData?.phone || "");
  const [location, setLocation] = useState(initialData?.location || "");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Please enter farmer name");
      return;
    }
    if (!phone.trim()) {
      setError("Please enter mobile number");
      return;
    }
    if (!location.trim()) {
      setError("Please enter location");
      return;
    }

    onSave({
      ...initialData,
      name: name.trim(),
      phone: phone.trim(),
      location: location.trim()
    });
  };

  return (
    <form onSubmit={handleSubmit} className="simple-profile-form">
      <div className="form-group">
        <label className="simple-label">Farmer Name *</label>
        <input
          type="text"
          className="form-input"
          placeholder="e.g. Ravi Kumar"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setError("");
          }}
          autoFocus
        />
      </div>

      <div className="form-group">
        <label className="simple-label">Mobile Number *</label>
        <input
          type="tel"
          className="form-input"
          placeholder="e.g. 98401 23456"
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
            setError("");
          }}
        />
      </div>

      <div className="form-group">
        <label className="simple-label">Location (Village / District) *</label>
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
        <button type="submit" className="btn btn-primary">
          Save Profile
        </button>
      </div>

      <style>{`
        .simple-profile-form {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .simple-label {
          font-size: 0.88rem;
          font-weight: 600;
          color: var(--text-main);
          margin-bottom: 0.35rem;
          display: block;
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
      `}</style>
    </form>
  );
}
