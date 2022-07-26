import "./RoundLogo.css"

export function RoundLogo(props) {

  const logoStyle = {
    backgroundImage : "url(" + props.logoImage + ")",
    height: props.height,
    width: props.width
  }

  return (
    <a
      onClick={props.onClick}

      className="roundLogo"
      style={logoStyle}
      href={props.link}
    >

    </a>
  );
}