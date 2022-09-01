import "./NavTab.css";

export function NavTab() {
  return (
    <>
      <div className="navigation-tab">
        <a className="navigation-tab__link " href="#about-project">
          <button className="navigation-tab__button transition-button">
            О проекте
          </button>
        </a>
        <a className="navigation-tab__link" href="#techs">
          <button className="navigation-tab__button  transition-button">
            Технологии
          </button>
        </a>
        <a className="navigation-tab__link " href="#about-me">
          <button className="navigation-tab__button  transition-button">
            Студент
          </button>
        </a>
      </div>
    </>
  );
}
