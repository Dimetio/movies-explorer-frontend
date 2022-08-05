import './MoviesCard.css';
import cardPhoto from '../../images/phoro-1.jpg';
import like from '../../images/like.svg';
import likeActive from '../../images/like-active.svg';

export default function MoviesCard() {
  return (
    <div className="card">
      <img src={cardPhoto} alt="картинка" className="card__img"/>

      <div className="card-wrap">
        <p className="card__title">33 слова о дизайне</p>
        <img src={likeActive} alt="сердечко" className="card__like"/>
      </div>

      <span className="card__duration">1ч 47м</span>
    </div>
  )
}
