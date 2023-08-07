import React from 'react';
import { getDate } from '../funcs';
import { getGenres, shortenDescription } from '../funcs';
import { Rate } from 'antd';
import { color } from '../funcs';

const MovieCard = ({
    movie,
    myRatedMovies,
    interact = true,
    handleRatingChange = () => {},
}) => {
    return (
        <div
            key={movie.id}
            className="movie-card"
        >
            {movie.poster_path ? (
                <img
                    width={166}
                    height={250}
                    alt=""
                    src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                />
            ) : (
                <div className="movie-broken">
                    <p>обложка фильма недоступна</p>
                </div>
            )}
            <div className="movie-info">
                <div className="title-container">
                    <h5 className="movie-title">{movie.title}</h5>
                    <div className={color(movie.vote_average.toFixed(1))}>
                        <h5 className="raiting-rate">
                            {movie.vote_average.toFixed(1)}
                        </h5>
                    </div>
                </div>
                <p className="movie-date">{getDate(movie.release_date)}</p>
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
                {
                    <Rate
                        onChange={(value) =>
                            handleRatingChange(movie.id, value)
                        }
                        value={myRatedMovies[movie.id] || 0}
                        allowHalf
                        count={10}
                        size="small"
                        style={{ fontSize: 17 }}
                        disabled={interact ? false : true}
                    />
                }
            </div>
        </div>
    );
};

export default MovieCard;
