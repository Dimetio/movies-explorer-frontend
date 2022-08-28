import {useState} from 'react';

import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

export default function SavedMovies({
    movies,
    handleMovieIconClick,
    handleSearch,
    durationSwitch,
    pretext
}) {
  const [isShort, setIsShort] = useState(false);

  function handleShort() {
    setIsShort(!isShort);
    durationSwitch(!isShort);
  }
  // ловлю баг с переключателем обратно, массив пустой
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
      />

      {
        movies.length === 0 ? <p className="movies-pretext">{pretext}</p> : null
      }
      
    </>
  )
}
