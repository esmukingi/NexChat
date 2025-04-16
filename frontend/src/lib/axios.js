import axios from "axios";

export const axiosInstance = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:5000/api"
      : "https://560a-2c0f-fe30-4406-0-88d-1557-daa1-44e7.ngrok-free.app/api",
  withCredentials: true,
});
