import "./Header.css";
import { RoundLogo } from "./globalComponents/RoundLogo";
import siteLogo from "../assets/images/siteLogo.svg"

export function Header() {
  return (
    <header>
      <RoundLogo
        logoImage={siteLogo}
      />
    </header>
  );
}
