import en from "./en";

type Lang = "en";
const langs: { [n: string]: Translates } = { en };

type Translates = {
  usernameInvalid: string;
  passwordEmpty: string;
  authmeEntries: {
    realname: string;
    lastlogin: string;
    regdate: string;
    ip: string;
    regip: string;
    email: string;
  };
};

// export default
// function translate(lang: Lang = "en"): Translates {
//   return langs[lang];
// }
const getStrings = (lang: Lang = "en"): Translates => langs[lang];
export default getStrings
