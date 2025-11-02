import axios from "axios";
import { AppError } from "src/utils/AppError";

const api = axios.create({
  baseURL: "https://zeladoria.tsr.net.br/api/",
});

api.interceptors.response.use(response => response, error => {
  if (error.response && error.response.data) {
    const data = error.response.data;

    let message = "Ocorreu um erro inesperado";

    if (data.message) {
      message = data.message;
    } else if (data.detail) {
      message = data.detail
    } else if (Array.isArray(data.non_field_errors)) {
      message = data.non_field_errors[0];
    }

    return Promise.reject(new AppError(message));
  } else {
    return Promise.reject(error);
  }
});

export default api;