import "./SavedMovies.css";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";
import { SearchForm } from "../SearchForm/SearchForm";
import { MoviesCardList } from "../MoviesCardList/MoviesCardList";

export function SavedMovies() {
  return (
    <>
      <Header />
      <main className="saved-movies">
        <SearchForm />
        <MoviesCardList />
      </main>
      <Footer />
    </>
  );
}
