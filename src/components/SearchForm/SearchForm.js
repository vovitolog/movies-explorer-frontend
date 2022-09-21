import "./SearchForm.css";

export function SearchForm(props) {
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
            required
          />
          <button
            className="search-form__button transition-button"
            type="submit"
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
