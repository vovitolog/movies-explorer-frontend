import { Link } from "react-router-dom";
import { Logo } from "../Logo/Logo";
import "./Login.css";

export function Login() {
  return (
    <main className="login">
      <Logo />
      <h1 className="login__title">Рады видеть!</h1>
      <form className="login__form">
        <label className="login__label">E-mail</label>
        <input
          className="login__input"
          minLength="2"
          maxLength="30"
          type="email"
          name="userEmail"
          id="userEmail"
          placeholder="pochta@yandex.ru"
          required
        ></input>
        <label className="login__label">Пароль</label>
        <input
          className="login__input"
          minLength="2"
          maxLength="30"
          type="password"
          name="userPassword"
          id="userPassword"
          required
        ></input>
        <button className="login__button transition-button" type="submit">
          Войти
        </button>
        <div className="login__redirect">
          <span className="login__redirect-span">Ещё не зарегистрированы?</span>
          <Link className="login__redirect-link transition-link" to="/signup">
            Регистрация
          </Link>
        </div>
      </form>
    </main>
  );
}
