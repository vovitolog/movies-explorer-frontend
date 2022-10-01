import "./SearchForm.css";
import { useState } from 'react';

export function SearchForm(props) {

  const [searchWord, setSearchWord] = useState(props.previousSearchWord);

  function handleSearch(event) {
    event.preventDefault();

    (props.onSearch(searchWord))
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
