import "./Techs.css";
import { SectionHeader } from "../SectionHeader/SectionHeader";

export function Techs() {
  return (
    <section className="techs" id="techs">
      <SectionHeader title="Технологии" />
      <h1 className="techs__title">7 технологий</h1>
      <p className="techs__subtitle">
        На курсе веб-разработки мы освоили технологии, которые применили в
        дипломном проекте.
      </p>
      <ul className="techs__list">
        <li className="techs__list-item">
          HTML
        </li>
        <li className="techs__list-item">
          CSS
        </li>
        <li className="techs__list-item">
          JS
        </li>
        <li className="techs__list-item">
          React
        </li>
        <li className="techs__list-item">
          Git
        </li>
        <li className="techs__list-item">
          Express.js
        </li>
        <li className="techs__list-item">
          MongoDB
        </li>
      </ul>
    </section>
  );
}
