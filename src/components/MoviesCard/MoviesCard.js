import "./MoviesCard.css";

export function MoviesCard(props) {

  return (
    <li className="movie-card">
      <div className="movie-card__wrapper">
        <div className="movie-card__description">
          <h2 className="movie-card__title">{props.nameRU}</h2>
          <p className="movie-card__duration">{props.duration}</p>
        </div>
        <button
          type="button"
          className="movie-card__favorite-button movie-card__favorite-button_pressed"
        ></button>
      </div>
      <img
        className="movie-card__image"
        src={props.image}
        alt="Обложка фильма"
      ></img>
    </li>
  );
}
