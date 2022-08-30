import { Link } from "react-router-dom";
import { Header } from "../Header/Header";
import "./Profile.css";

export function Profile() {
  return (
    <>
      <Header />
      <main className="profile">
        <h1 className="profile__title">Привет, Виталий!</h1>
        <form className="profile__form">
          <div className="profile__input-wrapper">
            <label className="profile__input-label">
              Имя
              <input
                className="profile__input"
                id="userName"
                placeholder="Виталий"
                name="userName"
                minLength="2"
                maxLength="30"
                type="text"
                required
              />
            </label>
            <label className="profile__input-label">
              Почта
              <input
                className="profile__input"
                id="userEmail"
                placeholder="pochta@yandex.ru"
                minLength="2"
                maxLength="30"
                name="userEmail"
                type="email"
                required
              />
            </label>
          </div>
          <button
            className="profile__button-submit transition-button"
            type="submit"
          >
            Редактировать
          </button>
        </form>
        <button className="profile__button-logout transition-button">
          Выйти из аккаунта
        </button>
      </main>
    </>
  );
}
