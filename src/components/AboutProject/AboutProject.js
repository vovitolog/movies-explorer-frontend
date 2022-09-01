import "./AboutProject.css";
import { SectionHeader } from "../SectionHeader/SectionHeader";

export function AboutProject() {
  return (
    <section className="about-project" id ="about-project">
      <SectionHeader title="О проекте" />
      <ul className="about-project__description">
        <li className="about-project__description-column">
          <h3 className="about-project__description-title">
            Дипломный проект включал 5 этапов
          </h3>
          <p className="about-project__description-subtitle">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </li>
        <li className="about-project__description-column">
          <h3 className="about-project__description-title">
            На выполнение диплома ушло 5 недель
          </h3>
          <p className="about-project__description-subtitle">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </li>
      </ul>
      <div className="about-project__length">
        <p className="about-project__length-backend">1 неделя</p>
        <p className="about-project__length-frontend">4 недели</p>
        <p className="about-project__length-description">Back-end</p>
        <p className="about-project__length-description">Front-end</p>
      </div>
    </section>
  );
}
