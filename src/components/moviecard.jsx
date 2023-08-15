import React, { useContext } from 'react';
import { getDate } from '../funcs';
import { shortenDescription } from '../funcs';
import { Rate } from 'antd';
import { color } from '../funcs';
import { GenresContext } from './genres';

const MovieCard = ({
    movie,
    myRatedMovies,
    interact = true,
    handleRatingChange,
}) => {
    const { genres } = useContext(GenresContext);
    const getGenres = (genreId) => {
        const genre = genres.find((genre) => genre.id === genreId);
        return genre ? genre.name : 'no genre';
    };

    return (
        <div
            key={movie.id}
            className="movie-card"
        >
            {movie.poster_path ? (
                <img
                    className="movie-poster"
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
                    <h5 className="movie-title">
                        {shortenDescription(movie.title, 35)}
                    </h5>
                    <div className={color(movie.vote_average.toFixed(1))}>
                        <h5 className="raiting-rate">
                            {movie.vote_average.toFixed(1)}
                        </h5>
                    </div>
                </div>
                <p className="movie-date">{getDate(movie.release_date)}</p>
                <div className="movie-genre-wrapper">
                    {genres && movie && movie.genre_ids.length > 0 ? (
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
                <div className="moviecard-xl">
                    <p className="movie-overview">
                        {shortenDescription(movie.overview)}
                    </p>
                    {
                        <div className="stars">
                            <Rate
                                className="rate"
                                onChange={(value) =>
                                    handleRatingChange(movie.id, value)
                                }
                                value={
                                    !interact
                                        ? movie.rating
                                        : myRatedMovies[movie.id] || 0
                                }
                                allowHalf
                                count={10}
                                size="small"
                                disabled={interact ? false : true}
                            />
                        </div>
                    }
                </div>
            </div>
            <div className="moviecard-xs">
                <p className="xs-overview">
                    {shortenDescription(movie.overview)}
                </p>
                {
                    <Rate
                        className="rate"
                        onChange={(value) =>
                            handleRatingChange(movie.id, value)
                        }
                        value={
                            !interact
                                ? movie.rating
                                : myRatedMovies[movie.id] || 0
                        }
                        allowHalf
                        count={10}
                        size="small"
                        disabled={interact ? false : true}
                    />
                }
            </div>
        </div>
    );
};

export default MovieCard;
