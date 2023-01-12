import axios from "axios";
import { AdmProps, ClientsProps } from "./interfaces";

export const api = axios.create({
  baseURL: "https://randomuser.me/api",
});

export const GetRandomUsers = async () => {
  try {
    const response = await api.get("/?page=1&results=30&seed=abc");
    return response.data.results;
  } catch (err: any) {
    return err.response.data.message;
  }
};
