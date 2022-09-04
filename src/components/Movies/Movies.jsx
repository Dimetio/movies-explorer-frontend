// react
import { useState, useEffect, useMemo } from 'react';
// custom
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import useFilteredMovies from '../../hook/useFilteredMovies';
// api
import beatfilmMoviesApi from '../../utils/MoviesApi';

export default function Movies({
  handleMovieIconClick,
  moviesListLength,
  getMoreMovies,
  savedMovies,
}) {

  const [movies, setMovies] = useState(JSON.parse(localStorage.getItem('movies')) ?? []);
  const [localCheck, setLocalCheck] = useState(JSON.parse(localStorage.getItem('movies-check')) ?? false);
  const [localValue, setLocalValue] = useState(localStorage.getItem('movies-search-value') ?? '');
  const [isLoading, setIsLoading] = useState(false);
  const [pretext, setPretext] = useState('Введите название фильма в поисковой строке');

  const filteredMovies = useFilteredMovies(movies, localCheck, localValue);
  const [localMovies, setLocalMovies] = useState(JSON.parse(localStorage.getItem('filtered-movies')) ?? filteredMovies);

  function getAllMovies() {
    setIsLoading(true);
    beatfilmMoviesApi.getMovies()
      .then(moviesList => {
        if (moviesList.length) {
          localStorage.setItem('movies', JSON.stringify(moviesList));
          setMovies(moviesList);
        }
      })
      .catch(() => setPretext('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'))
      .finally(() => setIsLoading(false))
  }

  function onCheckChange(checked) {
    localStorage.setItem('movies-check', checked);
    setLocalCheck(checked);
  }

  function onValueChange(value) {
    if (movies.length === 0) {
      getAllMovies();
    }
    localStorage.setItem('movies-search-value', value);
    setLocalValue(value);
  }

  useEffect(() => {
    if (movies.length && !filteredMovies.length) {
      setPretext('Ничего не найдено');
    }
  }, [movies.length, filteredMovies.length]);

  useEffect(() => {
    if (localMovies !== filteredMovies) {
      localStorage.setItem('filtered-movies', JSON.stringify(filteredMovies));
      setLocalMovies(filteredMovies);
    }
  }, [filteredMovies, localMovies]);

  return (
    <>
      <SearchForm
        handleSearch={onValueChange}
        initialValue={localValue}
        initialChecked={localCheck}
        onCheckChange={onCheckChange}
        disabledCheck={!localValue}
      />

      {isLoading ?
        <Preloader />
        :
        <MoviesCardList
          movies={localMovies}
          handleMovieIconClick={handleMovieIconClick}
          moviesListLength={moviesListLength}
          savedMovies={savedMovies}
        />
      }

      {
        filteredMovies.length === 0 ?
          <p className="movies-pretext">{pretext}</p> :
          filteredMovies.length > moviesListLength &&
          <button
            type="button"
            className="movies-list__more"
            onClick={getMoreMovies}
          >Ещё</button>
      }

    </>
  )
}