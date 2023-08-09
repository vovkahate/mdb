import React from 'react';
import { Alert } from 'antd';
import MovieCard from './moviecard';

const MovieList = ({ movies, query, rateMovie, myRatedMovies }) => {
    return !query && movies.length === 0 ? (
        <Alert
            className="alert-start"
            message="Для поиска фильма начните печатать название"
            type="success"
        />
    ) : query && movies.length === 0 ? (
        <Alert
            className="alert-start"
            message="По вашему запросу ничего не найдено"
            type="info"
            showIcon
        />
    ) : (
        <div className="movie-list">
            {movies.map((movie) => (
                <MovieCard
                    movie={movie}
                    myRatedMovies={myRatedMovies}
                    interact={true}
                    key={movie.id}
                    handleRatingChange={rateMovie}
                />
            ))}
        </div>
    );
};

export default MovieList;
