import { endpoint } from "../config.json";
const isDev = import.meta.env.DEV,
  API = (path: string) =>
    (isDev ? "http://localhost/api" : endpoint).concat(path);
export default API;
