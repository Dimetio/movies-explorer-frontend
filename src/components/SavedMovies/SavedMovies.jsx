// react
import { useState, useEffect } from 'react';
// custom
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import useFilteredMovies from '../../hook/useFilteredMovies';

export default function SavedMovies({
  movies,
  handleMovieIconClick,
}) {
  const [localCheck, setLocalCheck] = useState(JSON.parse(localStorage.getItem('saved-movies-check')) ?? false);
  const [localValue, setLocalValue] = useState(localStorage.getItem('saved-movies-search-value') ?? '');
  const [pretext, setPretext] = useState('Введите название фильма в поисковой строке');

  const filteredMovies = useFilteredMovies(movies, localCheck, localValue);
  const [localSavedMovies, setLocalSavedMovies] = useState(JSON.parse(localStorage.getItem('filtered-saved-movies')) ?? filteredMovies);

  function onCheckChange(checked) {
    localStorage.setItem('saved-movies-check', checked);
    setLocalCheck(checked);
  }

  function onValueChange(value) {
    localStorage.setItem('saved-movies-search-value', value);
    setLocalValue(value);
  }

  useEffect(() => {
    if (movies.length && !filteredMovies.length) {
      setPretext('Ничего не найдено');
    }

  }, [movies.length, filteredMovies.length]);

  useEffect(() => {
    if (localSavedMovies !== filteredMovies) {
      localStorage.setItem('filtered-saved-movies', JSON.stringify(filteredMovies));
      setLocalSavedMovies(filteredMovies);
    }
  }, [filteredMovies, localSavedMovies]);

  return (
    <>
      <SearchForm
        handleSearch={onValueChange}
        initialValue={localValue}
        initialChecked={localCheck}
        onCheckChange={onCheckChange}
      />

      <MoviesCardList
        movies={localSavedMovies}
        handleMovieIconClick={handleMovieIconClick}
      />

      {
        filteredMovies.length === 0 ? <p className="movies-pretext">{pretext}</p> : null
      }

    </>
  )
}
