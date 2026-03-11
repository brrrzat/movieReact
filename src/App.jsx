
import { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import MovieCard from './MovieCard';
import MovieDetails from './MovieDetails';
import MovieLogo from './assets/movieLogo.png'

const API_KEY = "3f03a5c5";
const API_URL = "https://www.omdbapi.com/";


function Home({ movies, searchTerm, setSearchTerm, handleSearch }) {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <>
      <section className="hero">
        <div className="hero-content" style={{ display: 'flex', gap: '15%' }}>
          <h1>Most complete movie information search engine</h1>
          <p className="hero-desc">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis dolore non aut nihil nobis assumenda recusandae ullam at rerum. Odio debitis perferendis ipsam nihil id quibusdam inventore corporis consectetur quo!
          </p>
        </div>
      </section>

      <main id="movie-container">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))
        ) : (
          <p>Movies not found!</p>
        )}
      </main>
    </>
  );
}

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const fetchMovies = async (query) => {
    try {
      const response = await fetch(`${API_URL}?apikey=${API_KEY}&s=${query}`);
      const data = await response.json();

      if (data.Search) {
        setMovies(data.Search);
      } else {
        setMovies([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchMovies("Batman");
  }, []);

  const handleSearch = () => {
    if (searchTerm) {
      fetchMovies(searchTerm);
    }
  };

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <>
      <header>
        <Link to="/" id="h-left" style={{ textDecoration: 'none' }}>
          <img src={MovieLogo} alt="Logo" />
          <h2 id="title">Movie</h2>
        </Link>

        <div id="h-controls">
          <input
            type="text"
            id="search-input"
            placeholder="Search movies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button className="btn" id="search-btn" onClick={handleSearch}>
            Search
          </button>
          <button id="theme-btn" className="btn" onClick={toggleTheme}>
            {theme === 'dark' ? '🌞' : '🌚'}
          </button>
        </div>
      </header>


      <Routes>
        <Route
          path="/"
          element={<Home movies={movies} searchTerm={searchTerm} setSearchTerm={setSearchTerm} handleSearch={handleSearch} />}
        />
        <Route path="/movies/:id" element={<MovieDetails />} />
      </Routes>

      <p style={{ textAlign: 'center', marginTop: '40px' }}>SCA-24C S. B.</p>
    </>
  );
}

export default App;