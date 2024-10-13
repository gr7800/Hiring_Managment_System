import axios from "axios";
import { BaseUrl } from "../../utils/constant";

const API_URL = `${BaseUrl}/jobs`;

export const getAllJobs = async (searchTerm = "", page = 1, limit = 5) => {
  const response = await axios.get(
    `${API_URL}?searchTerm=${searchTerm}&page=${page}&limit=${limit}`
  );
  return response.data;
};

export const getJobById = async (jobId) => {
  const response = await axios.get(`${API_URL}/${jobId}`);
  return response.data;
};

export const createJob = async (jobData) => {
  const response = await axios.post(API_URL, jobData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

export const updateJob = async (jobId, jobData) => {
  const response = await axios.put(`${API_URL}/${jobId}`, jobData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

export const deleteJob = async (jobId) => {
  const response = await axios.delete(`${API_URL}/${jobId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

export const applyForJob = async (jobId) => {
  // Implement the logic for applying for a job
};
