import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCard from '../MoviesCard/MoviesCard'

export default function SavedMovies() {
  return (
    <>
      <SearchForm />
      <section className="saved-movies-list container">
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
      </section>
    </>
  )
}
