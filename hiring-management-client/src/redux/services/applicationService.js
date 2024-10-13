import axios from "axios";
import { BaseUrl } from "../../utils/constant";

const API_URL = `${BaseUrl}/applications`;

const getToken = () => localStorage.getItem("token");

export const applyToJob = async (jobId, resumeUrl) => {
  const token = getToken();
  const response = await axios.post(
    `${API_URL}/${jobId}/apply`,
    { resumeUrl },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

export const getApplicationsForJob = async (jobId) => {
  const token = getToken();
  const response = await axios.get(`${API_URL}/${jobId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const updateApplicationStatus = async (applicationId, status) => {
  const token = getToken();
  const response = await axios.put(
    `${API_URL}/${applicationId}`,
    { status },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

export const getApplicationDetails = async (applicationId) => {
  const token = getToken();
  const response = await axios.get(`${API_URL}/details/${applicationId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
