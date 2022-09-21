import { Footer } from "../Footer/Footer";
import { SearchForm } from "../SearchForm/SearchForm";
import { Preloader } from "../Preloader/Preloader";
import { MoviesCard } from "../MoviesCard/MoviesCard";
import { MoviesCardList } from "../MoviesCardList/MoviesCardList";
import {Navigation} from "../Navigation/Navigation";
import "./Movies.css";

export function Movies() {
  return (
    <>
      <Navigation/>
      <main className="movies">
        <SearchForm />
        <MoviesCardList />
        <button
          type="button"
          className="movies__button movies__button_on transition-button"
        >
          Еще
        </button>
      </main>
      <Footer />
    </>
  );
}
