import "./RoundLogo.css"

export function RoundLogo(props) {
  console.log(props.logoImage);

  const logoStyle = {
    backgroundImage : "url(" + props.logoImage + ")"
  }

  return (
    <div
      className="roundLogo"
      style = {logoStyle}
    />
  );
}