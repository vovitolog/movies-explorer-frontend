import { Link } from "react-router-dom";
import "./AboutMe.css";
import { SectionHeader } from "../SectionHeader/SectionHeader";
import photo from "../../images/student.jpg";

export function AboutMe() {
  return (
    <section className="about-me id" id="about-me">
      <SectionHeader title="Студент" />
      <div className="about-me__wrapper">
        <div className="about-me__profile">
          <h1 className="about-me__profile-title">Владимир</h1>
          <p className="about-me__profile-subtitle">
            Фронтенд-разработчик, 37 лет
          </p>
          <p className="about-me__profile-info">
            Решил перейти в сферу разработки так как хочу создавать полезные и
            удобные для людей продукты. Фронтенд привлекает тем, что сразу виден
            результат твоей работы. Ранее имел опыт создания сайтов на
            конструкторах, но всегда хотелось иметь полный контроль над
            написанием кода. Последний год активно развиваюсь как
            frontend-разработчик. Увлекаюсь бегом, люблю открывать новые места
            во время пробежек в путешествиях.
          </p>
          <ul className="about-me__profile-links">
            <li>
              <Link
                to={{ pathname: "https://github.com/vovitolog" }}
                className="header__button"
                target="_blank"
              >
                Github
              </Link>
            </li>
            <li>
              <Link
                to={{ pathname: "https://career.habr.com/vovitolog" }}
                className="header__button"
                target="_blank"
              >
                Хабр карьера
              </Link>
            </li>
          </ul>
        </div>
        <img className="about-me__photo" src={photo} alt="Фото студента" />
      </div>
    </section>
  );
}
