/* eslint-disable jsx-a11y/anchor-is-valid */
import './Portfolio.css';
import arrow from '../../images/arrow.svg';

export default function Portfolio() {
  return (
    <section className="portfolio container">
      <h2 className="portfolio__title">Портфолио</h2>

      
      <ul className="portfolio__list">
        <a href="https://github.com/Dimetio/russian-travel" target="_blank" className="portfolio__list-link" rel="noreferrer">
          <li className="portfolio__list-item">
            Статичный сайт
            <img className="porfolio__list-img" src={arrow} alt="стрелка" />
          </li>
        </a>

        <a href="https://github.com/Dimetio/mesto-react" target="_blank" className="portfolio__list-link" rel="noreferrer">
          <li className="portfolio__list-item">
            Адаптивный сайт
            <img className="porfolio__list-img" src={arrow} alt="стрелка"/>
          </li>
        </a>

        <a href="https://github.com/Dimetio/react-mesto-api-full" target="_blank" className="portfolio__list-link" rel="noreferrer">
          <li className="portfolio__list-item">
            Одностраничное приложение
            <img className="porfolio__list-img" src={arrow} alt="стрелка"/>
          </li>    
        </a>   
      </ul>
    </section>
  )
} 