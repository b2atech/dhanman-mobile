import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const axiosPurchaseServices = axios.create({
  baseURL: "https://qa.purchase.dhanman.com/api/",
  timeout: 10000, // 10 seconds timeout
});

const getAccessToken = async () => {
  try {
    const token = await AsyncStorage.getItem("userToken");
    if (token) {
      console.log("Token retrieved successfully:", token);
      return token;
    } else {
      console.error("No access token found in AsyncStorage");
      return null;
    }
  } catch (error) {
    console.error("Error retrieving access token:", error);
    return null;
  }
};

axiosPurchaseServices.interceptors.request.use(
  async (config) => {
    const token = await getAccessToken();
    if (token) {
      console.log("Adding token to request headers:", token);
      config.headers["Authorization"] = `Bearer ${token}`;
    } else {
      console.error("No token available for request");
    }
    return config;
  },
  (error) => {
    console.error("Request Interceptor Error:", error);
    return Promise.reject(error);
  }
);

export default axiosPurchaseServices;

export const fetcher = async (url, config = {}) => {
  try {
    const token = await getAccessToken();
    console.log("Making request to:", url);
    console.log("Token available:", !!token);
    console.log("Config", config);

    if (token) {
      config.headers = {
        ...config.headers,
        "x-organization-id": "37437e17-c0e2-4e97-8167-121b854fe90b",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
    }

    console.log("Request config:", {
      url,
      method: "GET",
      headers: config.headers,
      baseURL: axiosPurchaseServices.defaults.baseURL,
    });

    const res = await axiosPurchaseServices.get(url, { ...config });
    console.log("Response received:", res);
    return res.data;
  } catch (error) {
    console.error("Fetcher Error Details:", {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      url: error.config?.url,
      baseURL: error.config?.baseURL,
      authorization: error.Authorization,
      error: error.error,
      errorMessage: error.errorMessage,
    });
    throw error;
  }
};

export const fetcherPost = async (url, data = {}, config = {}) => {
  try {
    const token = await getAccessToken();
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
    }
    // Fix: Pass data separately
    const res = await axiosPurchaseServices.post(url, data, config);

    return res.data;
  } catch (error) {
    console.error("Fetcher Post Error:", error);
    throw error;
  }
};

export const fetcherPut = async (url, data = {}, config = {}) => {
  try {
    const token = await getAccessToken();
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
    }
    const res = await axiosPurchaseServices.put(url, data, config);
    return res.data;
  } catch (error) {
    console.error("Fetcher Put Error:", error);
    throw error;
  }
};
