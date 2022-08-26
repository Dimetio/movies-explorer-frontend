import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

export default function MoviesCardList({
  movies, 
  handleMovieIconClick,
  isLike,
  moviesListLength,
  savedMovies,
}) {
  return (
    <section className="movies-list">
      {
        movies.map((movie, index) => (
          <MoviesCard 
            movie={movie}
            key={movie.id ? movie.id : index}
            handleMovieIconClick={handleMovieIconClick}
            isLike={isLike}
            savedMovies={savedMovies}
          />
        )).slice(0, moviesListLength)
      }
    </section>
  )
}
