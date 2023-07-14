import { useState } from "react";
import style from "../styles/AuthMe.module.css";
import Login from "./auth/Login";

export enum Pages {
  Login = 0,
  ViewUser = 1,
}
type ChangePageFunction = (page: Pages) => void;

interface Skin {
  name: string;
  url: `https://minotar.net/helm/${string}/${number}.png`;
}

export function MChelm(player: string, size = 32): Skin {
  return {
    name: player,
    url: `https://minotar.net/helm/${player}/${size}.png`,
  };
}

export interface PageProps {
  next: ChangePageFunction;
}
const navIconSize = 32;
export default function AuthMe() {
  const [cpage, setcpage] = useState<Pages>(Pages.Login);
  const [skin, setskin] = useState<Skin>(MChelm("MHF_Steve", navIconSize));
  const gProps: PageProps = {
    next: setcpage,
  };
  return (
    <>
      <div className={style.minav}>
        <img
          width={navIconSize}
          height={navIconSize}
          src={skin.url}
          alt={skin.name}
        />
        <span>{skin.name}</span>
      </div>
      <div className={style.dialog}>
        {cpage == Pages.Login ? (
          <Login {...gProps} />
        ) : cpage == Pages.ViewUser ? (
          <></>
        ) : (
          false
        )}
      </div>
    </>
  );
}
