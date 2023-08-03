import React, { useEffect, useState } from 'react';
import './styles/App.css';

import Searchbox from './components/searchbox';
import MovieService from './API/post-service';
import { useFetching } from './hooks/useFetching';
import Loader from './components/loader';
import { Alert } from 'antd';
import Pagi from './components/pagination';
import MovieList from './components/movielist';
import NoInternet from './components/nointernet';

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

    const shouldRenderPagination = () => {
        return isOnline && !error && !isLoading && movies && movies.length > 0;
    };

    return (
        <div className="App">
            <Searchbox
                onChange={(text) => setSearchQuery(text)}
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
                    <MovieList movies={movies} />
                )
            ) : (
                <NoInternet />
            )}

            {shouldRenderPagination() && (
                <Pagi
                    total={totalPages}
                    handlePage={(page) => setPage(page)}
                    current={page}
                />
            )}
        </div>
    );
};

export default App;
