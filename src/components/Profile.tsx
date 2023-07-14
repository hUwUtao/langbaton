import { useEffect, useState } from "react";
import axios from "axios";
import qs from "qs";
import { kvmap, kmap, vmap } from "../utils/kv";
import API from "../utils/endpoint";
import e2gr from "../utils/moment";
import lang from "../lang";

import style from "../styles/Profile.module.css";
import MCLogo from "../assets/mc.svg";

interface ProfileProps {
  username: string;
  password?: string;
}

export interface Userdata {
  realname: string;
  lastlogin: number;
  regdate: number;
  ip?: string;
  regip?: string;
  email?: string;
}

// function mapAnonData(data: [string, number, number]): Userdata {
//   return {
//     realname: data[0],
//     lastlogin: data[1],
//     regdate: data[2]
//   }
// }
const mapAnonData = (data: [string, number, number]): Userdata => ({
    realname: data[0],
    lastlogin: data[1],
    regdate: data[2],
  }),
  mapUserData = (
    data: [string, number, number, string, string, string]
  ): Userdata => ({
    realname: data[0],
    lastlogin: data[1],
    regdate: data[2],
    ip: data[3],
    regip: data[4],
    email: data[5],
  });

export default function Profile({ username, password }: ProfileProps) {
  const now = new Date(11111111111).getTime();
  const [udata, setUdata] = useState<Userdata>({
    realname: username,
    lastlogin: now,
    regdate: now,
  });
  useEffect(() => {
    password
      ? axios
          .request({
            method: "POST",
            url: API("/login"),
            headers: {
              "content-type": "application/x-www-form-urlencoded",
              Cookie: "",
            },
            data: qs.stringify({ username, password }),
          })
          .then(function (response) {
            setUdata(mapUserData(response.data.data));
          })
          .catch(function (error) {
            console.error(error);
          })
      : axios
          .request({
            method: "GET",
            url: "http://localhost/api/query",
            params: { username },
          })
          .then(function (response) {
            setUdata(mapAnonData(response.data.data));
          })
          .catch(function (error) {
            console.error(error);
          });
  }, []);
  return (
    <>
      <div className={style.con}>
        <div className={style.avt}>
          <img
            src={`https://minotar.net/armor/body/${username}/32.png`}
            alt={username}
            width={128}
            height={256}
          />
          <img className={style.awm} src={MCLogo} alt="Minecraft" />
        </div>
        <div className={style.inf}>
          <div>
            {kmap(
              vmap(kvmap(udata), {
                lastlogin: e2gr,
                regdate: e2gr,
              }),
              lang.authmeEntries
            ).map((e, i) => (
              <div className={style.data} key={i}>
                <span className={style.key}>{e.key}</span>
                {"  "}
                <code className={style.value}>{e.value}</code>
              </div>
            ))}
          </div>
          <div>
            hi
          </div>
        </div>
      </div>
    </>
  );
}
