import "./MoviesCard.css";

export function MoviesCard() {
  return (
    <li className="movie-card">
      <div className="movie-card__wrapper">
        <div className="movie-card__description">
          <h2 className="movie-card__title">33 слова о дизайне</h2>
          <p className="movie-card__duration">1ч 47м</p>
        </div>
        <button className="movie-card__favorite-button movie-card__favorite-button_pressed"></button>
      </div>
      <img
        className="movie-card__image"
        src="https://f.bangbangeducation.ru/course/course-cover/111/da91b00b-ea93-11e9-89b4-0242ac18000a.png"
        alt="Обложка фильма"
      ></img>
    </li>
  );
}
