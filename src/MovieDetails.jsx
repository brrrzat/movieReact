
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const API_KEY = "3f03a5c5";
const API_URL = "https://www.omdbapi.com/";

const MovieDetails = () => {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(`${API_URL}?apikey=${API_KEY}&i=${id}&plot=full`);
        const data = await response.json();
        setMovieDetails(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching details:", error);
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) return <h2 style={{ textAlign: 'center', marginTop: '50px' }}>Загрузка...</h2>;
  if (!movieDetails) return <h2>Фильм не найден</h2>;

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', background: 'var(--card-bg, #fff)', padding: '20px', borderRadius: '12px', color: 'inherit' }}>
      <Link to="/" style={{ display: 'inline-block', marginBottom: '20px', textDecoration: 'none', color: '#111155', fontWeight: 'bold' }}>
        ← Назад к поиску
      </Link>

      <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
        <img
          src={movieDetails.Poster !== "N/A" ? movieDetails.Poster : "https://via.placeholder.com/300x450"}
          alt={movieDetails.Title}
          style={{ borderRadius: '8px', maxWidth: '300px', width: '100%' }}
        />

        <div style={{ flex: 1, minWidth: '300px' }}>
          <h1 style={{ marginTop: 0 }}>{movieDetails.Title} ({movieDetails.Year})</h1>
          <p><strong>Жанр:</strong> {movieDetails.Genre}</p>
          <p><strong>Режиссер:</strong> {movieDetails.Director}</p>
          <p><strong>В ролях:</strong> {movieDetails.Actors}</p>
          <p><strong>Рейтинг IMDb:</strong> ⭐ {movieDetails.imdbRating}</p>
          <p><strong>Сюжет:</strong> {movieDetails.Plot}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;