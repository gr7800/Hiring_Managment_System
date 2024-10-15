import axios from "axios";
import { BaseUrl } from "../../utils/constant";

const API_URL = `${BaseUrl}/jobs`;

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

const handleResponse = async (promise) => {
  try {
    const response = await promise;
    return response.data;
  } catch (error) {
    const errorMsg = error.response ? error.response.data : { message: "Network Error" };
    throw errorMsg;
  }
};

export const getAllJobs = async (searchTerm = "", page = 1, limit = 5) => {
  return handleResponse(
    axios.get(`${API_URL}`, {
      params: { searchTerm, page, limit },
    })
  );
};

export const getJobById = async (jobId) => {
  return handleResponse(apiClient.get(`/singlejob/${jobId}`));
};

export const getMyJob = async (page = 1, limit = 10, sort = "updatedAt", order = "desc") => {
  return handleResponse(
    apiClient.get("/my-jobs", {
      params: { page, limit, sort, order },
    })
  );
};

export const createJob = async (jobData) => {
  return handleResponse(apiClient.post("/", jobData));
};

export const updateJob = async (jobId, jobData) => {
  return handleResponse(apiClient.put(`/${jobId}`, jobData));
};

export const deleteJob = async (jobId) => {
  return handleResponse(apiClient.delete(`/${jobId}`));
};

