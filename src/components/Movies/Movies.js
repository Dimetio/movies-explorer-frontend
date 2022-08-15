import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

export default function Movies() {
  return (
    <>
      <SearchForm />

      <MoviesCardList />

      <button type="button" className="movies-list__more">Ещё</button>
    </>
    
  )
}