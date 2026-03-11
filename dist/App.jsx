import { useState, useEffect } from 'react';
import './App.css';
import MovieCard from './MovieCard';
import MovieLogo from './assets/movieLogo.png'

const API_KEY = "3f03a5c5";
const API_URL = "https://www.omdbapi.com/";

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
  
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <>
      <header>
        <div id="h-left">
          <img src={MovieLogo} /> 
          <h2 id="title">Movie</h2>
        </div>
        
        <div id="h-controls">
          <input 
            type="text" 
            id="search-input" 
            placeholder="Search movies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button className="btn" id="search-btn" onClick={handleSearch}>
            Search
          </button>
          <button id="theme-btn" class="btn" onClick={toggleTheme}>
            {theme === 'dark' ? '🌞' : '🌚'}
          </button>
        </div>
      </header>

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

      <p>SCA-24C S. B.</p>
    </>
  );
}

export default App;