import { Link } from "react-router-dom";
import { Logo } from "../Logo/Logo";
import "./Register.css";

export function Register() {
  return (
    <main className="register">
      <Logo />
      <h1 className="register__title">Добро пожаловать!</h1>
      <form className="register__form">
        <label className="register__label">Имя</label>
        <input
          className="register__input"
          minLength="2"
          maxLength="30"
          type="text"
          name="userName"
          id="userName"
          placeholder="Владимир"
          required
        ></input>
        <label className="register__label">E-mail</label>
        <input
          className="register__input"
          minLength="2"
          maxLength="30"
          type="email"
          name="userEmail"
          id="userEmail"
          placeholder="pochta@yandex.ru"
          required
        ></input>
        <label className="register__label">Пароль</label>
        <input
          className="register__input"
          minLength="2"
          maxLength="30"
          type="password"
          name="userPassword"
          id="userPassword"
          required
        ></input>
        <span className="register__input-error">
          Что-то пошло не так...
        </span>
        <button className="register__button transition-button" type="submit">
          Зарегистрироваться
        </button>
        <div className="register__redirect">
        <span className="register__redirect-span">Уже зарегистрированы?</span>
        <Link className="register__redirect-link transition-link" to="/signin">
          Войти
        </Link>
        </div>
      </form>
    </main>
  );
}
