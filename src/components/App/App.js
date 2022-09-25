import "./App.css";
import { useState } from "react";
import { Switch, Route } from "react-router-dom";
import { SavedMovies } from "../SavedMovies/SavedMovies";
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
  const [isRegistrationSuccessful, setIsRegistrationSuccessful] =
    useState(false);
  const [userMessage, setUserMessage] = useState("");
  const [loggedIn, setIsLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [loginErrorMessage, setLoginErrorMessage] = useState("");

  function handleRegister(signupData) {
    mainApi
      .register(signupData)
      .then((res) => {
        if (res._id) {
          setCurrentUser(res);
          setIsRegistrationSuccessful(true);
          setUserMessage("Вы успешно зарегистрированы!");
          setTimeout(() => handleLogin(signupData), 1000);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleLogin(data) {
    if (!data.email || !data.password) {
      return;
    }
    mainApi
      .login(data)
      .then((res) => {
        if (!res) throw new Error("Неправильные имя пользователя или пароль");
        else {
          localStorage.setItem("jwt", res.token);
          setIsLoggedIn(true);
        }
      })
      .catch((err) => {
        setLoginErrorMessage("Не удалось войти, пожалуйста, проверьте данные");
        setLoginError(true);
        console.log(err);
      });
  }

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
            <Register onRegister={handleRegister} />
          </Route>
          <Route exact path={"/signin"}>
            <Login onLogin={handleLogin} />
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
