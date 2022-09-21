import { Logo } from "../Logo/Logo";
import { Link } from "react-router-dom";
import "./Header.css";

export function Header() {
  return (
    <header className="header">
      <Logo />
      <ul className="header__links">
        <li className="header__links-item">
          <Link className="header__link transition-link" to="/signup">
            Регистрация
          </Link>
        </li>
        <li className="header__links-item">
        <Link className="header__button transition-button" to="/signin">
          Войти
        </Link>
        </li>
      </ul>
    </header>
  );
}
