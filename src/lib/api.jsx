import axios from "axios";

const API = process.env.NEXT_PUBLIC_API_BASE_URL;

// Helper function to get store_id from localStorage
const getStoreId = () => {
  if (typeof window !== "undefined") {
    const storeId = localStorage.getItem("store_id");
    if (storeId) {
      return storeId;
    }

    const country = localStorage.getItem("selectedCountry");
    const countryStoreMap = {
      ae: "2",
      sa: "5", 
      om: "3",
    };
    return countryStoreMap[country] || "2";
  }
  return "2";
};

// Get category list
export const getConfig = async () => {
  try {
    const storeId = getStoreId();
    const res = await axios.get(`${API}/config`, {
      headers: {
        "spa-merchant-id": "v6eJxZKeRs8RmL0AfgtDwnQ",
        "spa-store-id": storeId,
      },
    });

    // if success then replace localStorage
    if (res.data?.success && res.data?.data) {
      localStorage.setItem("configData", JSON.stringify(res.data.data));
    }
    return res.data;
  } catch (error) {
    console.log("config API Error:", error);
    return { success: false, data: [] };
  }
};

// Get catalogue list
export const getCatalogue = async (page = 1, categorySlug = '') => {
  try {
    const storeId = getStoreId();
    let url = `${API}/catalogue?page=${page}`;
    if (categorySlug) {
      url += `&slug=${categorySlug}`;
    }
    const res = await axios.get(url, {
      headers: {
        "spa-merchant-id": "v6eJxZKeRs8RmL0AfgtDwnQ",
        "spa-store-id": storeId,
      },  
    });
    return res.data;
  } catch (error) {
    console.log("Catalogue API Error:", error);
    return { success: false, data: [] };
  }
};

// get product detail  
export const getProductDetails = async (sku = "") => {
  try {
    const storeId = getStoreId();
    let url = `${API}/product?sku=${sku}`;
    const res = await axios.get(url, {
      headers: {
        "spa-merchant-id": "v6eJxZKeRs8RmL0AfgtDwnQ",
        "spa-store-id": storeId,
      },
    });
    return res.data;
  } catch (error) {
    console.log("Catalogue API Error:", error);
    return { success: false, data: [] };
  }
};

// Get category list
export const getCategories = async () => {
  try {
    const storeId = getStoreId();
    const res = await axios.get(`${API}/categories`, {
      headers: {
        "spa-merchant-id": "v6eJxZKeRs8RmL0AfgtDwnQ",
        "spa-store-id": storeId,
      },
    });

    // if success then replace localStorage
    if (res.data?.success && res.data?.data) {
      localStorage.setItem("main_cat", JSON.stringify(res.data.data));
    }
    return res.data;
  } catch (error) {
    console.log("Categories API Error:", error);
    return { success: false, data: [] };
  }
};

// Fetch categories and save in localStorage
export const fetchAndSaveCategories = async () => {
  const res = await getCategories();
  if (res.success && res.data) {
    localStorage.setItem("main_cat", JSON.stringify(res.data));
    return res.data;
  } else {
    return [];
  }
};

// Get categories from localStorage
export const getLocalCategories = () => {
  const data = localStorage.getItem("main_cat");
  return data ? JSON.parse(data) : [];
};

// get sub category list  
export const getSubCategories = async (categorySlug = "") => {
  try {
    const storeId = getStoreId();
    if (!categorySlug) return { success: false, data: [] };
    const res = await axios.get(`${API}/sub/categories?category_id=${categorySlug}`, {
      headers: {
        "spa-merchant-id": "v6eJxZKeRs8RmL0AfgtDwnQ",
        "spa-store-id": storeId,
      },
    });

    return res.data;
  } catch (error) {
    console.log("Subcategories API Error:", error);
    return { success: false, data: [] };
  }
};

