import { Link } from "react-router-dom";
import { Logo } from "../Logo/Logo";
import { useFormWithValidation } from "../Validation/Validation";
import "./Login.css";

export function Login(props) {
  const { values, isValid, handleChange, errors } = useFormWithValidation({
    userEmail: "",
    userPassword: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isValid) {
      props.onLogin({
        email: values.userEmail,
        password: values.userPassword,
      });
    }
  };

  return (
    <main className="login">
      <Logo />
      <h1 className="login__title">Рады видеть!</h1>
      <form className="login__form" onSubmit={handleSubmit}>
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
          value={values.email}
          onChange={(event) => handleChange(event)}
          readOnly={props.isLoading}
        ></input>
        <span
          className={`login__info-message
             ${!isValid ? `login__info-message_active` : null}`}
        >
          {errors?.userEmail}
        </span>
        <label className="login__label">Пароль</label>
        <input
          className="login__input"
          minLength="2"
          maxLength="30"
          type="password"
          name="userPassword"
          id="userPassword"
          required
          value={values.password}
          onChange={(event) => handleChange(event)}
          readOnly={props.isLoading}
        ></input>
        <span
          className={`login__info-message
             ${!isValid ? `login__info-message_active` : null}`}
        >
          {errors?.userPassword}
        </span>
        <span
          className={`login__info-message
             ${props.loginError ? `login__info-message_active` : null}`}
        >
          {props.loginErrorMessage}
        </span>
        <button
          className="login__button transition-button"
          type="submit"
          disabled={!isValid}
        >
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
