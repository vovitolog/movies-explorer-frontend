import "./App.css";
import { useState, useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import { ProtectedRoute } from "../ProtectedRoute/ProtectedRoute";
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
  const history = useHistory();
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

  useEffect(() => {
    if (loggedIn) {
      Promise.all([
        mainApi.getUserProfile(localStorage.getItem("jwt")),
        mainApi.getMovies(),
      ])
        .then(([user, movies]) => {
          setCurrentUser(user);
          history.push("/movies");
        })
        .catch((err) => console.log(err));
    } else {
      setIsLoggedIn(false);
    }
  }, [history, loggedIn]);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      mainApi
        .checkTokenValidity(jwt)
        .then((res) => {
          if (res) {
            setIsLoggedIn(true);
          }
        })
        .catch((err) => console.log(err));
    }
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <Switch>
          <Route exact path={"/"}>
            <Main loggedIn={loggedIn} />
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
          <ProtectedRoute exact path={"/profile"}>
            <Profile />
          </ProtectedRoute>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
