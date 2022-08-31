import './AboutMe.css';
import photo from '../../images/photo-me.jpg';

export default function AboutMe() {
  return(
    <section className="about-me container">
      <h2 className="section__title">Студент</h2>

      <div className="about-me__wrap">
        <div className="about-me__info">
          <h3 className="about-me__title">Дмитрий</h3>
          <p className="about-me__subtile">Фронтенд-разработчик, 29 лет</p>
          <p className="about-me__about">Я родился и живу в Москве. Закончил факультет информатики в МАДИ. У меня есть жена и дочь. Впервые начал заниматься веб разработкой в 2017 году, освоил простую вертку в компании "Модус" на должности контент-менеджрам. После, перешел в "РусКабель", где работал чуть больше года с легаси кодом full-stack. С 2019 работаю в sobaka.ru front-end. Планирую дальше развиваться в этом направлении и стать react разрабочиком.</p>
          
          <ul className="social-links">
            <li className="social-links__item">
                <a href="https://github.com/Dimetio" target="_blank" className="social-links__link" rel="noreferrer">Github</a>
            </li>
          </ul>
        </div>
        
        <img src={photo} alt="фото" className="about-me__img"/>
      </div>
    </section>
  )
}