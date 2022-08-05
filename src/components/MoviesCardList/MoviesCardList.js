import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

export default function MoviesCardList() {
  return (
    <section className="movies-list container">
      <MoviesCard />
      <MoviesCard />
      <MoviesCard />
      <MoviesCard />
      <MoviesCard />
      <MoviesCard />

      <button type="button" className="movies-list__more">Еще</button>
    </section>
  )
}
