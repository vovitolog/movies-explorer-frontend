import "./App.css";
import { Header } from "../Header/Header";
import { Promo } from "../Promo/Promo";
import { AboutProject } from "../AboutProject/AboutProject";
import { Techs } from "../Techs/Techs";
import {AboutMe} from "../AboutMe/AboutMe"
import {Portfolio} from "../Portfolio/Portfolio"

function App() {
  return (
    <div className="App">
      <Header />
      <Promo />
      <AboutProject />
      <Techs />
      <AboutMe/>
      <Portfolio/>
    </div>
  );
}

export default App;
