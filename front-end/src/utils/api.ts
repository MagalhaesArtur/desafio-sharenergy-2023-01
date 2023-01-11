import axios from "axios";
import { AdmProps } from "./interfaces";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const LoginApi = async (login: string, password: string) => {
  try {
    const response = await api.post("/login", {
      login,
      password,
    });
    return response.data;
  } catch (err: any) {
    return err.response.data.error.message;
  }
};

export const GetUsers = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await api.get("/getUsers", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (err: any) {
    return err.response.data.error.message;
  }
};
