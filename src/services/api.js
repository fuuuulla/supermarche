import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost/monsite/wp-json/supermarche/v1",
});
