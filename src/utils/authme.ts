import { endpoint } from "../config.json";
import lang from "../lang";
import axios, { AxiosResponse } from "axios";

interface SoftQueryResponse {
  // Module2Module
  ok: boolean;
  message?: string;
}

interface BaseQuery {
  ok: boolean;
  message?: string;
}

interface LoginQuery extends BaseQuery {
  grant: string
}

const MCUsernamePattern = /^[a-zA-Z0-9_]{2,16}$/gm;
function JSONParse(json: string) {
  return new Promise((resolve, reject) => {
    try {
      resolve(JSON.parse(json));
    } catch (e) {
      reject(e);
    }
  });
}
function panic(msg?: string): SoftQueryResponse {
  return { ok: false, message: msg };
}
const ok = { ok: true };

export default class Auth {
  login(
    username: string,
    password: string,
    callback = (res: SoftQueryResponse, data: object) => {}
  ): SoftQueryResponse {
    if (MCUsernamePattern.test(username)) return panic(lang.usernameInvalid);
    if (password == "") return panic(lang.passwordEmpty);
    axios.get(`${endpoint}/login.php`).then((res: AxiosResponse) => {
      JSONParse(res.data).then((data) =>
        callback({ ok: true }, res.data as LoginQuery)
      );
    });
    return ok
  }
}
