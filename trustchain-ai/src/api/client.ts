import axios from 'axios';

// Updated to point to your live Render backend
const API_BASE_URL = "https://octo-qscm.onrender.com/api/v1";

export const api = axios.create({
  baseURL: API_BASE_URL,
});

export const runVerification = async (formData: FormData) => {
  const response = await api.post("/verify/run", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
