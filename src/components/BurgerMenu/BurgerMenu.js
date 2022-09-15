import { Link } from "react-router-dom";
import "./BurgerMenu.css";

export function BurgerMenu(props) {
  return (
    <>
      <button
        className="burger-button transition-button"
        type="button"
        onClick={props.onBurgerButtonClick}
      ></button>
      <div
        className={`burger-menu ${props.isOpen ? "burger-menu_opened" : null}`}
      >
        <button
          className="burger-menu__close-button transition-button"
          type="button"
          onClick={props.onClose}
        />
        <div className="burger-menu__wrapper">
          <div className="burger-menu__links-wrapper">
            <Link className="burger-menu__link " to="/">
              Главная
            </Link>
            <Link className="burger-menu__link " to="/movies">
              Фильмы
            </Link>
            <Link className="burger-menu__link" to="/saved-movies">
              Сохраненные фильмы
            </Link>
          </div>
          <Link
            className="burger-menu__profile-button transition-link"
            to="/profile"
          >
            Аккаунт
          </Link>
        </div>
      </div>
    </>
  );
}
