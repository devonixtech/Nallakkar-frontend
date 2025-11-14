import localforage from "localforage";

// ✅ Configure localForage
localforage.config({
  name: "NallakkarApp",          
  storeName: "user_data",        
  description: "Stores user info, buynow, and addresses safely",
});

/* -----------------------------------------------------------
   🧩 Generic Helper Functions
----------------------------------------------------------- */

// Save any key/value pair
export const setItem = async (key, value) => {
  try {
    await localforage.setItem(key, value);
  } catch (error) {
    console.error(`❌ Failed to save ${key}:`, error);
  }
};

// Get any stored value
export const getItem = async (key) => {
  try {
    return await localforage.getItem(key);
  } catch (error) {
    console.error(`❌ Failed to get ${key}:`, error);
    return null;
  }
};

// Remove any key
export const removeItem = async (key) => {
  try {
    await localforage.removeItem(key);
  } catch (error) {
    console.error(`❌ Failed to remove ${key}:`, error);
  }
};

// Clear all app storage (useful on logout)
export const clearStorage = async () => {
  try {
    await localforage.clear();
  } catch (error) {
    console.error("❌ Failed to clear storage:", error);
  }
};
