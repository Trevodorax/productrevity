import "./HeaderInfo.css";
import viewLogo from "../../assets/images/viewLogo.svg";

export function HeaderInfo(props) {
  return (
    <div className="headerInfo">
      <h2 className="coolTitle">{props.infoText}</h2>
      <a href={props.link}>
        <img src={viewLogo} alt="view logo" />
      </a>
    </div>
  )
}
