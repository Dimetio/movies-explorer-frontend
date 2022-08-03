import './Promo.css';
import image from '../../images/earth.png'

export default function Promo() {
  return (
    <section className="promo">
      <div className="promo__content">
        <div className="promo__wrap-text">
          <h1 className="promo__title">Учебный проект студента факультета
          Веб-разработки.</h1>
          <p className="promo__note">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
        </div>
        
        <img src={image} alt="земля" className="promo__image"/>
      </div>
      
      <a href="#AboutProject" className="promo__anchor">Узнать больше</a>
    </section>
  )
}