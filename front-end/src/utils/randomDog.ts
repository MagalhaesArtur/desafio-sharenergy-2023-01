import axios from "axios";

export const apiCrud = axios.create({
  baseURL: "http://localhost:4444",
});

export const api = axios.create({
  baseURL: "https://random.dog/",
});

export const getAuth = async () => {
  try {
    const token = localStorage.getItem("token");

    const responseCrud = await apiCrud.get("/auth", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (responseCrud.data.message !== "ok") {
      return { message: "token inválido" };
    } else {
      return { message: "ok" };
    }
  } catch (err: any) {
    return err.response.data.message;
  }
};

export const getDog = async () => {
  const response = await api.get("/woof.json");
  return response.data.url;
};
