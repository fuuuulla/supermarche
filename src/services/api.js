import axios from "axios";

export const api = axios.create({
  baseURL: "https://dev-supermarchee.pantheonsite.io/wp-json/supermarche/v1"
});
