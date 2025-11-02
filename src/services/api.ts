import axios from "axios";

const api = axios.create({
  baseURL: "https://zeladoria.tsr.net.br/api/",
});

export default api;