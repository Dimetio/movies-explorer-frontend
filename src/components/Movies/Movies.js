import Preloader from '../Preloader/Preloader';

import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

export default function Movies({
  movies,
  handleMovieIconClick,
  moviesListLength,
  getMoreMovies,
  handleSearch,
  durationSwitch,
  savedMovies,
  pretext,
  isLoading
}) {

  function onCheckChange(checked) {
    durationSwitch(checked);
    localStorage.setItem('movies-check', checked);
  }

  function onValueChange(value) {
    handleSearch(value)
    localStorage.setItem('movies-search-value', value);
  }
  return (
    <>
      <SearchForm 
        handleSearch={onValueChange}
        initialValue={localStorage.getItem('movies-search-value')}
        initialChecked={JSON.parse(localStorage.getItem('movies-check'))}
        onCheckChange={onCheckChange}
      />
      
      {isLoading ? 
        <Preloader/> 
        :
        <MoviesCardList 
        movies={movies}
        handleMovieIconClick={handleMovieIconClick}
        moviesListLength={moviesListLength}
        savedMovies={savedMovies}
      />
      }

      { 
        movies.length === 0 ? 
        <p className="movies-pretext">{pretext}</p> :
        movies.length > moviesListLength &&         
        <button 
          type="button" 
          className="movies-list__more"
          onClick={getMoreMovies}
        >Ещё</button>
      }
      
    </>    
  )
}