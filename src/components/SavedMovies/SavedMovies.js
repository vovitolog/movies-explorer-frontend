import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";
import { SearchForm } from "../SearchForm/SearchForm";
import { MoviesCardList } from "../MoviesCardList/MoviesCardList";
import { Preloader } from "../Preloader/Preloader";
import "./SavedMovies.css";

export function SavedMovies(props) {

  return (
    <>
      <Header loggedIn={props.loggedIn} />
      <main className="saved-movies">
        <SearchForm
          onSavedMoviesSearch={props.onSearch}
          onToggleSwitchClick={props.onToggleSwitchClick}
          shortMoviesOn={props.shortMoviesOn}
          savedIsChecked={props.savedIsChecked}
        />
        <Preloader
          isLoading={props.isLoading}
          isNothingFound={props.isNothingFound}
        />
        <MoviesCardList
          movies={props.movies}
          button="movie-card__favorite-button"
          onUnlike={props.onUnlike}
          savedMovies={props.savedMovies}
        />
      </main>
      <Footer />
    </>
  );
}
