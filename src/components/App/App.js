import "./App.css";
import { Switch, Route } from "react-router-dom";
import { Movies } from "../Movies/Movies";
import { Main } from "../Main/Main";
import { Register } from "../Register/Register";
import { Login } from "../Login/Login";
import { Profile } from "../Profile/Profile";
import { NotFound } from "../NotFound/NotFound";

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
        <Route exact path={"/signin"}>
          <Login />
        </Route>
        <Route exact path={"/profile"}>
          <Profile />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
