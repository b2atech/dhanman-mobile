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

// axiosCommunityServices.interceptors.request.use(
//   async config => {
//     try {
//       // config.headers[
//       //   'Authorization'
//       // ] = `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IloxenFhbmlBZWowRWlyN1ZVZ281VCJ9.eyJkaGFubWFuX2lkIjoiNjU5NGE5MmMtYjJjNC00ZjAyLTk3ZmMtNTY4MjI2ZTYxMmJmIiwiZGhhbm1hbl9wZXJtaXNzaW9ucyI6WyJTWVNfQURNSU4iLCJDQSIsIk9XTkVSIl0sImRoYW5tYW5fY29tcGFueSI6eyJkZXNjcmlwdGlvbiI6IkFwYXJ0bWVudCBNeUhvbWUgIiwiZ3N0SW4iOiIyN0ZHSElKNTY3OEszTDgiLCJpZCI6IjEyZmI1MGYwLTk5OTgtNDU2Zi04YWVlLWJiODNhYjJmYmJkYiIsImlzQXBhcnRtZW50Ijp0cnVlLCJuYW1lIjoiQXNwZW4gV29vZHMgQXBhcnRtZW50Iiwib3JnYW5pemF0aW9uSWQiOiIzNzQzN2UxNy1jMGUyLTRlOTctODE2Ny0xMjFiODU0ZmU5MGIifSwiZGhhbm1hbl9vcmdhbml6YXRpb24iOnsiZ3N0SW4iOiJBQUxDQjA3ODZBIiwiaWQiOiIzNzQzN2UxNy1jMGUyLTRlOTctODE2Ny0xMjFiODU0ZmU5MGIiLCJuYW1lIjoiQjJBIFRlY2ggT3JnYW5pemF0aW9uIiwicGFuIjoiQUFMQ0IwNzg2QSIsInNob3J0TmFtZSI6IkIyQSIsInRhbiI6IktMUEIwMzM3M0cifSwiaXNzIjoiaHR0cHM6Ly9kZXYtZGhhbm1hbi51cy5hdXRoMC5jb20vIiwic3ViIjoiZ29vZ2xlLW9hdXRoMnwxMTcxNzE3NDU3MjYyNTg3MTk5NDQiLCJhdWQiOlsiZGV2LWRoYW5tYW4tYXBpIiwiaHR0cHM6Ly9kZXYtZGhhbm1hbi51cy5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNzI1MzQyNTMzLCJleHAiOjE3MjU0Mjg5MzMsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwiLCJhenAiOiIyYVpic1VDdVNLNTNYQjdzZE9LVGhGMGNDaFZEWHgyOCJ9.pJSWpC52O3gV2O9GE1KRGYWScxxwWQ891c6PtWEoAn8WdqCO16DN7VvMmHGR_C98qz44wmOPxgeMsvIJ19D0zcxJZBtCT6ISW-mZdw379x8W1vDpce1pvRtMWB-W7x5TGEdP0Xo619Y8FYWh5deX4PGmENx6Fhzv2S9m1buSkgQCJzp4T6H1HX_pCNoS4W0VKvmG9-F1HWblk1BSj9Z4k6iGEqZwQWtJAeTDZjb4oNUHb_780wSA9iu-YwIU2AsgYZVRNlujKk5NyriqpLuByLbdEb5BXkq8NNFAAgQsj4MEGemqZJrEAHLDnmit8aCWiJVrEeuDDVNb0exsgCb3eQ`;

//       const accessToken = await AsyncStorage.getItem('userToken');
//       console.log('Retrieved token from AsyncStorage:', accessToken);
//       if (accessToken) {
//         console.log('Bearer', accessToken);
//         config.headers['Authorization'] = `Bearer ${accessToken}`;
//       }
//     } catch (error) {
//       console.error('Error retrieving token from AsyncStorage:', error);
//     }
//     return config;
//   },
//   error => {
//     const errorMessage = 'Something went wrong: ' + error.message;
//     const customError = new Error(errorMessage);
//     return Promise.reject(customError);
//   },
// );

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
