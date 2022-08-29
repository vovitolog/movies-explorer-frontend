import "./App.css";
import { Header } from "../Header/Header";
import { Promo } from "../Promo/Promo";
import { AboutProject } from "../AboutProject/AboutProject";

function App() {
  return (
    <div className="App">
      <Header />
      <Promo />
      <AboutProject />
    </div>
  );
}

export default App;
