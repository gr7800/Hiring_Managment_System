import axios from "axios";
import { BaseUrl } from "../../utils/constant";

const API_URL = `${BaseUrl}/applications`;

const getToken = () => localStorage.getItem("token");

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});

const handleResponse = async (promise) => {
  try {
    const response = await promise;
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const applyToJob = async (jobId, resumeUrl) => {
  return handleResponse(apiClient.post(`/${jobId}/apply`, { resumeUrl }));
};

export const getApplicationsForJob = async (jobId) => {
  return handleResponse(apiClient.get(`/${jobId}/applications`));
};

export const updateApplicationStatus = async (applicationId, status) => {
  return handleResponse(apiClient.put(`/${applicationId}/status`, { status }));
};

export const getApplicationDetails = async (applicationId) => {
  return handleResponse(apiClient.get(`/details/${applicationId}`));
};
