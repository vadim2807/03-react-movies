import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { fetchMovies } from '../../services/movieService';
import type{ Movie } from '../../types/movie';
import SearchBar from '../SearchBar/SearchBar';
import MovieGrid from '../MovieGrid/MovieGrid';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieModal from '../MovieModal/MovieModal';
import css from './App.module.css';


export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [searchKey, setSearchKey] = useState(0);

  useEffect(() => {
    if (!query) return;

    const fetchData = async () => {
      setLoading(true);
      setError(false);
      try {
        const data = await fetchMovies({ query });
        if (data.results.length === 0) {
          toast.error('No movies found for your request.');
        }
        setMovies(data.results);
      } catch {
        setError(true);
        toast.error('There was an error, please try again...');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query, searchKey]);

  // отправка формы поиска
  function handleSearchSubmit(searchQuery: string) {
    setMovies([]); // Очищаем предыдущие результаты
    setError(false); // Сбрасываем ошибку
    setQuery(searchQuery);
    setSearchKey(searchKey + 1); // Увеличиваем ключ для принудительного обновления
  }

  // выбор фильма для отображения в модальном окне
  function handleMovieSelect(movie: Movie) {
    setSelectedMovie(movie);
  }

  // Закрывает модальное окно
  function handleModalClose() {
    setSelectedMovie(null);
  }

  return (
    <div className={css.app}>
      <SearchBar onSubmit={handleSearchSubmit} />
      {loading && <Loader />}
      {error && <ErrorMessage />}
      {!loading && !error && (
        <MovieGrid movies={movies} onSelect={handleMovieSelect} />
      )}
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleModalClose} />
      )}
    </div>
  );
}