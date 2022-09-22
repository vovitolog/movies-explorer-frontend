import "./App.css";
import { useState } from "react";
import { Switch, Route } from "react-router-dom";
import {SavedMovies} from "../SavedMovies/SavedMovies"
import { Movies } from "../Movies/Movies";
import { Main } from "../Main/Main";
import { Register } from "../Register/Register";
import { Login } from "../Login/Login";
import { Profile } from "../Profile/Profile";
import { NotFound } from "../NotFound/NotFound";
import { mainApi } from "../../utils/MainApi";
import { moviesApi } from "../../utils/MoviesApi";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";



function App() {
  const [currentUser, setCurrentUser] = useState({});

  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="App">
      <Switch>
        <Route exact path={"/"}>
          <Main />
        </Route>
        <Route exact path={"/movies"}>
          <Movies />
        </Route>
        <Route exact path={"/saved-movies"}>
          <SavedMovies />
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
    </CurrentUserContext.Provider>
  );
}

export default App;
