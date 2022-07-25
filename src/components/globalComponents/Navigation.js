import "./Navigation.css";
import { Link } from "react-router-dom";

export function Navigation(props) {
  const fullPageStyle = {
    right: props.extended ? "0" : "-400px"
  };

  return (
    <nav className={props.navigationType} style={fullPageStyle}>
      <Link to="/">Home</Link>
      <Link to="/lists">Lists</Link>
      <Link to="/list">List</Link>
      <Link to="/focus">Focus</Link>
      <Link to="/login">Log in</Link>
    </nav>
  );
}