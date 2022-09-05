import { useNavigate } from "react-router-dom";
import './NotFound.css'

export default function NotFound() {
  let navigate = useNavigate();

  function handleClick() {
    return navigate(-1);
  }

  return (
    <section className="not-found">
      <p className="not-found__code">404</p>
      <p className="not-found__text">Страница не найдена</p>

      <button
        type="button"
        className="not-found__back"
        onClick={handleClick}
      >Назад</button>
    </section>
  )
}
