import axios from 'axios';

// This matches your FastAPI uvicorn port
const API_BASE_URL = "http://localhost:8000/api/v1";

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