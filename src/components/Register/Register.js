import { Link } from "react-router-dom";
import { Logo } from "../Logo/Logo";
import { useFormWithValidation } from "../Validation/Validation";
import "./Register.css";

export function Register(props) {
  const { values, isValid, handleChange, errors } = useFormWithValidation({
    userName: "",
    userEmail: "",
    userPassword: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isValid) {
      props.onRegister({
        name: values.userName,
        email: values.userEmail,
        password: values.userPassword,
      });
    }
  };

  return (
    <main className="register">
      <Logo />
      <h1 className="register__title">Добро пожаловать!</h1>
      <form className="register__form" onSubmit={handleSubmit}>
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
          value={values.name}
          onChange={(event) => handleChange(event)}
          readOnly={props.isLoading}
        ></input>
        <span
          className={`register__info-message
             ${!isValid ? `register__info-message_active` : null}`}
        >
          {errors?.userName}
        </span>
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
          value={values.email}
          onChange={(event) => handleChange(event)}
          readOnly={props.isLoading}
        ></input>
        <span
          className={`register__info-message
             ${!isValid ? `register__info-message_active` : null}`}
        >
          {errors?.userEmail}
        </span>
        <label className="register__label">Пароль</label>
        <input
          className="register__input"
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
          className={`register__info-message
             ${!isValid ? `register__info-message_active` : null}`}
        >
          {errors?.userPassword}
        </span>
        <span
          className={`register__info-message
             ${
               props.isRegistrationSuccessful
                 ? `register__info-message_active-success`
                 : `register__info-message_active`
             }`}
        >
          {props.isRegistrationSuccessful
            ? `${props.userMessage}`
            : `${props.registrationError}`}
        </span>
        <button
          className="register__button transition-button"
          type="submit"
          disabled={!isValid}
        >
          Зарегистрироваться
        </button>
        <div className="register__redirect">
          <span className="register__redirect-span">Уже зарегистрированы?</span>
          <Link
            className="register__redirect-link transition-link"
            to="/signin"
          >
            Войти
          </Link>
        </div>
      </form>
    </main>
  );
}
