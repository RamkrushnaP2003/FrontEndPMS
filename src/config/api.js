import axios from "axios";

export const API_BASE_URL = "http://localhost:2024";
export const CHAT_GPT_API_KEY = "AIzaSyDTqI37_ZFU2GUS2bWFVZd2BbIjWAn7ckg";

const api = axios.create({ baseURL: API_BASE_URL });

const jwt = localStorage.getItem("jwt");

api.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
api.defaults.headers.post["Content-Type"] = "application/json";

export default api;
