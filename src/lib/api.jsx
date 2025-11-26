import axios from "axios";

const API = process.env.NEXT_PUBLIC_API_BASE_URL;

// Get catalogue list
export const getCatalogue = async (page = 1, categorySlug = '') => {
  try {
    let url = `${API}/catalogue?page=${page}`;
    if (categorySlug) {
      url += `&slug=${categorySlug}`;
    }

    const res = await axios.get(url, {
      headers: {
        "spa-merchant-id": "v6eJxZKeRs8RmL0AfgtDwnQ",
        "spa-store-id": "1",
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
    let url = `${API}/product?sku=${sku}`;
    const res = await axios.get(url, {
      headers: {
        "spa-merchant-id": "v6eJxZKeRs8RmL0AfgtDwnQ",
        "spa-store-id": "1",
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
    const res = await axios.get(`${API}/categories`, {
      headers: {
        "spa-merchant-id": "v6eJxZKeRs8RmL0AfgtDwnQ",
        "spa-store-id": "1",
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
    if (!categorySlug) return { success: false, data: [] };

    const res = await axios.get(`${API}/sub/categories?category_id=${categorySlug}`, {
      headers: {
        "spa-merchant-id": "v6eJxZKeRs8RmL0AfgtDwnQ",
        "spa-store-id": "1",
      },
    });

    return res.data;
  } catch (error) {
    console.log("Subcategories API Error:", error);
    return { success: false, data: [] };
  }
};