import "./App.css";
import { Switch, Route } from "react-router-dom";
import { Movies } from "../Movies/Movies";
import { Main } from "../Main/Main";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path={"/"}>
          <Main />
        </Route>
        <Route exact path={"/movies"}>
          <Movies />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
