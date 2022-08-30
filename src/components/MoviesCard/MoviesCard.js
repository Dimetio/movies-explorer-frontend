import {useState} from 'react';
import { useLocation } from 'react-router-dom';

import './MoviesCard.css';
import like from '../../images/like.svg';
import likeActive from '../../images/like-active.svg';
import deleteIcon from '../../images/delete.svg';

export default function MoviesCard({
  movie,
  handleMovieIconClick,
  savedMovies,
}) {
  const location = useLocation();
  const [isLike, setIsLike] = useState(false);
  
  function getDuration(duration) {
    return `${Math.floor(duration / 60)}ч ${duration % 60}м`;
  }
   
  const isMyCard = location.pathname === '/saved-movies' ? true : false;

  return (
    <div className="card">
      <a href={movie.trailerLink} target="_blank" rel="noreferrer">
        <img 
          src={isMyCard ? movie.image : `https://api.nomoreparties.co${movie.image.url}`} 
          alt={movie.nameRU} 
          className="card__img"
        />
      </a>

      <div className="card-wrap">
        <p className="card__title">{movie.nameRU}</p>

        <button 
          className={`card-btn ${isMyCard ? 'card__delete' : 'card__like'}`}
          onClick={() => {
              handleMovieIconClick(movie);
              setIsLike(!isLike);
            }
          }
        >
          <img src={
            isMyCard ? deleteIcon : 
            savedMovies.some((m) => m.movieId === movie.id) ? likeActive : like
          } alt={isMyCard ? 'крестик' : 'сердечко'}/>
        </button>
      </div>      

      <span className="card__duration">{getDuration(movie.duration)}</span>
    </div>
  )
}
