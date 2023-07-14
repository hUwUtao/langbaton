import { useEffect, useState } from "react";
import config from "../config.json";
import copy from "../utils/clipboard";
import style from "../styles/MCStat.module.css";

export interface MCstatResponse {
  online?: boolean;
  ip: string;
  port?: number;
  players: {
    online: number;
    max: number;
    list: string[];
  };
  version: string;
}

// const cpy = require("../assets/cpy.svg");
import cpy from "../assets/cpy.svg";
const ip = config.ip;
export default function MCStat() {
  const [cpyd, setCpyd] = useState(false);
  const [mcStat, setMcStat] = useState<MCstatResponse>({
    online: false,
    ip: "",
    players: {
      online: 0,
      max: 0,
      list: [],
    },
    version: "1.xx.x - 1.xx.x",
  });
  const userCopy = () => setCpyd(true) == null && copy(ip);
  useEffect(() => {
    fetch(`https://api.mcsrvstat.us/2/${ip}`)
      .then((res) => res.json())
      .then((res) => setMcStat(res));
  }, []);
  return (
    <div className={style.ip}>
      <span>
        {ip}
        <span className={style.counter}>
          <span
            className={mcStat.online ? style.dotg : style.dot}
          >{`\u25cf `}</span>
          {mcStat.online
            ? `${mcStat.players.online}/${mcStat.players.max}`
            : "Bảo trì"}
        </span>
      </span>
      <button
        type="button"
        className={`${style.cpyb} ${cpyd && style.cpyd}`}
        onClick={userCopy}
      >
        <img src={cpy} alt="Copy" className={style.i} />
        {cpyd ? "Copied!" : "Copy"}
      </button>
    </div>
  );
}
