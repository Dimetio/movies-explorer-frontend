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
  function onCheckChange(checked) {
    durationSwitch(checked);
    localStorage.setItem('saved-movies-check', checked);
  }

  function onValueChange(value) {
    handleSearch(value)
    localStorage.setItem('saved-movies-search-value', value);
  }
  return (
    <>
      <SearchForm 
        handleSearch={onValueChange}
        initialValue={localStorage.getItem('saved-movies-search-value')}
        initialChecked={JSON.parse(localStorage.getItem('saved-movies-check'))}
        onCheckChange={onCheckChange}
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
