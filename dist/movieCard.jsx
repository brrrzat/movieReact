import React from 'react';

const MovieCard = ({ movie }) => {
  const poster = movie.Poster !== "N/A" 
    ? movie.Poster 
    : "https://via.placeholder.com/300x450?text=No+Poster";

  return (
    <div className="movie-card">
      <img src={poster} alt={movie.Title} className="movie-poster" />
      <div className="movie-info">
        <div>
          <div className="movie-title">{movie.Title}</div>
          <div className="movie-year">{movie.Year} , {movie.Type}</div>
        </div>
        <button className="details-btn">See Details</button>
      </div>
    </div>
  );
};

export default MovieCard;