import React from 'react';
import { Alert, Pagination } from 'antd';
import MovieCard from './moviecard';
import Loader from './loader';

const MovieList = ({
    loader,
    movies,
    query,
    rateMovie,
    myRatedMovies,
    pagination,
    page,
    totalPages,
    movieListPagination,
    error,
    sessionError,
}) => {
    return error || sessionError ? (
        <Alert
            className="alert-start"
            message="Error"
            description={error || sessionError}
            type="error"
            showIcon
        />
    ) : loader ? (
        <Loader />
    ) : !query && movies.length === 0 ? (
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
            {pagination && (
                <Pagination
                    style={{
                        marginTop: '36px',
                        marginBottom: '17px',
                        gridColumn: '1/ span 2',
                        placeSelf: 'center',
                    }}
                    defaultCurrent={page}
                    total={totalPages}
                    showSizeChanger={false}
                    pageSize={20}
                    onChange={(value) => movieListPagination(value)}
                />
            )}
        </div>
    );
};

export default MovieList;
