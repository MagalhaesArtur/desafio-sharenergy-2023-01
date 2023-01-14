import axios from "axios";

export const api = axios.create({
  baseURL: "https://randomuser.me/api",
});

export const apiCrud = axios.create({
  baseURL: "http://localhost:4444",
});

export const GetRandomUsers = async () => {
  try {
    const token = localStorage.getItem("token");

    const responseCrud = await apiCrud.get("/auth", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (responseCrud.data.message != "ok") {
      return { message: "token inválido" };
    }

    const response = await api.get("/?page=1&results=500&seed=abc");
    return response.data.results;
  } catch (err: any) {
    return err.response.data.message;
  }
};
