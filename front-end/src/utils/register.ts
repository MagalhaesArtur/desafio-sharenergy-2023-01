import axios from "axios";

export const apiCrud = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const RegisterUser = async (login: string, password: string) => {
  try {
    const response = await apiCrud.post("/register", {
      login,
      password,
    });
    console.log(response);
    return response;
  } catch (err: any) {
    return err.response.data.message;
  }
};
