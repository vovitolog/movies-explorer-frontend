import { Link } from "react-router-dom";
import "./Portfolio.css";

export function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__list">
        <li className="portfolio__list-item ">
          <Link
            className="portfolio__link transition-link"
            to={{ pathname: "https://github.com/vovitolog/how-to-learn" }}
            target="_blank"
          >
            <p className="portfolio__link-text">Статичный сайт</p>
          </Link>
          <div className="portfolio__link-icon" />
        </li>
        <li className="portfolio__list-item">
          <Link
            className="portfolio__link transition-link"
            to={{ pathname: "https://github.com/vovitolog/russian-travel" }}
            target="_blank"
          >
            <p className="portfolio__link-text">Адаптивный сайт</p>
          </Link>
          <div className="portfolio__link-icon" />
        </li>
        <li className="portfolio__list-item">
          <Link
            className="portfolio__link transition-link"
            to={{ pathname: "https://github.com/vovitolog/mesto" }}
            target="_blank"
          >
            <p className="portfolio__link-text">Одностраничное приложение</p>
          </Link>
          <div className="portfolio__link-icon" />
        </li>
      </ul>
    </section>
  );
}
