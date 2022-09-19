import "./SavedMovies.css";
import { Footer } from "../Footer/Footer";
import { Navigation } from "../Navigation/Navigation";
import { SearchForm } from "../SearchForm/SearchForm";
import { MoviesCardList } from "../MoviesCardList/MoviesCardList";

export function SavedMovies() {
  return (
    <>
      <Navigation />
      <main className="saved-movies">
        <SearchForm />
        <MoviesCardList />
      </main>
      <Footer />
    </>
  );
}
