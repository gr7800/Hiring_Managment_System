import axios from "axios";
import { BaseUrl } from "../../utils/constant";

const API_URL = `${BaseUrl}/users`;

const apiClient = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "multipart/form-data" },
});

const handleResponse = async (promise) => {
  try {
    const response = await promise;
    return response.data;
  } catch (error) {
    const errorMsg = error.response
      ? error.response.data
      : { message: "Network Error" };
    throw errorMsg;
  }
};

export const registerUserService = async (userData) => {
  return handleResponse(apiClient.post("/register", userData));
};

export const loginUserService = async (userData) => {
  return handleResponse(
    axios.post(`${API_URL}/login`, userData, {
      headers: { "Content-Type": "application/json" },
    })
  );
};

export const fetchUserProfileService = async (token) => {
  return handleResponse(
    axios.get(`${API_URL}/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    })
  );
};

export const updateUserProfileService = async (userData, token) => {
  return handleResponse(
    axios.put(`${API_URL}/profile`, userData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  );
};
