import {useState, useEffect} from 'react';

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
  savedMovies
}) {
  const [isShort, setIsShort] = useState(false);
  
  function handleShort(e) {
    setIsShort(!isShort);
    durationSwitch(!isShort);
    localStorage.setItem('local-check', !isShort);
  }

  useEffect(() => {    
    const localCheck = JSON.parse(localStorage.getItem('local-check'));
    setIsShort(localCheck ?? false);
  }, []);

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
        savedMovies={savedMovies}
      />

      { 
        movies.length === 0 ? 
        <p className="movies-pretext">Введите название фильма в поисковой строке</p> :
        movies.length > moviesListLength &&         
        <button 
          type="button" 
          className="movies-list__more"
          onClick={moreMovies}
        >Ещё</button>
      }
      
    </>
    
  )
}