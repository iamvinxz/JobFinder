import axios from "axios";

export const myAxios = axios.create({
    baseURL: process.env.API_BASE_URL || "http://localhost:8000/api",
    headers: {
        Authorization: `Bearer ${localStorage.getItem('Token')}`
    }
})





























