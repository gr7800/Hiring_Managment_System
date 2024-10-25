import axios from "axios";
const BaseUrl = import.meta.env.VITE_BASEURL;

const API_URL = `${BaseUrl}/jobs`;

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const handleResponse = async (promise) => {
  try {
    const response = await promise;
    return response.data;
  } catch (error) {
    // console.log(error)
    const errorMsg = error.response?.data?.message || "Network Error";
    throw new Error(errorMsg);
  }
};

export const getAllJobs = async (searchTerm = "", page = 1, limit = 5) => {
  return handleResponse(
    axios.get(`${API_URL}`, {
      params: { searchTerm, page, limit },
      headers: getAuthHeader(),
    })
  );
};

export const getJobById = async (jobId) => {
  return handleResponse(
    axios.get(`${API_URL}/singlejob/${jobId}`, { headers: getAuthHeader() })
  );
};

export const getMyJob = async (
  page = 1,
  limit = 10,
  sort = "updatedAt",
  order = "desc"
) => {
  return handleResponse(
    axios.get(`${API_URL}/my-jobs`, {
      params: { page, limit, sort, order },
      headers: getAuthHeader(),
    })
  );
};

export const createJob = async (jobData) => {
  return handleResponse(
    axios.post(`${API_URL}`, jobData, { headers: getAuthHeader() })
  );
};

export const updateJob = async (jobId, jobData) => {
  return handleResponse(
    axios.put(`${API_URL}/${jobId}`, jobData, { headers: getAuthHeader() })
  );
};

export const deleteJob = async (jobId) => {
  return handleResponse(
    axios.delete(`${API_URL}/${jobId}`, { headers: getAuthHeader() })
  );
};
