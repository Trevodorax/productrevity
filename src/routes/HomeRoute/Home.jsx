import "./Home.css";
import { HomeSection } from "./components/HomeSection";

export function Home(props) {
  return (
    <main>
      <HomeSection
        bigText="Increase"
        mediumText="Your productivity"
        smallText="Without spending any money"
      />
      <HomeSection
        bigText="Work"
        mediumText="With other users"
        smallText="As everything is better together"
      />
      <HomeSection
        bigText="Keep"
        mediumText="Everything tidy"
        smallText="Because organization is key for a productive lifestyle"
      />
    </main>
  );
}