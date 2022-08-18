import './NotFound.css'

export default function NotFound() {
  return (
    <section className="not-found">
      <p className="not-found__code">404</p>
      <p className="not-found__text">Страница не найдена</p>

      <a href="/" className="not-found__link">Назад</a>
    </section>
  )
}
