import "./App.css";
import { Switch, Route } from "react-router-dom";
import { Movies } from "../Movies/Movies";
import { Main } from "../Main/Main";
import {Register} from "../Register/Register";

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
        <Route exact path={"/signup"}>
          <Register />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
