import axios from "axios";
import { AdmProps, ClientsProps } from "./interfaces";

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
    return err.response.data.message;
  }
};

export const CreateUser = async (client: Partial<ClientsProps>) => {
  try {
    const token = localStorage.getItem("token");
    const response = await api.post("/createUser", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        client,
      },
    });

    return response;
  } catch (err: any) {
    console.log(err);
    return err.response.data.erro.message || err.data.message;
  }
};

export const AttUser = async (client: ClientsProps) => {
  try {
    const token = localStorage.getItem("token");
    const response = await api.post("/attUser", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        client,
      },
    });

    return response;
  } catch (err: any) {
    console.log(err);
    return err.response;
  }
};

export const DeleteUser = async (userId: string) => {
  try {
    const token = localStorage.getItem("token");
    const response = await api.delete("/deleteUser", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        userId,
      },
    });
    return response;
  } catch (err: any) {
    return err.response.data.error.message;
  }
};
