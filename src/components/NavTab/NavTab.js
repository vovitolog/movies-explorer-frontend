import "./NavTab.css";

export function NavTab() {
  return (
    <>
      <div className="navigation-tab">
        <a href="#about-project">
          <button
            type="button"
            className="navigation-tab__button transition-button"
          >
            О проекте
          </button>
        </a>
        <a href="#techs">
          <button
            type="button"
            className="navigation-tab__button  transition-button"
          >
            Технологии
          </button>
        </a>
        <a href="#about-me">
          <button
            type="button"
            className="navigation-tab__button  transition-button"
          >
            Студент
          </button>
        </a>
      </div>
    </>
  );
}
