import {useState} from 'react';

import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

export default function Movies({
  movies,
  handleMovieIconClick,
  moviesListLength,
  moreMovies,
  handleSearch,
  durationSwitch,
}) {
  const [isShort, setIsShort] = useState(false);

  function handleShort() {
    setIsShort(!isShort);
    durationSwitch(!isShort);
  }
  return (
    <>
      <SearchForm 
        handleShort={handleShort}
        isShort={isShort}
        handleSearch={handleSearch}
      />
      <MoviesCardList 
        movies={movies}
        handleMovieIconClick={handleMovieIconClick}
        moviesListLength={moviesListLength}
      />

      <button 
        type="button" 
        className="movies-list__more"
        onClick={moreMovies}
      >Ещё</button>
    </>
    
  )
}