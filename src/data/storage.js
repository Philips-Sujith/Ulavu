// Clean LocalStorage Persistence for ULAVU
import { INITIAL_FARMERS, INITIAL_PRODUCE } from "./mockData";

const STORAGE_KEYS = {
  FARMERS: "ulavu_farmers_v2",
  PRODUCE: "ulavu_produce_v2",
  ACTIVE_FARMER_ID: "ulavu_active_farmer_id_v2"
};

function getStorage(key, fallback) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    return fallback;
  }
}

function setStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(e);
  }
}

export const StorageService = {
  getFarmers: () => getStorage(STORAGE_KEYS.FARMERS, INITIAL_FARMERS),
  saveFarmers: (farmers) => setStorage(STORAGE_KEYS.FARMERS, farmers),

  getActiveFarmer: () => {
    const farmers = StorageService.getFarmers();
    const activeId = localStorage.getItem(STORAGE_KEYS.ACTIVE_FARMER_ID) || "farmer-1";
    return farmers.find((f) => f.id === activeId) || farmers[0];
  },

  setActiveFarmerId: (id) => {
    localStorage.setItem(STORAGE_KEYS.ACTIVE_FARMER_ID, id);
  },

  updateFarmerProfile: (updated) => {
    const farmers = StorageService.getFarmers();
    const idx = farmers.findIndex((f) => f.id === updated.id);
    if (idx !== -1) {
      farmers[idx] = { ...farmers[idx], ...updated };
    } else {
      farmers.push(updated);
    }
    StorageService.saveFarmers(farmers);
    return updated;
  },

  getProduceList: () => getStorage(STORAGE_KEYS.PRODUCE, INITIAL_PRODUCE),
  saveProduceList: (list) => setStorage(STORAGE_KEYS.PRODUCE, list),

  addProduce: (item) => {
    const list = StorageService.getProduceList();
    const newItem = {
      ...item,
      id: `prod-${Date.now()}`,
      postedAt: "Just now"
    };
    list.unshift(newItem);
    StorageService.saveProduceList(list);
    return newItem;
  },

  deleteProduce: (id) => {
    const list = StorageService.getProduceList().filter((p) => p.id !== id);
    StorageService.saveProduceList(list);
    return list;
  },

  resetToDemoData: () => {
    localStorage.setItem(STORAGE_KEYS.FARMERS, JSON.stringify(INITIAL_FARMERS));
    localStorage.setItem(STORAGE_KEYS.PRODUCE, JSON.stringify(INITIAL_PRODUCE));
    localStorage.setItem(STORAGE_KEYS.ACTIVE_FARMER_ID, "farmer-1");
  }
};
