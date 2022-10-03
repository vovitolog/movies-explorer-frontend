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
  const [profileUpdateMessage, setProfileUpdateMessage] = useState("");
  const [profileErrorMessage, setProfileErrorMessage] = useState("");
  const [isProfileUpdateSuccessful, setIsProfileUpdateSuccessful] =
    useState(false);

  const [resultMovies, setResultMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [shortIsOn, setShortIsOn] = useState(false);
  const [previousSearchWord, setPreviousSearchWord] = useState("");
  const [shortMoviesSearch, setShortMoviesSearch] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [nothingFound, setNothingFound] = useState(false);

  const shortMoviesSwitchClick = () => {
    setShortMoviesSearch(!shortMoviesSearch);
  };

  useEffect(() => {
    shortMoviesRenderer();
  }, [shortMoviesSearch]);

  const shortMoviesRenderer = () => {
    if (shortMoviesSearch) {
      setShortIsOn(true);
      localStorage.setItem("shortIsOn", "true");
      const shortMovies = filteredMovies.filter(
        (movie) => movie.duration <= 40
      );
      moviesRender(shortMovies, 12);
    }
  };

  function handleRegister(signupData) {
    setIsLoading(true);
    mainApi
      .register(signupData)
      .then((res) => {
        if (res._id) {
          setCurrentUser(res);
          setIsRegistrationSuccessful(true);
          setUserMessage("Вы успешно зарегистрированы!");
          setIsLoading(false);
          setTimeout(() => handleLogin(signupData), 1000);
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  }

  function handleLogin(data) {
    if (!data.email || !data.password) {
      return;
    }
    setIsLoading(true);
    mainApi
      .login(data)
      .then((res) => {
        if (!res) throw new Error("Неправильные имя пользователя или пароль");
        else {
          localStorage.setItem("jwt", res.token);
          setIsLoggedIn(true);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        setLoginErrorMessage("Не удалось войти, пожалуйста, проверьте данные");
        setIsLoading(false);
        setLoginError(true);
        console.log(err);
      });
  }

  useEffect(() => {
    if (loggedIn) {
      setIsLoading(true);
      Promise.all([
        mainApi.getUserProfile(localStorage.getItem("jwt")),
        mainApi.getMovies(),
      ])
        .then(([user, movies]) => {
          setCurrentUser(user);
          const userMovies = movies.filter((movie) => movie.owner === user._id);
          localStorage.setItem("savedMovies", JSON.stringify(userMovies));
          history.push("/movies");
          setTimeout(() => setIsLoading(false), 1000);
        })
        .catch((err) => console.log(err));
    } else {
      setIsLoggedIn(false);
    }
  }, [loggedIn]);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      mainApi
        .checkTokenValidity(jwt)
        .then((res) => {
          if (res) {
            setIsLoggedIn(true);
            if (localStorage.searchWord) {
              const previousSearchWord = JSON.parse(
                localStorage.getItem("searchWord")
              );
              setPreviousSearchWord(previousSearchWord);
              handleMoviesSearch(previousSearchWord);
              if (localStorage.shortIsOn) {
                setShortMoviesSearch(true);
              }
            }
          }

          localStorage.removeItem("shortIsOn");
        })
        .catch((err) => console.log(err));
    }
  }, []);

  function handleUpdateProfile(data) {
    setProfileUpdateMessage("");
    setProfileErrorMessage("");
    setIsLoading(true);
    mainApi
      .updateProfile(data)
      .then((res) => {
        setIsProfileUpdateSuccessful(true);
        setCurrentUser(res);
        setProfileUpdateMessage("Данные успешно изменены");
        setIsLoading(false);
        setTimeout(() => setProfileUpdateMessage(""), 3000);
      })
      .catch((err) => {
        setIsProfileUpdateSuccessful(false);
        setIsLoading(false);
        setProfileErrorMessage("Что-то пошло не так...");
        setTimeout(() => setProfileErrorMessage(""), 3000);
        console.log(err);
      });
  }

  const moviesRender = (movies, itemsToShow) => {
    if (movies) {
      if (movies.length > itemsToShow) {
        setResultMovies(movies.slice(0, 12));
      } else {
        setResultMovies(movies);
      }
    }
  };

  function handleMoviesSearch(searchParams) {
    setNothingFound(false);
    setIsLoading(true);
    localStorage.setItem("searchWord", JSON.stringify(searchParams));
    let filterResults;
    if (!localStorage.movies) {
      moviesApi
        .getMovies()
        .then((res) => {
          console.log(res);
          localStorage.setItem("movies", JSON.stringify(res));
          filterResults = res.filter((movie) => {
            return movie.nameRU
              .toLowerCase()
              .includes(searchParams.trim().toLowerCase());
          });
          setTimeout(() => setIsLoading(false), 500);

          if (shortMoviesSearch) {
            const shortMovies = filterResults.filter(
              (movie) => movie.duration <= 40
            );
            setFilteredMovies(shortMovies);
            if (shortMovies.length === 0) {
              setNothingFound(true);
            }
          } else {
            setFilteredMovies(filterResults);
            if (filterResults.length === 0) {
              setNothingFound(true);
            }
          }

          moviesRender(filterResults, 12);

          localStorage.setItem("filteredMovies", JSON.stringify(filterResults));
        })
        .catch((err) => console.log(err));
    } else {
      filterResults = JSON.parse(localStorage.getItem("movies")).filter(
        (movie) => {
          return movie.nameRU
            .toLowerCase()
            .includes(searchParams.trim().toLowerCase());
        }
      );
      setTimeout(() => setIsLoading(false), 500);
      if (shortMoviesSearch) {
        const shortMovies = filterResults.filter(
          (movie) => movie.duration <= 40
        );
        setFilteredMovies(shortMovies);
        if (shortMovies.length === 0) {
          setNothingFound(true);
        }
      } else {
        setFilteredMovies(filterResults);
        if (filterResults.length === 0) {
          setNothingFound(true);
        }
      }
      moviesRender(filterResults, 12);
      localStorage.setItem("filteredMovies", JSON.stringify(filterResults));
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <Switch>
          <Route exact path={"/"}>
            <Main loggedIn={loggedIn} />
          </Route>
          <ProtectedRoute
            exact
            path={"/movies"}
            component={Movies}
            loggedIn={loggedIn}
            movies={resultMovies}
            onSearch={handleMoviesSearch}
            previousSearchWord={previousSearchWord}
            onToggleSwitchClick={shortMoviesSwitchClick}
            isChecked={shortIsOn}
            isNothingFound={nothingFound}
            isLoading={isLoading}
          >
            <Movies />
          </ProtectedRoute>
          <Route exact path={"/saved-movies"}>
            <SavedMovies />
          </Route>
          <Route exact path={"/signup"}>
            <Register onRegister={handleRegister} />
          </Route>
          <Route exact path={"/signin"}>
            <Login onLogin={handleLogin} />
          </Route>
          <ProtectedRoute
            exact
            path={"/profile"}
            component={Profile}
            loggedIn={loggedIn}
            onUpdateProfile={handleUpdateProfile}
            profileUpdateMessage={profileUpdateMessage}
            profileErrorMessage={profileErrorMessage}
            isProfileUpdateSuccessful={isProfileUpdateSuccessful}
          >
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
