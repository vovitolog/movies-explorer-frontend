import { Logo } from "../Logo/Logo";
import { BurgerMenu } from "../BurgerMenu/BurgerMenu";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";

export function Navigation() {
  const [isHBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);
  function openBurgerMenu() {
    setIsBurgerMenuOpen(true);
  }
  //Закрытие по нажатию на кнопку
  function closeBurgerMenu() {
    setIsBurgerMenuOpen(false);
  }

  return (
    <nav className="navigation">
      <div className="navigation__wrapper">
        <Logo />
        <ul className="navigation__links">
          <li className="navigation__links-item">
            <Link className="navigation__link transition-link" to="/movies">
              Фильмы
            </Link>
          </li>
          <li className="navigation__links-item">
            <Link
              className="navigation__link transition-link"
              to="/saved-movies"
            >
              Сохраненные фильмы
            </Link>
          </li>
        </ul>
      </div>
      <Link className="navigation__button  transition-button" to="/profile">
        Аккаунт
      </Link>
      <BurgerMenu
        isOpen={isHBurgerMenuOpen}
        onBurgerButtonClick={openBurgerMenu}
        onClose={closeBurgerMenu}
      />
    </nav>
  );
}
