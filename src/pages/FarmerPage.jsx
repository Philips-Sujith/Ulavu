import React, { useState } from "react";
import { Plus, Edit3, MapPin, Phone, User, Tractor, CheckCircle2 } from "lucide-react";
import CropCard from "../components/cards/CropCard";
import FarmerProfileForm from "../components/forms/FarmerProfileForm";
import ProduceListingForm from "../components/forms/ProduceListingForm";
import Modal from "../components/common/Modal";
import EmptyState from "../components/common/EmptyState";

export default function FarmerPage({
  farmers,
  activeFarmer,
  setActiveFarmerId,
  onUpdateFarmerProfile,
  produceList,
  onAddProduce,
  onDeleteProduce
}) {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isAddProduceModalOpen, setIsAddProduceModalOpen] = useState(false);

  // Filter produce for this active farmer
  const farmerProduce = produceList.filter((p) => p.farmerId === activeFarmer.id);

  return (
    <div className="farmer-page container">
      {/* Simple Farmer Profile Header */}
      <section className="farmer-simple-header card">
        <div className="farmer-header-info">
          <div className="farmer-badge-icon">
            <User size={28} />
          </div>
          <div>
            <div className="farmer-title-row">
              <h1 className="farmer-name">{activeFarmer.name}</h1>
              <span className="farmer-pill">Farmer</span>
            </div>

            <div className="farmer-details-row">
              <div className="detail-item">
                <Phone size={15} />
                <span>{activeFarmer.phone}</span>
              </div>
              <div className="detail-item">
                <MapPin size={15} />
                <span>{activeFarmer.location}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="farmer-header-actions">
          <button
            onClick={() => setIsProfileModalOpen(true)}
            className="btn btn-secondary btn-sm"
          >
            <Edit3 size={14} />
            <span>Edit Profile</span>
          </button>

          {/* Quick Persona Switcher for Evaluation */}
          <div className="quick-switch-wrap">
            <span className="switch-text">Switch Farmer:</span>
            <select
              value={activeFarmer.id}
              onChange={(e) => setActiveFarmerId(e.target.value)}
              className="form-select quick-switch-select"
            >
              {farmers.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.name} ({f.location.split(",")[0]})
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Main Content: Post Action & Listings */}
      <section className="farmer-main-section">
        <div className="section-bar">
          <div>
            <h2 className="section-title">My Posted Produce</h2>
            <p className="section-desc">
              Vegetables and fruits you have listed. Retailers can view your produce and call you directly.
            </p>
          </div>

          <button
            onClick={() => setIsAddProduceModalOpen(true)}
            className="btn btn-primary btn-lg"
          >
            <Plus size={18} />
            <span>Post New Produce</span>
          </button>
        </div>

        {farmerProduce.length === 0 ? (
          <EmptyState
            icon={Tractor}
            title="No produce posted yet"
            description="Post your available vegetables or fruits so nearby commercial retailers can call you directly."
            actionLabel="Post Produce Now"
            onAction={() => setIsAddProduceModalOpen(true)}
          />
        ) : (
          <div className="produce-cards-grid">
            {farmerProduce.map((item) => (
              <CropCard
                key={item.id}
                produce={item}
                isRetailerView={false}
                onDelete={onDeleteProduce}
              />
            ))}
          </div>
        )}
      </section>

      {/* Edit Profile Modal */}
      <Modal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        title="Edit Farmer Details"
        subtitle="Keep your contact and location up to date for buyers."
      >
        <FarmerProfileForm
          initialData={activeFarmer}
          onSave={(updated) => {
            onUpdateFarmerProfile(updated);
            setIsProfileModalOpen(false);
          }}
          onCancel={() => setIsProfileModalOpen(false)}
        />
      </Modal>

      {/* Post Produce Modal */}
      <Modal
        isOpen={isAddProduceModalOpen}
        onClose={() => setIsAddProduceModalOpen(false)}
        title="Post New Produce"
        subtitle="Specify what vegetable or fruit you have, quantity in kg or bags, and your location."
      >
        <ProduceListingForm
          activeFarmer={activeFarmer}
          onSave={(item) => {
            onAddProduce(item);
            setIsAddProduceModalOpen(false);
          }}
          onCancel={() => setIsAddProduceModalOpen(false)}
        />
      </Modal>

      <style>{`
        .farmer-page {
          padding-top: 2.5rem;
          padding-bottom: 4rem;
          display: flex;
          flex-direction: column;
          gap: 2.5rem;
        }
        .farmer-simple-header {
          padding: 1.75rem 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-radius: var(--radius-xl);
          background: #ffffff;
          gap: 1.5rem;
        }
        .farmer-header-info {
          display: flex;
          align-items: center;
          gap: 1.25rem;
        }
        .farmer-badge-icon {
          width: 58px;
          height: 58px;
          border-radius: var(--radius-lg);
          background-color: var(--color-primary-50);
          color: var(--color-primary-700);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .farmer-title-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .farmer-name {
          font-size: 1.75rem;
          color: var(--color-primary-900);
        }
        .farmer-pill {
          background-color: var(--color-primary-100);
          color: var(--color-primary-800);
          font-size: 0.75rem;
          font-weight: 700;
          padding: 0.2rem 0.6rem;
          border-radius: var(--radius-full);
          text-transform: uppercase;
        }
        .farmer-details-row {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          margin-top: 0.35rem;
          color: var(--text-secondary);
          font-size: 0.95rem;
        }
        .detail-item {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }
        .detail-item svg {
          color: var(--color-primary-600);
        }
        .farmer-header-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .quick-switch-wrap {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }
        .switch-text {
          font-size: 0.78rem;
          color: var(--text-muted);
          font-weight: 600;
        }
        .quick-switch-select {
          padding: 0.4rem 0.6rem;
          font-size: 0.85rem;
          border-radius: var(--radius-md);
        }
        .farmer-main-section {
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
        }
        .section-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
        }
        .section-title {
          font-size: 1.75rem;
          color: var(--color-primary-900);
        }
        .section-desc {
          color: var(--text-secondary);
          font-size: 0.95rem;
          margin-top: 0.2rem;
        }
        .produce-cards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }
        @media (max-width: 960px) {
          .produce-cards-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .farmer-simple-header {
            flex-direction: column;
            align-items: flex-start;
          }
          .farmer-header-actions {
            width: 100%;
            justify-content: space-between;
          }
        }
        @media (max-width: 640px) {
          .produce-cards-grid {
            grid-template-columns: 1fr;
          }
          .farmer-details-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.35rem;
          }
        }
      `}</style>
    </div>
  );
}
