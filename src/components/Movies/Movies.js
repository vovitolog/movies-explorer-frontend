import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";
import { SearchForm } from "../SearchForm/SearchForm";
import { Preloader } from "../Preloader/Preloader";
import { MoviesCard } from "../MoviesCard/MoviesCard";
import "./Movies.css";

export function Movies() {
  return (
    <>
      <Header />
      <main className="movies">
        <SearchForm />
        <button
          type="button"
          className="movies__button movies__button_on transition-button"
        >
          Еще
        </button>
        <MoviesCard />
      </main>
      <Footer />
    </>
  );
}
