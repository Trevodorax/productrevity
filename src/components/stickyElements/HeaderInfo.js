import "./HeaderInfo.css";
import viewLogo from "../../assets/images/viewLogo.svg";

export function HeaderInfo(props) {
  const viewLogoStyle = {
    height: props.viewLogoExtended ? 32 : 0
  }

  return (
    <div className="headerInfo">
      <h2 className="coolTitle">{props.infoText}</h2>
      <a href={props.link} style={viewLogoStyle}>
        <img src={viewLogo} alt="view logo" />
      </a>
    </div>
  )
}
