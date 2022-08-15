import './Footer.css';

export default function Footer({footerDisable}) {
  return (
    <footer className={`footer container ${footerDisable && "footer-disable"}`}>
      <h3 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h3>

      <div className="footer-wrap">
        <span className="footer__date">© 2020</span>

        <ul className="footer__social-links">
            <li className="footer__social-links__item">
                <a href="https://practicum.yandex.ru/" target="_blank" className="footer__social-links__link" rel="noreferrer">Яндекс.Практикум</a>
            </li>
            <li className="footer__social-links__item">
                <a href="https://github.com/Dimetio" target="_blank" className="footer__social-links__link" rel="noreferrer">Github</a>
            </li>
            <li className="footer__social-links__item">
                <a href="https://www.facebook.com/profile.php?id=100008160217923" target="_blank" className="footer__social-links__link" rel="noreferrer">Facebook</a>
            </li>
          </ul>
      </div>
    </footer>
  )
}