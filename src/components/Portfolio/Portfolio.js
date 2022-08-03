/* eslint-disable jsx-a11y/anchor-is-valid */
import './Portfolio.css';
import arrow from '../../images/arrow.svg';

export default function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>

      <ul className="portfolio__list">
        <li className="portfolio__list-item">
          <a href="#" target="_blank" className="portfolio__list-link" rel="noreferrer">Статичный сайт</a>
          <img className="porfolio__list-img" src={arrow} alt="стрелка" />
        </li>

        <li className="portfolio__list-item">
          <a href="#" target="_blank" className="portfolio__list-link" rel="noreferrer">Адаптивный сайт</a>
          <img className="porfolio__list-img" src={arrow} alt="стрелка"/>
        </li>

        <li className="portfolio__list-item">
          <a href="#" target="_blank" className="portfolio__list-link" rel="noreferrer">Одностраничное приложение</a>
          <img className="porfolio__list-img" src={arrow} alt="стрелка"/>
        </li>       
      </ul>
    </section>
  )
} 