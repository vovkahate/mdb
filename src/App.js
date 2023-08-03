import React, { useEffect, useState } from 'react';
import './App.css';

import Searchbox from './components/searchbox';
import MovieService from './API/post-service';
import { useFetching } from './hooks/useFetching';
import { getDate, getGenres, shortenDescription } from './funcs';
import Loader from './loader';
import { Alert } from 'antd';
import Pagi from './components/pagination';

const App = () => {
    const [movies, setMovies] = useState([]);
    const [isOnline, setIsOnline] = useState(navigator.onLine);

    const [totalPages, setTotalPages] = useState(0);
    const [page, setPage] = useState(1);

    const [searchQuery, setSearchQuery] = useState('');

    const [fetching, isLoading, error] = useFetching(async () => {
        const response = await MovieService.fetchData(searchQuery, page);
        setMovies(response.results);
        setTotalPages(response.total_results);
        console.log('response: ', response);
    });

    useEffect(() => {
        fetching();
        const handleStatusChange = () => {
            setIsOnline(navigator.onLine);
        };
        window.addEventListener('online', handleStatusChange);

        window.addEventListener('offline', handleStatusChange);

        return () => {
            window.removeEventListener('online', handleStatusChange);
            window.removeEventListener('offline', handleStatusChange);
        };
    }, [searchQuery, isOnline, page]);

    const handleInputChange = (text) => {
        //console.log('input query: ', text);
        setSearchQuery(text);
    };

    const handlePage = (page) => {
        console.log('page: ', page);
        setPage(page);
    };

    return (
        <div className="App">
            <Searchbox
                key={searchQuery}
                onChange={handleInputChange}
                value={searchQuery}
            />
            {isOnline ? (
                error ? (
                    <Alert
                        style={{ textAlign: 'left', margin: '35px' }}
                        message="Error"
                        description={error}
                        type="error"
                        showIcon
                    />
                ) : isLoading ? (
                    <Loader />
                ) : (
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
                                        <h5 className="movie-title">
                                            {movie.title}
                                        </h5>
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
                )
            ) : (
                <Alert
                    style={{ textAlign: 'left', margin: '35px' }}
                    message="Error"
                    description="No internet connection"
                    type="error"
                    showIcon
                />
            )}

            {isOnline &&
                !error &&
                !isLoading &&
                movies &&
                movies.length > 0 && (
                    <Pagi
                        total={totalPages}
                        handlePage={handlePage}
                        current={page}
                    />
                )}
        </div>
    );
};

export default App;
