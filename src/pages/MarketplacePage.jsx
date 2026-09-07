import React, { useState, useMemo } from "react";
import {
  Sparkles,
  Filter,
  Search,
  SlidersHorizontal,
  MapPin,
  Tractor,
  Store,
  Layers,
  Info,
  CheckCircle2,
  ArrowRight
} from "lucide-react";
import MatchCard from "../components/cards/MatchCard";
import MatchScore from "../components/common/MatchScore";
import EmptyState from "../components/common/EmptyState";
import Modal from "../components/common/Modal";
import { generateMarketplaceMatches } from "../engine/matchingEngine";
import { COMMON_CROPS, TAMILNADU_DISTRICTS } from "../data/mockData";

export default function MarketplacePage({
  produceList,
  requirementsList,
  onOpenDealModal
}) {
  const [selectedCrop, setSelectedCrop] = useState("All");
  const [selectedDistrict, setSelectedDistrict] = useState("All");
  const [minScore, setMinScore] = useState(50);
  const [searchQuery, setSearchQuery] = useState("");
  const [activePerspective, setActivePerspective] = useState("all"); // "all" | "high-yield" | "close-proximity"

  // Detailed modal inspection state
  const [inspectedMatch, setInspectedMatch] = useState(null);

  // Generate all pairs
  const allMatches = useMemo(() => {
    return generateMarketplaceMatches(produceList, requirementsList);
  }, [produceList, requirementsList]);

  // Apply filters
  const filteredMatches = useMemo(() => {
    return allMatches.filter((item) => {
      // Score filter
      if (item.matchScore < minScore) return false;

      // Crop filter
      if (selectedCrop !== "All" && item.produce.crop.toLowerCase() !== selectedCrop.toLowerCase()) {
        return false;
      }

      // District filter
      if (
        selectedDistrict !== "All" &&
        item.produce.district.toLowerCase() !== selectedDistrict.toLowerCase() &&
        item.requirement.preferredDistrict.toLowerCase() !== selectedDistrict.toLowerCase()
      ) {
        return false;
      }

      // Search query filter (crop, farmer, retailer, village)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchString = `${item.produce.crop} ${item.produce.farmerName} ${item.requirement.businessName} ${item.produce.district} ${item.produce.village}`.toLowerCase();
        if (!matchString.includes(q)) return false;
      }

      // Perspective quick filter
      if (activePerspective === "high-yield" && item.matchScore < 85) return false;
      if (
        activePerspective === "close-proximity" &&
        item.produce.district.toLowerCase() !== item.requirement.preferredDistrict.toLowerCase()
      ) {
        return false;
      }

      return true;
    });
  }, [allMatches, selectedCrop, selectedDistrict, minScore, searchQuery, activePerspective]);

  return (
    <div className="marketplace-page container">
      {/* ================= PAGE HEADER ================= */}
      <section className="marketplace-header">
        <div className="header-eyebrow">
          <Sparkles size={16} />
          <span>Module 3: Intelligent Compatibility Engine</span>
        </div>
        <h1 className="header-title">Smart Marketplace & Deals</h1>
        <p className="header-subtitle">
          Real-time algorithmic matching comparing agricultural supply with commercial procurement across 5 weighted dimensions.
        </p>

        {/* Algorithm Weights Banner */}
        <div className="algorithm-weights-bar">
          <span className="weights-label">Scoring Weights:</span>
          <div className="weight-pill">
            <strong>40%</strong> Crop Alignment
          </div>
          <div className="weight-pill">
            <strong>20%</strong> Quantity Compatibility
          </div>
          <div className="weight-pill">
            <strong>20%</strong> Location Proximity
          </div>
          <div className="weight-pill">
            <strong>10%</strong> Price Match
          </div>
          <div className="weight-pill">
            <strong>10%</strong> Harvest Timeline
          </div>
        </div>
      </section>

      {/* ================= CONTROLS & FILTER BAR ================= */}
      <section className="filter-panel card">
        <div className="search-row">
          <div className="search-input-wrap">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Search by crop, farmer name, buyer enterprise, or district..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-field"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="clear-search-btn">
                Clear
              </button>
            )}
          </div>

          {/* Quick Perspective Tabs */}
          <div className="perspective-tabs">
            <button
              className={`p-tab ${activePerspective === "all" ? "active" : ""}`}
              onClick={() => setActivePerspective("all")}
            >
              All Matches ({allMatches.length})
            </button>
            <button
              className={`p-tab ${activePerspective === "high-yield" ? "active" : ""}`}
              onClick={() => setActivePerspective("high-yield")}
            >
              High Relevance (85%+)
            </button>
            <button
              className={`p-tab ${activePerspective === "close-proximity" ? "active" : ""}`}
              onClick={() => setActivePerspective("close-proximity")}
            >
              Same District
            </button>
          </div>
        </div>

        <div className="filter-dropdowns-row">
          <div className="filter-item">
            <label className="f-label">Crop Filter:</label>
            <select
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value)}
              className="form-select filter-select"
            >
              <option value="All">All Crops ({allMatches.length})</option>
              {COMMON_CROPS.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="filter-item">
            <label className="f-label">District Hub:</label>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="form-select filter-select"
            >
              <option value="All">All Tamil Nadu Districts</option>
              {TAMILNADU_DISTRICTS.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          <div className="filter-item slider-item">
            <div className="slider-label-row">
              <label className="f-label">Min Match Score:</label>
              <strong className="slider-val">{minScore}%</strong>
            </div>
            <input
              type="range"
              min="50"
              max="95"
              step="5"
              value={minScore}
              onChange={(e) => setMinScore(Number(e.target.value))}
              className="range-slider"
            />
          </div>

          {(selectedCrop !== "All" || selectedDistrict !== "All" || minScore > 50 || searchQuery) && (
            <button
              onClick={() => {
                setSelectedCrop("All");
                setSelectedDistrict("All");
                setMinScore(50);
                setSearchQuery("");
                setActivePerspective("all");
              }}
              className="btn btn-outline btn-sm reset-filter-btn"
            >
              Reset Filters
            </button>
          )}
        </div>
      </section>

      {/* ================= RESULTS SECTION ================= */}
      <section className="results-section">
        <div className="results-meta">
          <span className="results-count">
            Showing <strong>{filteredMatches.length}</strong> verified farmer–buyer match opportunities
          </span>
          <span className="results-badge">
            <CheckCircle2 size={14} /> Zero Middleman Direct Pairing
          </span>
        </div>

        {filteredMatches.length === 0 ? (
          <EmptyState
            title="No matching trade pairs found"
            description="Try lowering the minimum match score threshold or broadening the crop and district filters."
            actionLabel="Reset All Filters"
            onAction={() => {
              setSelectedCrop("All");
              setSelectedDistrict("All");
              setMinScore(50);
              setSearchQuery("");
              setActivePerspective("all");
            }}
          />
        ) : (
          <div className="matches-grid">
            {filteredMatches.map((match) => (
              <MatchCard
                key={match.id}
                match={match}
                onOpenDetails={(m) => setInspectedMatch(m)}
                onInitiateDeal={(m) => onOpenDealModal(m)}
              />
            ))}
          </div>
        )}
      </section>

      {/* ================= DETAILED MATCH INSPECTION MODAL ================= */}
      {inspectedMatch && (
        <Modal
          isOpen={!!inspectedMatch}
          onClose={() => setInspectedMatch(null)}
          title={`Match Analysis: ${inspectedMatch.produce.crop}`}
          subtitle={`Compatibility breakdown between ${inspectedMatch.produce.farmerName} and ${inspectedMatch.requirement.businessName}`}
        >
          <div className="inspection-modal-content">
            {/* Visual Score Header */}
            <div className="inspect-score-banner">
              <div className="score-big-circle">
                <span className="score-big-num">{inspectedMatch.matchScore}%</span>
                <span className="score-big-label">Match</span>
              </div>
              <div className="inspect-score-summary">
                <h4>Algorithmic Evaluation</h4>
                <p>{inspectedMatch.matchDetails.summaryExplanation}</p>
              </div>
            </div>

            {/* 5 Weighted Factor Bars */}
            <div className="inspect-factors-card card">
              <h5 className="factors-heading">Weighted Scoring Factors</h5>
              <div className="factor-row-detailed">
                <div className="f-title-group">
                  <strong>Crop Variety Alignment (40%)</strong>
                  <span>{inspectedMatch.matchDetails.breakdown.crop} of 40 points</span>
                </div>
                <div className="f-bar-track">
                  <div
                    className="f-bar-fill"
                    style={{ width: `${(inspectedMatch.matchDetails.breakdown.crop / 40) * 100}%` }}
                  />
                </div>
              </div>

              <div className="factor-row-detailed">
                <div className="f-title-group">
                  <strong>Quantity Compatibility (20%)</strong>
                  <span>{inspectedMatch.matchDetails.breakdown.quantity} of 20 points</span>
                </div>
                <div className="f-bar-track">
                  <div
                    className="f-bar-fill"
                    style={{ width: `${(inspectedMatch.matchDetails.breakdown.quantity / 20) * 100}%` }}
                  />
                </div>
              </div>

              <div className="factor-row-detailed">
                <div className="f-title-group">
                  <strong>Location Proximity (20%)</strong>
                  <span>{inspectedMatch.matchDetails.breakdown.location} of 20 points</span>
                </div>
                <div className="f-bar-track">
                  <div
                    className="f-bar-fill"
                    style={{ width: `${(inspectedMatch.matchDetails.breakdown.location / 20) * 100}%` }}
                  />
                </div>
              </div>

              <div className="factor-row-detailed">
                <div className="f-title-group">
                  <strong>Price Fit (10%)</strong>
                  <span>{inspectedMatch.matchDetails.breakdown.price} of 10 points</span>
                </div>
                <div className="f-bar-track">
                  <div
                    className="f-bar-fill"
                    style={{ width: `${(inspectedMatch.matchDetails.breakdown.price / 10) * 100}%` }}
                  />
                </div>
              </div>

              <div className="factor-row-detailed">
                <div className="f-title-group">
                  <strong>Harvest & Availability Alignment (10%)</strong>
                  <span>{inspectedMatch.matchDetails.breakdown.availability} of 10 points</span>
                </div>
                <div className="f-bar-track">
                  <div
                    className="f-bar-fill"
                    style={{ width: `${(inspectedMatch.matchDetails.breakdown.availability / 10) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Side-by-side specs */}
            <div className="inspect-specs-grid">
              <div className="spec-side card">
                <span className="spec-side-badge badge-green">Producer Offer</span>
                <h4>{inspectedMatch.produce.farmerName}</h4>
                <p className="spec-loc">
                  <MapPin size={13} /> {inspectedMatch.produce.village}, {inspectedMatch.produce.district}
                </p>
                <div className="spec-items">
                  <div>Crop: <strong>{inspectedMatch.produce.crop} ({inspectedMatch.produce.variety || "Table Grade"})</strong></div>
                  <div>Supply Volume: <strong>{inspectedMatch.produce.quantity} {inspectedMatch.produce.unit}</strong></div>
                  <div>Expected Price: <strong className="text-green">₹{inspectedMatch.produce.expectedPrice}/{inspectedMatch.produce.unit}</strong></div>
                  <div>Harvest Window: <strong>{inspectedMatch.produce.availableFrom} to {inspectedMatch.produce.availableUntil}</strong></div>
                </div>
              </div>

              <div className="spec-side card">
                <span className="spec-side-badge badge-amber">Buyer Requirement</span>
                <h4>{inspectedMatch.requirement.businessName}</h4>
                <p className="spec-loc">
                  <MapPin size={13} /> {inspectedMatch.requirement.preferredLocation}
                </p>
                <div className="spec-items">
                  <div>Crop Required: <strong>{inspectedMatch.requirement.crop}</strong></div>
                  <div>Procurement Need: <strong>{inspectedMatch.requirement.quantity} {inspectedMatch.requirement.unit}</strong></div>
                  <div>Target Budget: <strong className="text-accent">₹{inspectedMatch.requirement.minBudget}–₹{inspectedMatch.requirement.maxBudget}/{inspectedMatch.requirement.unit}</strong></div>
                  <div>Needed By: <strong>{inspectedMatch.requirement.requiredBy}</strong></div>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="inspect-modal-actions">
              <button
                type="button"
                onClick={() => setInspectedMatch(null)}
                className="btn btn-secondary"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  const m = inspectedMatch;
                  setInspectedMatch(null);
                  onOpenDealModal(m);
                }}
                className="btn btn-primary"
              >
                <span>Proceed to Initiate Deal</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Modal>
      )}

      <style>{`
        .marketplace-page {
          padding-top: 2.5rem;
          padding-bottom: 4rem;
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        .marketplace-header {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          max-width: 860px;
          margin: 0 auto;
        }
        .header-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.82rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--color-primary-600);
          background-color: var(--color-primary-50);
          padding: 0.35rem 0.9rem;
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
          margin-bottom: 1.5rem;
        }
        .algorithm-weights-bar {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          flex-wrap: wrap;
          justify-content: center;
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          padding: 0.5rem 1rem;
          border-radius: var(--radius-full);
          box-shadow: var(--shadow-xs);
        }
        .weights-label {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .weight-pill {
          font-size: 0.78rem;
          background: var(--color-primary-50);
          color: var(--color-primary-800);
          padding: 0.2rem 0.6rem;
          border-radius: var(--radius-full);
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
        }
        .weight-pill strong {
          color: var(--color-primary-600);
        }
        .filter-panel {
          padding: 1.5rem;
          border-radius: var(--radius-xl);
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .search-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .search-input-wrap {
          position: relative;
          flex: 1;
          min-width: 300px;
        }
        .search-icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted);
        }
        .search-field {
          width: 100%;
          padding: 0.75rem 1rem 0.75rem 2.75rem;
          border-radius: var(--radius-full);
          border: 1px solid var(--border-medium);
          background: var(--bg-surface-subtle);
          font-size: 0.92rem;
          outline: none;
          transition: all var(--transition-fast);
        }
        .search-field:focus {
          background: #ffffff;
          border-color: var(--color-primary-500);
          box-shadow: 0 0 0 3px rgba(45, 106, 79, 0.12);
        }
        .clear-search-btn {
          position: absolute;
          right: 1rem;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          font-size: 0.75rem;
          color: var(--text-muted);
          cursor: pointer;
        }
        .perspective-tabs {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          background: var(--bg-surface-subtle);
          padding: 0.3rem;
          border-radius: var(--radius-full);
          border: 1px solid var(--border-subtle);
        }
        .p-tab {
          background: none;
          border: none;
          padding: 0.45rem 0.85rem;
          border-radius: var(--radius-full);
          font-size: 0.82rem;
          font-weight: 500;
          color: var(--text-secondary);
          cursor: pointer;
          transition: all var(--transition-fast);
        }
        .p-tab.active {
          background: #ffffff;
          color: var(--color-primary-800);
          font-weight: 700;
          box-shadow: var(--shadow-xs);
        }
        .filter-dropdowns-row {
          display: flex;
          align-items: flex-end;
          gap: 1.25rem;
          flex-wrap: wrap;
          padding-top: 0.5rem;
          border-top: 1px solid var(--border-subtle);
        }
        .filter-item {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }
        .f-label {
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--text-muted);
          text-transform: uppercase;
        }
        .filter-select {
          min-width: 180px;
          padding: 0.55rem 0.85rem;
          font-size: 0.88rem;
        }
        .slider-item {
          min-width: 200px;
        }
        .slider-label-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .slider-val {
          font-size: 0.82rem;
          color: var(--color-primary-700);
        }
        .range-slider {
          width: 100%;
          accent-color: var(--color-primary-600);
          cursor: pointer;
        }
        .reset-filter-btn {
          margin-bottom: 2px;
        }
        .results-section {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .results-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.9rem;
          color: var(--text-secondary);
        }
        .results-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          color: var(--color-primary-700);
          font-weight: 600;
          font-size: 0.82rem;
        }
        .matches-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
        }
        .inspection-modal-content {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .inspect-score-banner {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          background: var(--color-primary-50);
          border: 1px solid var(--color-primary-100);
          padding: 1.25rem 1.5rem;
          border-radius: var(--radius-lg);
        }
        .score-big-circle {
          width: 72px;
          height: 72px;
          border-radius: var(--radius-full);
          background: #ffffff;
          border: 3px solid var(--color-success);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          box-shadow: var(--shadow-sm);
        }
        .score-big-num {
          font-family: var(--font-heading);
          font-size: 1.35rem;
          font-weight: 800;
          color: var(--color-success);
          line-height: 1;
        }
        .score-big-label {
          font-size: 0.65rem;
          text-transform: uppercase;
          font-weight: 700;
          color: var(--text-muted);
        }
        .inspect-score-summary h4 {
          color: var(--color-primary-900);
          margin-bottom: 0.25rem;
        }
        .inspect-score-summary p {
          font-size: 0.88rem;
          color: var(--text-secondary);
          line-height: 1.45;
        }
        .inspect-factors-card {
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }
        .factors-heading {
          font-size: 0.82rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--text-muted);
          margin-bottom: 0.25rem;
        }
        .factor-row-detailed {
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
        }
        .f-title-group {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.82rem;
        }
        .f-title-group strong {
          color: var(--text-main);
        }
        .f-title-group span {
          color: var(--text-muted);
          font-size: 0.78rem;
        }
        .f-bar-track {
          height: 8px;
          background: var(--bg-surface-subtle);
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-full);
          overflow: hidden;
        }
        .f-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--color-primary-400), var(--color-primary-600));
          border-radius: var(--radius-full);
        }
        .inspect-specs-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }
        .spec-side {
          padding: 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }
        .spec-side-badge {
          width: fit-content;
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          margin-bottom: 0.2rem;
          padding: 0.1rem 0.5rem;
          border-radius: var(--radius-sm);
        }
        .badge-green {
          background: var(--color-primary-100);
          color: var(--color-primary-800);
        }
        .badge-amber {
          background: var(--color-accent-100);
          color: var(--color-accent-800);
        }
        .spec-loc {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          font-size: 0.8rem;
          color: var(--text-muted);
          margin-bottom: 0.5rem;
        }
        .spec-items {
          font-size: 0.82rem;
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
          color: var(--text-secondary);
        }
        .spec-items strong {
          color: var(--text-main);
        }
        .inspect-modal-actions {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 0.75rem;
          padding-top: 0.5rem;
        }

        @media (max-width: 900px) {
          .matches-grid {
            grid-template-columns: 1fr;
          }
          .inspect-specs-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
