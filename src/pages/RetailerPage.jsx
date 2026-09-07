import React, { useState, useMemo } from "react";
import { Search, MapPin, Phone, Store, Filter } from "lucide-react";
import CropCard from "../components/cards/CropCard";
import EmptyState from "../components/common/EmptyState";
import { POPULAR_CROPS } from "../data/mockData";

export default function RetailerPage({ produceList }) {
  const [selectedCrop, setSelectedCrop] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProduce = useMemo(() => {
    return produceList.filter((item) => {
      if (selectedCrop !== "All" && item.crop.toLowerCase() !== selectedCrop.toLowerCase()) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const text = `${item.crop} ${item.location} ${item.farmerName}`.toLowerCase();
        if (!text.includes(q)) return false;
      }
      return true;
    });
  }, [produceList, selectedCrop, searchQuery]);

  return (
    <div className="retailer-page container">
      {/* Header */}
      <section className="retailer-header">
        <div className="header-badge">
          <Store size={15} />
          <span>Retailer / Buyer Window</span>
        </div>
        <h1 className="header-title">Available Farm Produce</h1>
        <p className="header-subtitle">
          Browse fresh vegetables and fruits posted directly by regional farmers. Call them directly to agree on procurement and delivery.
        </p>
      </section>

      {/* Simple Search & Filter Bar */}
      <section className="clean-filter-bar card">
        <div className="search-wrap">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search by vegetable, fruit, farmer name, or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="filter-search-input"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery("")} className="clear-btn">
              Clear
            </button>
          )}
        </div>

        {/* Quick Crop Selector */}
        <div className="crops-filter-scroll">
          <button
            className={`crop-filter-chip ${selectedCrop === "All" ? "active" : ""}`}
            onClick={() => setSelectedCrop("All")}
          >
            All Produce ({produceList.length})
          </button>
          {POPULAR_CROPS.map((c) => {
            const count = produceList.filter((p) => p.crop.toLowerCase() === c.toLowerCase()).length;
            if (count === 0 && selectedCrop !== c) return null;
            return (
              <button
                key={c}
                className={`crop-filter-chip ${selectedCrop === c ? "active" : ""}`}
                onClick={() => setSelectedCrop(c)}
              >
                {c} {count > 0 && `(${count})`}
              </button>
            );
          })}
        </div>
      </section>

      {/* Produce List Results */}
      <section className="retailer-results-section">
        <div className="results-header-row">
          <span className="results-text">
            Showing <strong>{filteredProduce.length}</strong> available farm batches
          </span>
          <span className="direct-call-badge">
            <Phone size={14} /> Direct Phone Contact Enabled
          </span>
        </div>

        {filteredProduce.length === 0 ? (
          <EmptyState
            icon={Store}
            title="No produce found"
            description="Try changing your crop filter or searching for another village/town location."
            actionLabel="Show All Produce"
            onAction={() => {
              setSelectedCrop("All");
              setSearchQuery("");
            }}
          />
        ) : (
          <div className="retailer-produce-grid">
            {filteredProduce.map((item) => (
              <CropCard
                key={item.id}
                produce={item}
                isRetailerView={true}
              />
            ))}
          </div>
        )}
      </section>

      <style>{`
        .retailer-page {
          padding-top: 2.5rem;
          padding-bottom: 4rem;
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        .retailer-header {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          max-width: 720px;
          margin: 0 auto;
        }
        .header-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: var(--color-primary-100);
          color: var(--color-primary-800);
          font-size: 0.8rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          padding: 0.3rem 0.85rem;
          border-radius: var(--radius-full);
          margin-bottom: 0.75rem;
        }
        .header-title {
          font-size: 2.5rem;
          color: var(--color-primary-900);
          margin-bottom: 0.5rem;
        }
        .header-subtitle {
          font-size: 1.05rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }
        .clean-filter-bar {
          padding: 1.25rem 1.5rem;
          border-radius: var(--radius-xl);
          display: flex;
          flex-direction: column;
          gap: 1rem;
          background: #ffffff;
        }
        .search-wrap {
          position: relative;
          width: 100%;
        }
        .search-icon {
          position: absolute;
          left: 1.1rem;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted);
        }
        .filter-search-input {
          width: 100%;
          padding: 0.8rem 1rem 0.8rem 2.8rem;
          border-radius: var(--radius-full);
          border: 1px solid var(--border-medium);
          background: var(--bg-surface-subtle);
          font-size: 0.95rem;
          outline: none;
          transition: all var(--transition-fast);
        }
        .filter-search-input:focus {
          background: #ffffff;
          border-color: var(--color-primary-500);
          box-shadow: 0 0 0 3px rgba(45, 106, 79, 0.12);
        }
        .clear-btn {
          position: absolute;
          right: 1.1rem;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: var(--text-muted);
          font-size: 0.8rem;
          cursor: pointer;
        }
        .crops-filter-scroll {
          display: flex;
          gap: 0.5rem;
          overflow-x: auto;
          padding-bottom: 0.25rem;
        }
        .crop-filter-chip {
          background: var(--bg-surface-subtle);
          border: 1px solid var(--border-medium);
          color: var(--text-main);
          padding: 0.4rem 1rem;
          border-radius: var(--radius-full);
          font-size: 0.85rem;
          font-weight: 500;
          cursor: pointer;
          white-space: nowrap;
          transition: all var(--transition-fast);
        }
        .crop-filter-chip:hover {
          background: var(--color-primary-50);
          border-color: var(--color-primary-300);
        }
        .crop-filter-chip.active {
          background: var(--color-primary-700);
          color: #ffffff;
          border-color: var(--color-primary-700);
          font-weight: 600;
        }
        .retailer-results-section {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .results-header-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.92rem;
          color: var(--text-secondary);
        }
        .direct-call-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          color: var(--color-primary-700);
          font-weight: 600;
          font-size: 0.85rem;
        }
        .retailer-produce-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }
        @media (max-width: 960px) {
          .retailer-produce-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 640px) {
          .retailer-produce-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
