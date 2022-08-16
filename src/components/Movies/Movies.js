import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

export default function Movies() {
  return (
    <>
      <SearchForm />
      <Preloader />
      <MoviesCardList />

      <button type="button" className="movies-list__more">Ещё</button>
    </>
    
  )
}