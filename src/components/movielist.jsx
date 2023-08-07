import React from 'react';
import { Alert } from 'antd';
import MovieCard from './moviecard';

const MovieList = ({ movies, query, rateMovie, myRatedMovies }) => {
    return (
        <div className="movie-list">
            {!query && movies.length === 0 ? (
                <Alert
                    message="Для поиска фильма начните печатать название"
                    type="success"
                    style={{ borderRadius: '0', marginBottom: '600px' }}
                />
            ) : query && movies.length === 0 ? (
                <Alert
                    message="По вашему запросу ничего не найдено"
                    type="info"
                    showIcon
                    style={{ borderRadius: '0', marginBottom: '600px' }}
                />
            ) : (
                movies.map((movie) => (
                    <MovieCard
                        movie={movie}
                        myRatedMovies={myRatedMovies}
                        interact={true}
                        key={movie.id}
                        handleRatingChange={rateMovie}
                    />
                ))
            )}
        </div>
    );
};

export default MovieList;
