import React, { useState } from "react";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import Toast from "./components/common/Toast";

// Pages
import HomePage from "./pages/HomePage";
import FarmerPage from "./pages/FarmerPage";
import RetailerPage from "./pages/RetailerPage";
import ProjectInfoPage from "./pages/ProjectInfoPage";
import DeveloperPage from "./pages/DeveloperPage";

// Storage
import { StorageService } from "./data/storage";

export default function App() {
  const [activePage, setActivePage] = useState("home");

  // State
  const [farmers, setFarmers] = useState(() => StorageService.getFarmers());
  const [activeFarmer, setActiveFarmer] = useState(() => StorageService.getActiveFarmer());
  const [produceList, setProduceList] = useState(() => StorageService.getProduceList());

  // Toasts
  const [toasts, setToasts] = useState([]);

  const addToast = (toast) => {
    const id = Date.now() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { ...toast, id }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const dismissToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Farmer handlers
  const handleSetActiveFarmerId = (id) => {
    StorageService.setActiveFarmerId(id);
    const found = farmers.find((f) => f.id === id);
    if (found) {
      setActiveFarmer(found);
      addToast({
        type: "info",
        title: "Farmer Switched",
        message: `Active profile: ${found.name} (${found.location})`
      });
    }
  };

  const handleUpdateFarmerProfile = (updatedProfile) => {
    const saved = StorageService.updateFarmerProfile(updatedProfile);
    setFarmers(StorageService.getFarmers());
    setActiveFarmer(saved);
    addToast({
      type: "success",
      title: "Profile Saved",
      message: `Updated contact: ${saved.name} (${saved.phone})`
    });
  };

  const handleAddProduce = (produceItem) => {
    const added = StorageService.addProduce(produceItem);
    setProduceList(StorageService.getProduceList());
    addToast({
      type: "success",
      title: "Produce Posted Successfully!",
      message: `${added.crop} (${added.quantity} ${added.unit}) is now visible to all retailers.`
    });
  };

  const handleDeleteProduce = (id) => {
    const updated = StorageService.deleteProduce(id);
    setProduceList(updated);
    addToast({
      type: "info",
      title: "Listing Removed",
      message: "Produce listing has been removed."
    });
  };

  const handleResetData = () => {
    if (window.confirm("Reset produce and farmer listings back to default demo state?")) {
      StorageService.resetToDemoData();
      setFarmers(StorageService.getFarmers());
      setActiveFarmer(StorageService.getActiveFarmer());
      setProduceList(StorageService.getProduceList());
      addToast({
        type: "info",
        title: "Demo Data Restored",
        message: "Prototype state has been reset to default."
      });
    }
  };

  return (
    <div className="app-layout">
      {/* Top Navbar */}
      <Navbar
        activePage={activePage}
        setActivePage={setActivePage}
        produceCount={produceList.length}
      />

      {/* Main Content */}
      <main className="main-content">
        {activePage === "home" && (
          <HomePage
            setActivePage={setActivePage}
            produceList={produceList}
          />
        )}

        {activePage === "farmer" && (
          <FarmerPage
            farmers={farmers}
            activeFarmer={activeFarmer}
            setActiveFarmerId={handleSetActiveFarmerId}
            onUpdateFarmerProfile={handleUpdateFarmerProfile}
            produceList={produceList}
            onAddProduce={handleAddProduce}
            onDeleteProduce={handleDeleteProduce}
          />
        )}

        {activePage === "retailer" && (
          <RetailerPage
            produceList={produceList}
          />
        )}

        {activePage === "project-info" && (
          <ProjectInfoPage setActivePage={setActivePage} />
        )}

        {activePage === "developer" && (
          <DeveloperPage />
        )}
      </main>

      {/* Reset Demo Data Bar */}
      <div className="prototype-status-bar">
        <span className="proto-tag">ULAVU</span>
        <span>•</span>
        <span>Simple Direct Marketplace</span>
        <span>•</span>
        <button onClick={handleResetData} className="proto-reset-btn">
          Reset Demo Data
        </button>
      </div>

      {/* Footer */}
      <Footer setActivePage={setActivePage} />

      {/* Toast Notifications */}
      <Toast toasts={toasts} onDismiss={dismissToast} />

      <style>{`
        .app-layout {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }
        .prototype-status-bar {
          position: fixed;
          bottom: 1rem;
          left: 1.5rem;
          background: rgba(15, 39, 29, 0.94);
          backdrop-filter: blur(8px);
          color: #d1ded5;
          padding: 0.35rem 0.85rem;
          border-radius: var(--radius-full);
          font-size: 0.75rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          z-index: 90;
          box-shadow: var(--shadow-md);
        }
        .proto-tag {
          color: var(--color-accent-400);
          font-weight: 700;
        }
        .proto-reset-btn {
          background: none;
          border: none;
          color: #95d5b2;
          cursor: pointer;
          font-size: 0.75rem;
          text-decoration: underline;
          padding: 0;
        }
        .proto-reset-btn:hover {
          color: #ffffff;
        }
        @media (max-width: 768px) {
          .prototype-status-bar {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
