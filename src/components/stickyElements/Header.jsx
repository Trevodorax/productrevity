import "./Header.css";
import { useState } from "react";
import { RoundLogo } from "../globalComponents/RoundLogo";
import { HeaderInfo } from "./HeaderInfo";
import { Navigation } from "../globalComponents/Navigation";
import siteLogo from "../../assets/images/siteLogo.svg";
import settingsLogo from "../../assets/images/settingsLogo.svg";

export function Header() {
  const [navigationExtended, setNavigationExtended] = useState(false);

  function toggleNavigationExtended() {
    setNavigationExtended(!navigationExtended);
  }

  const [showViewLogo, setShowViewLogo] = useState(true);

  return (
    <div className="pageTop">
      <header>
        <RoundLogo
          logoImage={siteLogo}
          height="50px"
          width="50px"
          link="#"
        />
        <h1 className="coolTitle">Productrevity</h1>
        <RoundLogo
          onClick={toggleNavigationExtended}

          logoImage={settingsLogo}
          height="50px"
          width="50px"
          link="#"
        />
        <Navigation
          navigationType="fullPage"
          extended={navigationExtended}
        />
      </header>
      <HeaderInfo
        infoText="Test"
        viewLogoExtended={showViewLogo}
      />
    </div>
  );
}
