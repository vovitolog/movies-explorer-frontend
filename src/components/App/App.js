import "./App.css";
import { useState, useEffect } from "react";
import { Switch, Route, useHistory, useLocation } from "react-router-dom";
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
  const location = useLocation();
  const [loginError, setLoginError] = useState(false);
  const [loginErrorMessage, setLoginErrorMessage] = useState("");
  const [profileUpdateMessage, setProfileUpdateMessage] = useState("");
  const [profileErrorMessage, setProfileErrorMessage] = useState("");
  const [isProfileUpdateSuccessful, setIsProfileUpdateSuccessful] =
    useState(false);

  const [resultMovies, setResultMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [likedMovies, setLikedMovies] = useState([]);
  const [shortIsOn, setShortIsOn] = useState(false);
  const [previousSearchWord, setPreviousSearchWord] = useState("");
  const [shortMoviesSearch, setShortMoviesSearch] = useState(false);
  const [savedShortMoviesSearch, setSavedShortMoviesSearch] = useState(false);
  const [savedMoviesShortIsOn, setSavedMoviesShortIsOn] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [nothingFound, setNothingFound] = useState(false);

  const [moreResults, setMoreResults] = useState(false);

  const [limit, setLimit] = useState(() => {
    if (window.innerWidth <= 480) {
      return 5;
    } else if (window.innerWidth <= 768) {
      return 8;
    } else if (window.innerWidth > 768) {
      return 12;
    }
  });

  const [resultsToAdd, setResultsToAdd] = useState(() => {
    if (window.innerWidth <= 768) {
      return 2;
    } else if (window.innerWidth > 768) {
      return 4;
    }
  });

  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    window.addEventListener("resize", () =>
      setTimeout(() => {
        screenSetter();
      }, 1000)
    );
  }, []);
  const screenSetter = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    setLimit(windowSizeHandler);
  }, [width]);
  useEffect(() => {
    moviesRender(filteredMovies, limit);
  }, [limit]);

  const windowSizeHandler = () => {
    if (window.innerWidth <= 480) {
      setLimit(5);
      setResultsToAdd(2);
    } else if (window.innerWidth <= 800) {
      setLimit(8);
      setResultsToAdd(2);
    } else if (window.innerWidth > 800) {
      setLimit(12);
      setResultsToAdd(4);
    }
  };

  const showMore = () => {
    let newLimit;
    if (limit + resultsToAdd < filteredMovies.length) {
      newLimit = limit + resultsToAdd;
      moviesRender(filteredMovies.slice(0, newLimit));
      setLimit(newLimit);
      setMoreResults(true);
    } else if (limit + resultsToAdd >= filteredMovies.length) {
      newLimit = filteredMovies.length;
      moviesRender(filteredMovies, newLimit);
      setMoreResults(false);
    }
  };

  const shortMoviesSwitchClick = () => {
    setShortMoviesSearch(!shortMoviesSearch);
  };

  const shortSavedMoviesSwitchClick = () => {
    setSavedShortMoviesSearch(!savedShortMoviesSearch);
  };

  useEffect(() => {
    shortSavedMoviesRenderer();
  }, [savedShortMoviesSearch]);

  useEffect(() => {
    shortMoviesRenderer();
  }, [shortMoviesSearch]);

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

  // Логин

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
      .catch((error) => {
        setLoginErrorMessage("Не удалось войти, пожалуйста, проверьте данные");
        setIsLoading(false);
        setLoginError(true);
        console.log(error);
      });
  }

  // Загрузка профиля и фильмов при логине

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

  // Проверка токена при загрузке страницы

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

  // Редактирование профиля

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
        setResultMovies(movies.slice(0, limit));
      } else {
        setResultMovies(movies);
        setMoreResults(false);
      }
    }
  };

  //Поиск и фильтр фильмов

  function handleMoviesSearch(searchParams) {
    setNothingFound(false);
    setIsLoading(true);
    localStorage.setItem("searchWord", JSON.stringify(searchParams));
    let filterResults;
    if (!localStorage.movies) {
      moviesApi
        .getMovies()
        .then((res) => {
          localStorage.setItem("movies", JSON.stringify(res));
          filterResults = res.filter((movie) => {
            return movie.nameRU
              .toLowerCase()
              .includes(searchParams.trim().toLowerCase());
          });
          setLimit(windowSizeHandler);
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

          moviesRender(filterResults, limit);
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
      setLimit(windowSizeHandler);
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
      moviesRender(filterResults, limit);
      localStorage.setItem("filteredMovies", JSON.stringify(filterResults));
    }
  }

  // Отрисовка фильмов с условиием короткометражек

  const shortMoviesRenderer = () => {
    setNothingFound(false);
    if (shortMoviesSearch) {
      setShortIsOn(true);
      localStorage.setItem("shortIsOn", "true");
      const shortMovies = filteredMovies.filter(
        (movie) => movie.duration <= 40
      );
      moviesRender(shortMovies, limit);
      if (shortMovies.length === 0) {
        setNothingFound(true);
      }
    } else {
      const allFilteredMovies = JSON.parse(
        localStorage.getItem("filteredMovies")
      );
      moviesRender(allFilteredMovies, limit);
      setShortIsOn(false);
    }
  };

  //Отрисовка сохраненных фильмов с фильтром короткометражек

  const shortSavedMoviesRenderer = () => {
    setNothingFound(false);
    if (savedShortMoviesSearch) {
      setSavedMoviesShortIsOn(true);
      const savedShortMovies = likedMovies.filter(
        (movie) => movie.duration <= 40
      );
      setLikedMovies(savedShortMovies);
      if (savedShortMovies.length === 0) {
        setNothingFound(true);
      }
    } else {
      const savedMovies = JSON.parse(localStorage.getItem("savedMovies"));
      setLikedMovies(savedMovies);
      setSavedMoviesShortIsOn(false);
    }
  };

  //Функция поиска для сохраненных фильмов

  const handleSavedMoviesSearch = (searchParams) => {
    setNothingFound(false);
    setIsLoading(true);
    const filterResults = JSON.parse(
      localStorage.getItem("savedMovies")
    ).filter((movie) => {
      return movie.nameRU
        .toLowerCase()
        .includes(searchParams.trim().toLowerCase());
    });
    setLikedMovies(filterResults);
    if (filterResults.length === 0) {
      setNothingFound(true);
    }
    setTimeout(() => setIsLoading(false), 500);
  };

  // Логика лайка
  const saveMovie = (cardMovie) => {
    mainApi
      .createMovie(cardMovie)
      .then((savedCard) => {
        console.log("сохранено");
        const updatedLikedMovies = [...likedMovies, savedCard];
        setLikedMovies(updatedLikedMovies);
        localStorage.setItem("savedMovies", JSON.stringify(updatedLikedMovies));
      })
      .catch((err) => console.log(err));
  };

  //Удаление лайка

  const idCheck = (card) => {
    if (!card._id) {
      const thisCard = likedMovies.find(
        (likedMovie) => likedMovie.movieId === card.id
      );
      return thisCard._id;
    } else {
      return card._id;
    }
  };
  const removeMovie = (cardMovie) => {
    const searchId = idCheck(cardMovie);
    mainApi
      .removeMovie(searchId)
      .then(() => {
        let updatedLikedMovies;
        if (location.pathname === "/movies") {
          updatedLikedMovies = likedMovies.filter(
            (movie) => movie.movieId !== cardMovie.id
          );
        } else {
          updatedLikedMovies = likedMovies.filter(
            (movie) => movie._id !== cardMovie._id
          );
        }
        localStorage.setItem("savedMovies", JSON.stringify(updatedLikedMovies));
        setLikedMovies(updatedLikedMovies);
      })
      .catch((err) => console.log(err));
  };

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
            moreResults={moreResults}
            showMoreResults={showMore}
            onLike={saveMovie}
            onUnlike={removeMovie}
            savedMovies={likedMovies}
          />
          <ProtectedRoute
            exact
            path={"/saved-movies"}
            movies={likedMovies}
            onSearch={handleSavedMoviesSearch}
            onUnlike={removeMovie}
            component={SavedMovies}
            isLoading={isLoading}
            loggedIn={loggedIn}
            isNothingFound={nothingFound}
            savedMovies={likedMovies}
            shortMoviesOn={shortMoviesSearch}
            onToggleSwitchClick={shortSavedMoviesSwitchClick}
            savedIsChecked={savedMoviesShortIsOn}
          />
          <ProtectedRoute
            exact
            path={"/profile"}
            component={Profile}
            loggedIn={loggedIn}
            onUpdateProfile={handleUpdateProfile}
            profileUpdateMessage={profileUpdateMessage}
            profileErrorMessage={profileErrorMessage}
            isProfileUpdateSuccessful={isProfileUpdateSuccessful}
            isLoading={isLoading}
          />
          <Route exact path={"/signup"}>
            <Register
              onRegister={handleRegister}
              userMessage={userMessage}
              isRegistrationSuccessful={isRegistrationSuccessful}
              isLoading={isLoading}
            />
          </Route>
          <Route exact path={"/signin"}>
            <Login
              onLogin={handleLogin}
              loginError={loginError}
              loginErrorMessage={loginErrorMessage}
              isLoading={isLoading}
            />
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
