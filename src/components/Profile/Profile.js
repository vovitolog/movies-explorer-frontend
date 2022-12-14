import { Navigation } from "../Navigation/Navigation";
import "./Profile.css";

export function Profile() {
  return (
    <>
      <Navigation />
      <main className="profile">
        <h1 className="profile__title">Привет, Владимир!</h1>
        <form className="profile__form">
          <div className="profile__input-wrapper">
            <label className="profile__input-label">
              Имя
              <input
                className="profile__input"
                id="userName"
                placeholder="Владимир"
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
        <button
          type="button"
          className="profile__button-logout transition-button"
        >
          Выйти из аккаунта
        </button>
      </main>
    </>
  );
}
