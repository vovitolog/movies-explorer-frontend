import "./App.css";
import { Header } from "../Header/Header";
import { Promo } from "../Promo/Promo";
import { AboutProject } from "../AboutProject/AboutProject";
import { Techs } from "../Techs/Techs";

function App() {
  return (
    <div className="App">
      <Header />
      <Promo />
      <AboutProject />
      <Techs />
    </div>
  );
}

export default App;
