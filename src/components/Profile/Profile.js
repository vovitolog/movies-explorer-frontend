import { useContext, useState, useRef, useEffect } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useFormWithValidation } from "../Validation/Validation";
import { Header } from "../Header/Header";
import "./Profile.css";

export function Profile(props) {
  const currentUser = useContext(CurrentUserContext);

     const [dataIsChanged, setDataIsChanged] = useState(false);

    const nameRef = useRef("");
    const emailRef = useRef("");
    const { values, isValid, handleChange, errors } = useFormWithValidation({
      userName: nameRef.current.value,
      userEmail: emailRef.currentValue,
    });

     useEffect(() => {
      nameRef.current.value === currentUser.name &&
      emailRef.current.value === currentUser.email
        ? setDataIsChanged(false)
        : setDataIsChanged(true);
    }, [values.userName, values.userEmail, currentUser.email, currentUser.name]);

    const handleSubmit = (event) => {
      event.preventDefault();
      if (isValid) {
        props.onUpdateProfile({
          name: nameRef.current.value,
          email: emailRef.current.value,
        });
      }
    };

  return (
    <>
      <Header loggedIn={props.loggedIn} />
      <main className="profile">
        <h1 className="profile__title">Привет, {currentUser.name}!</h1>
        <form className="profile__form" onSubmit={handleSubmit}>
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
                defaultValue={currentUser.name}
                  onChange={(event) => handleChange(event)}
                  ref={nameRef}
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
                onChange={(event) => handleChange(event)}
                defaultValue={currentUser.email}
                ref={emailRef}
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
