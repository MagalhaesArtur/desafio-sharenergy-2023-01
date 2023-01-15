import axios from "axios";

export const apiCrud = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const api = axios.create({
  baseURL: "https://random.dog/",
});

export const getAuth = async () => {
  try {
    const token = localStorage.getItem("token");
    console.log(token);
    if (token == "") {
      return { message: "token inválido" };
    }

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
