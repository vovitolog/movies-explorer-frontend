import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";
import {SearchForm} from "../SearchForm/SearchForm"
import "./Movies.css";

export function Movies() {
  return (
    <>
      <Header />
      <main className="movies">
      <SearchForm />
      </main>
      <Footer />
    </>
  );
}
