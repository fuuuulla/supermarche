import axios from "axios";

export const api = axios.create({
  baseURL: "https://dev-fulla-market.pantheonsite.io/wp-json/supermarche/v1"
});
