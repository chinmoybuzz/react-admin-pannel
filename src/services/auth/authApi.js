import axiosInstance from "../../api/axiosInstance";

const BASE_URL = "/auth";

const authApi = {
  async login(data) {
    const res = await axiosInstance.post(`${BASE_URL}/login`, data);
    console.log("Login Response Data", res);
    return res.data;
  },

  async signup() {
    const res = await axiosInstance.post(`${BASE_URL}/login`);
    console.log("Login Response Data", res);
    return res.data;
  },

  async profile() {
    const res = await axiosInstance.post(`${BASE_URL}/profile`);
    console.log("Login Response Data", res);
    return res.data;
  },
};

export default authApi;
