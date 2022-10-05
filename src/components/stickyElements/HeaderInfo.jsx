import "./HeaderInfo.css";
import viewLogo from "../../assets/images/viewLogo.svg";
import { useLocation } from "react-router-dom";

export function HeaderInfo(props) {
  const viewLogoStyle = {
    height: props.viewLogoExtended ? 32 : 0,
  }

  const path = useLocation().pathname;
  const locationInApp = path === '/' ? 'Home' : path.slice(1);

  return (
    <div className="headerInfo">
      <h2 className="coolTitle">{locationInApp}</h2>
      <a href={props.link} style={viewLogoStyle}>
        <img src={viewLogo} alt="view logo" />
      </a>
    </div>
  );
};
