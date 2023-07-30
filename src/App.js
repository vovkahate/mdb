import React, { useEffect } from 'react';
import { useState } from 'react';
import './App.css';
import Searchbox from './components/searchbox';
import { format, parse } from 'date-fns';
import MovieService from './API/post-service';
import { useFetching } from './hooks/useFetching';
import { getDate, getGenres } from './funcs';

const App = () => {
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('return');

    const [fetching, isLoaded, error] = useFetching(async () => {
        const response = await MovieService.fetchData(searchQuery);
        setMovies(response.results);
    });

    useEffect(() => {
        fetching();
    }, [searchQuery]);

    const handleInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    if (error) {
        return <div>Error: {error}</div>;
    } else if (isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <div className="App">
                <Searchbox
                    key={searchQuery}
                    onChange={handleInputChange}
                    value={searchQuery}
                />
                <div className="movie-list">
                    {movies.map((movie) => (
                        <div
                            key={movie.id}
                            className="movie-card"
                        >
                            {movie.poster_path ? (
                                <img
                                    alt=""
                                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
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
                                <p className="movie-genre">
                                    {movie.genre_ids
                                        .map((genre) => getGenres(genre))
                                        .join(', ')}
                                </p>

                                <p className="movie-overview">
                                    {movie.overview}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
};

export default App;
