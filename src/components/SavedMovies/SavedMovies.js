import {useState} from 'react';


import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

export default function SavedMovies({movies, handleMovieIconClick}) {
  const [isShort, setIsShort] = useState(false);

  function handleShort() {
    setIsShort(!isShort);
  }
  return (
    <>
      <SearchForm handleShort={handleShort} isShort={isShort}/>

      <MoviesCardList 
        movies={movies}
        handleMovieIconClick={handleMovieIconClick}
      />
    </>
  )
}
