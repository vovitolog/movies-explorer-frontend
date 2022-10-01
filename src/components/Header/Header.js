import { Logo } from "../Logo/Logo";
import { Link } from "react-router-dom";
import { Navigation } from "../Navigation/Navigation";
import "./Header.css";

export function Header(props) {
  const loggedIn = props.loggedIn;

  return (
    <>
      {loggedIn ? (
        <header className="header">
          <Navigation />
        </header>
      ) : (
        <header className="header">
          <div className="header__wrapper">
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
          </div>
        </header>
      )}
    </>
  );
}
