import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

export default function MoviesCardList({
  movies, 
  handleMovieIconClick,
  moviesListLength,
  savedMovies,
}) {
  return (
    <section className="movies-list">
      {
        movies.map((movie) => (
          <MoviesCard 
            movie={movie}
            key={movie.id ? movie.id : movie.movieId}
            handleMovieIconClick={handleMovieIconClick}
            savedMovies={savedMovies}
          />
        )).slice(0, moviesListLength)
      }
    </section>
  )
}
