import axios from "axios";
const BaseUrl = import.meta.env.VITE_BASEURL;

const API_URL = `${BaseUrl}/applications`;

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const handleResponse = async (promise) => {
  try {
    const response = await promise;
    return response.data;
  } catch (error) {
    const errorMsg = error.response?.data?.message || "Network Error";
    throw new Error(errorMsg);
  }
};

export const applyToJob = async (jobId, resumeUrl) => {
  return handleResponse(
    axios.post(
      `${API_URL}/${jobId}/apply`,
      { resumeUrl },
      { headers: getAuthHeader() }
    )
  );
};

export const getApplicationsForJob = async (jobId) => {
  return handleResponse(
    axios.get(`${API_URL}/${jobId}/applications`, { headers: getAuthHeader() })
  );
};

export const updateApplicationStatus = async (applicationId, status) => {
  return handleResponse(
    axios.put(
      `${API_URL}/${applicationId}/status`,
      { status },
      { headers: getAuthHeader() }
    )
  );
};

export const getApplicationDetails = async (applicationId) => {
  return handleResponse(
    axios.get(`${API_URL}/details/${applicationId}`, {
      headers: getAuthHeader(),
    })
  );
};
