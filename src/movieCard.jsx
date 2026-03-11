
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Добавлено

const MovieCard = ({ movie }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const poster = movie.Poster !== "N/A"
    ? movie.Poster
    : "https://via.placeholder.com/300x450?text=No+Poster";

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setIsFavorite(favorites.some(fav => fav.imdbID === movie.imdbID));
  }, [movie.imdbID]);


  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (isFavorite) {
      const newFavorites = favorites.filter(fav => fav.imdbID !== movie.imdbID);
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      setIsFavorite(false);
    } else {
      favorites.push(movie);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      setIsFavorite(true);
    }
  };

  return (
    <div className="movie-card">
      <img src={poster} alt={movie.Title} className="movie-poster" />
      <div className="movie-info">
        <div>
          <div className="movie-title">{movie.Title}</div>
          <div className="movie-year">{movie.Year} , {movie.Type}</div>
        </div>


        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginTop: '15px' }}>
          <Link to={`/movies/${movie.imdbID}`} style={{ flexGrow: 1, textDecoration: 'none' }}>
            <button className="details-btn" style={{ width: '100%' }}>See more</button>
          </Link>

          <button
            onClick={toggleFavorite}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              fontSize: '1.5rem', padding: '0 5px'
            }}
            title="В избранное"
          >
            {isFavorite ? '❤️' : '🤍'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;