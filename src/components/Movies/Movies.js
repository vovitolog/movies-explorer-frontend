import { Footer } from "../Footer/Footer";
import { SearchForm } from "../SearchForm/SearchForm";
import { MoviesCardList } from "../MoviesCardList/MoviesCardList";
import { Header } from "../Header/Header";
import "./Movies.css";

export function Movies(props) {

  console.log(props.onSearch)

 return (
    <>
      <Header loggedIn={props.loggedIn} />
      <main className="movies">
        <SearchForm
          onSearch={props.onSearch}
          onToggleSwitchClick={props.onToggleSwitchClick}
          isChecked={props.isChecked}
          previousSearchWord={props.previousSearchWord}
        />
        <MoviesCardList movies={props.movies} savedMovies={props.savedMovies} />
        <button
          type="button"
          className={`movies__button ${
            props.moreResults ? "movies__button_on" : null
          }`}
          onClick={props.showMoreResults}
        >
          Еще
        </button>
      </main>
      <Footer />
    </>
  );
}
