import "./SearchForm.css";
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

export function SearchForm(props) {

  const location = useLocation();
  const [searchWord, setSearchWord] = useState(props.previousSearchWord);

  function handleSearch(event) {
    event.preventDefault();
    location.pathname === '/movies' ?
    (props.onSearch(searchWord)) : (props.onSavedMoviesSearch(searchWord));
  }

  return (
    <section className="search-form">
      <form className="search-form__form">
        <label className="search-form__wrapper">
          <input
            type="search"
            className="search-form__input"
            name="searchInput"
            id="searchInput"
            placeholder="Фильм"
            onChange={event => setSearchWord(event.target.value)}
            required
          />
          <button
            className="search-form__button transition-button"
            type="submit"
            onClick={handleSearch}
          />
        </label>
        <div className="search-form__switch">
          <label className="search-form__switch-container">
            <input
              name="shortMovies"
              id="shortMovies"
              onChange={props.onToggleSwitchClick}
              checked={location.pathname === '/movies' ? (props.isChecked ? true : false) : (props.savedIsChecked ? true : false)}
              className="search-form__switch-checkbox"
              type="checkbox"
            />
            <p className="search-form__switch-text">Короткометражки</p>
          </label>
        </div>
      </form>
    </section>
  );
}
