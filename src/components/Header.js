import "./Header.css";
import { RoundLogo } from "./globalComponents/RoundLogo";
import siteLogo from "../assets/images/siteLogo.svg"
import settingsLogo from "../assets/images/settingsLogo.svg"

export function Header() {
  return (
    <header>
      <RoundLogo
        logoImage={siteLogo}
        height="50px"
        width="50px"
        link="#"
      />
      <h1 className="coolTitle">Productrevity</h1>
      <RoundLogo
        logoImage={settingsLogo}
        height="50px"
        width="50px"
        link="#"
      />
    </header>
  );
}
