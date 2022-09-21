import { Link } from "react-router-dom";
import "./Footer.css";

export function Footer() {
  return (
    <footer className="footer">
      <h3 className="footer__title">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </h3>
      <div className="footer__wrapper">
        <p className="footer__copyright">{new Date().getFullYear()}</p>

          <ul className="footer__links">
            <li>
              <Link
                className="footer__link"
                to={{ pathname: "https://practicum.yandex.ru/" }}
                target="_blank"
              >
                Яндекс.Практикум
              </Link>
            </li>
            <li>
              <Link
                className="footer__link"
                to={{ pathname: "https://github.com/vovitolog" }}
                target="_blank"
              >
                Github
              </Link>
            </li>
          </ul>

      </div>
    </footer>
  );
}
