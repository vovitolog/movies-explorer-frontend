import "./MoviesCard.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export function MoviesCard(props) {
  const location = useLocation();
  const thisMovie = props.movieCard;
  const savedMovies = props.savedMovies;

  const [isLiked, setIsLiked] = useState(false);

  const unlike = () => {
    setIsLiked(false);
    props.onUnlike(thisMovie);
  };

  const like = () => {
    setIsLiked(true);
    props.onLike(thisMovie);
  };

  function handleClick() {
    isLiked ? unlike() : like();
  }

  const likeCheck = () => {
    if (savedMovies) {
      if (!isLiked) {
        const someCard = savedMovies.find(
          (likedMovie) => likedMovie.movieId === thisMovie.id
        );
        if (someCard) {
          setIsLiked(true);
        } else {
          setIsLiked(false);
        }
      }
    }
  };

  useEffect(() => {
    location.pathname === "/movies" ? likeCheck() : setIsLiked(true);
  }, []);

  const buttonClassName = `transition-button ${props.button} ${
    isLiked ? `${props.button}_pressed` : null
  }`;

  return (
    <li className="movie-card">
      <div className="movie-card__wrapper">
        <div className="movie-card__description">
          <h2 className="movie-card__title">{props.nameRU}</h2>
          <p className="movie-card__duration">{props.duration}</p>
        </div>
        <button
          type="button"
          className={buttonClassName}
          onClick={handleClick}
        ></button>
      </div>
      <Link to={{ pathname: `${props.trailer}` }} target="_blank">
        <img
          className="movie-card__image"
          src={props.image}
          alt="Обложка фильма"
        ></img>
      </Link>
    </li>
  );
}
