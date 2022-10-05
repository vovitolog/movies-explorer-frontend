import "./MoviesCardList.css";
import { MoviesCard } from "../MoviesCard/MoviesCard";

export function MoviesCardList(props) {
  const movies = props.movies;

  const calcDuration = (time) => {
    const hours = Math.floor(time / 60);
    const minutes = time % 60;
    return hours > 0 ? `${hours}ч ${minutes}м` : `${minutes}м`;
  };

  return (
    <section className="movies-list">
      <ul className="movies-list__cards">
        {movies.map((movie) => {
          return (
            <MoviesCard
              key={movie.id}
              movieCard={movie}
              nameRU={movie.nameRU}
              duration={calcDuration(movie.duration)}
              image={`https://api.nomoreparties.co/${movie.image.url}`}
              button={props.button}
              trailer={movie.trailerLink}
              onLike={props.onLike}
              onUnlike={props.onUnlike}
              savedMovies={props.savedMovies}
            />
          );
        })}
      </ul>
    </section>
  );
}
