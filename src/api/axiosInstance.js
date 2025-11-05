import axios from "axios";
import { UNSAFE_createBrowserHistory } from "react-router-dom";
const API_BASE = "http://98.83.28.10:6006/api/v1";

const history = UNSAFE_createBrowserHistory();

// ✅ Create instance
const axiosInstance = axios.create({
  baseURL: API_BASE,
});

// ✅ Send token with each request
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  console.log("Token data", token);
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ✅ Auto refresh token logic (optional, if your backend supports /refresh)
axiosInstance.interceptors.response.use(
  (res) => res,
  async (err) => {
    const original = err.config;

    // Refresh logic only for already logged in users
    if (err.response?.status === 401 && !original._retry && localStorage.getItem("refreshToken")) {
      original._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        const res = await axios.post(`${API_BASE}/auth/refresh`, { refreshToken });

        const newToken = res?.data?.data?.accessToken;
        localStorage.setItem("accessToken", newToken);

        original.headers.Authorization = `Bearer ${newToken}`;
        return axios(original);
      } catch (refreshErr) {
        localStorage.clear(); // remove expired tokens
        return Promise.reject(refreshErr);
      }
    }

    // ❗Don't reload page here
    return Promise.reject(err);
  }
);

// axiosInstance.interceptors.response.use(
//   (res) => res,
//   async (err) => {
//     const original = err.config;
//     if (err.response?.status === 401 && !original._retry && localStorage.getItem("refreshToken")) {
//       original._retry = true;

//       const refreshToken = localStorage.getItem("refreshToken");
//       if (!refreshToken) {
//         window.location.href = "/login";
//         return;
//       }

//       const res = await axios.post(`${API_BASE}/auth/refresh`, { refreshToken });
//       const newToken = res?.data?.data?.accessToken;

//       localStorage.setItem("accessToken", newToken);
//       original.headers.Authorization = `Bearer ${newToken}`;

//       return axios(original);
//     }
//     return Promise.reject(err);
//   }
// );

export default axiosInstance;
