import "./NotFound.css";

export function NotFound() {
  return (
    <main className="not-found">
      <h1 className="not-fountd__title">404</h1>
      <p className="not-found__subtitle">Страница не найдена</p>
      <button type = "button" className="not-found__button transition-button">Назад</button>
    </main>
  );
}
