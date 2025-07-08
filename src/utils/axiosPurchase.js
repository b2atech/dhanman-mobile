import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const axiosPurchaseServices = axios.create({
  baseURL: "https://qa.purchase.dhanman.com/api/",
  timeout: 10000, // 10 seconds timeout
});

// ==============================|| AXIOS - FOR MOCK SERVICES ||============================== //
export const getAccessToken = async () => {
  try {
    const token = await AsyncStorage.getItem("userToken");
    if (token) {
      return token;
    } else {
      console.error("No access token found");
      return null;
    }
  } catch (error) {
    console.error("Error retrieving access token:", error);
    return null;
  }
};

// axiosPurchaseServices.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (
//       error.response &&
//       error.response.status === 401
//       // !window.location.href.includes('/login')
//     ) {
//       // window.location.pathname = '/maintenance/500';
//     }
//     const errorMessage =
//       typeof error?.response?.data === "string"
//         ? error.response.data
//         : "Wrong Services";
//     const errorObject = new Error(errorMessage);
//     return Promise.reject(errorObject);
//   }
// );

export default axiosPurchaseServices;

export const fetcher = async (url, config = {}) => {
  try {
    const token = await getAccessToken();
    console.log("Making request to:", url);
    console.log("Token available:", !!token);

    if (token) {
      config.headers = {
        ...config.headers,
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
    console.log("Response received:", res.status, res.statusText);
    return res.data;
  } catch (error) {
    console.error("Fetcher Error Details:", {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      url: error.config?.url,
      baseURL: error.config?.baseURL,
    });
    throw error;
  }
};

export const fetcherPost = async (url, config = {}) => {
  try {
    const token = await getAccessToken();
    console.log("com token", token);
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
    }
    const res = await axiosPurchaseServices.post(url, config.data, config);
    return res.data;
  } catch (error) {
    console.error("Fetcher Post Error:", error);
    throw error;
  }
};

export const fetcherPut = async (args) => {
  const [url, config] = Array.isArray(args) ? args : [args];

  const res = await axiosPurchaseServices.put(url, { ...config?.data });

  return res.data;
};
