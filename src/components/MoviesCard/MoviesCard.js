import './MoviesCard.css';
import cardPhoto from '../../images/phoro-1.jpg';
import like from '../../images/like.svg';
import likeActive from '../../images/like-active.svg';
import deleteIcon from '../../images/delete.svg';

export default function MoviesCard() {
  let isMyCard;

  window.location.pathname === '/saved-movies' 
  ? isMyCard = true 
  : isMyCard = false;

  return (
    <div className="card">
      <img src={cardPhoto} alt="картинка" className="card__img"/>

      <div className="card-wrap">
        <p className="card__title">33 слова о дизайне</p>

        {isMyCard && <img src={deleteIcon} alt="сердечко" className="card-icon card__delete"/>}
        {!isMyCard && <img src={likeActive} alt="сердечко" className="card-icon card__like"/>}
      </div>

      <span className="card__duration">1ч 47м</span>
    </div>
  )
}
