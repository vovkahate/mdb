import React from 'react';
import { getDate, getGenres, shortenDescription } from '../funcs';

const MovieList = ({ movies }) => {
    return (
        <div className="movie-list">
            {movies.length === 0 ? (
                <p>Ничего не найдено</p>
            ) : (
                movies.map((movie) => (
                    <div
                        key={movie.id}
                        className="movie-card"
                    >
                        {movie.poster_path ? (
                            <img
                                alt=""
                                src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                            />
                        ) : (
                            <div className="movie-broken">
                                <p>обложка фильма недоступна</p>
                            </div>
                        )}
                        <div className="movie-info">
                            <h5 className="movie-title">{movie.title}</h5>
                            <p className="movie-date">
                                {getDate(movie.release_date)}
                            </p>
                            <div className="movie-genre-wrapper">
                                {movie.genre_ids.length > 0 ? (
                                    movie.genre_ids.map((genre) => (
                                        <span
                                            key={genre}
                                            className="movie-genre"
                                        >
                                            {getGenres(genre)}
                                        </span>
                                    ))
                                ) : (
                                    <span
                                        key={new Date()}
                                        className="movie-genre"
                                    >
                                        No genre
                                    </span>
                                )}
                            </div>
                            <p className="movie-overview">
                                {shortenDescription(movie.overview)}
                            </p>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default MovieList;
