import axios from "axios";
const BaseUrl = import.meta.env.VITE_BASEURL;

const API_URL = `${BaseUrl}/users`;

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const handleResponse = async (promise) => {
  const response = await promise;
  return response.data;
};

export const registerUserService = async (userData) => {
  return handleResponse(
    axios.post(`${API_URL}/register`, userData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
  );
};

export const loginUserService = async (userData) => {
  return handleResponse(
    axios.post(`${API_URL}/login`, userData, {
      headers: { "Content-Type": "application/json" },
    })
  );
};

export const fetchUserProfileService = async () => {
  return handleResponse(
    axios.get(`${API_URL}/profile`, {
      headers: getAuthHeader(),
    })
  );
};

export const updateUserProfileService = async (userData) => {
  return handleResponse(
    axios.put(`${API_URL}/profile`, userData, {
      headers: { ...getAuthHeader(), "Content-Type": "multipart/form-data" },
    })
  );
};
