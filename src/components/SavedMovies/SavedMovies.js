import {useState} from 'react';


import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

export default function SavedMovies({
    movies,
    handleMovieIconClick,
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
      />
    </>
  )
}
