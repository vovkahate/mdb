import React, { useEffect, useState } from 'react';
import './styles/styles.scss';

import Searchbox from './components/searchbox';
import MovieService from './API/post-service';
import { useFetching } from './hooks/useFetching';
import MovieList from './components/movielist';
import { createSession } from './funcs';
import { Tabs, Alert } from 'antd';
import RatedFilms from './components/ratedfilms';
import GenresProvider from './components/genres';

const App = () => {
    const [movies, setMovies] = useState([]);
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [totalPages, setTotalPages] = useState(0);
    const [page, setPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [sessionError, setSessionError] = useState(false);

    const [activeTab, setActiveTab] = useState('1');

    const [session, setSession] = useState(() => {
        const storedSession = localStorage.getItem('session');
        if (storedSession) {
            const parsedSession = JSON.parse(storedSession);
            const sessionDate = new Date(parsedSession.date);
            const now = new Date();
            const hourInMilliseconds = 60 * 60 * 1000;
            if (now - sessionDate < hourInMilliseconds) {
                return parsedSession;
            }
        }
        return { sessionId: '', date: '', ratedCount: 0, ratedMovies: {} };
    });

    const [fetching, isLoading, error] = useFetching(async () => {
        const response = await MovieService.fetchData(searchQuery, page);
        setMovies(response.results);
        setTotalPages(response.total_results);
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

    useEffect(() => {
        localStorage.setItem('session', JSON.stringify(session));
    }, [session]);

    useEffect(() => {
        const initializeSession = async () => {
            if (!session.sessionId) {
                try {
                    const [success, sessionId] = await createSession();
                    console.log('Guest session created:', sessionId);

                    const updatedSession = {
                        sessionId: sessionId,
                        date: new Date(),
                        ratedCount: 0,
                        ratedMovies: {},
                    };
                    setSession(updatedSession);
                    localStorage.setItem(
                        'session',
                        JSON.stringify(updatedSession)
                    );
                } catch (error) {
                    setSessionError(true);
                    console.error(error);
                }
            }
        };
        initializeSession();
    }, [session]);

    const shouldRenderPagination = () => {
        return isOnline && !error && !isLoading && movies && movies.length > 0;
    };

    const rateMovie = async (movieId, rating) => {
        try {
            if (rating === 0) {
                console.log(
                    'Такая оценка уже существует. Функция оценки не будет вызвана.'
                );
                return;
            } else {
                const response = await MovieService.rateMovie(
                    movieId,
                    session.sessionId,
                    rating
                );

                if (response.success) {
                    console.log('оценка произведена', response);

                    setSession((prev) => {
                        const updatedSession = {
                            ...prev,
                            ratedCount: prev.ratedCount + 1,
                            ratedMovies: {
                                ...prev.ratedMovies,
                                [movieId]: rating,
                            },
                        };

                        console.log(
                            'оценок в лс сессии: ',
                            Object.keys(updatedSession.ratedMovies).length,
                            updatedSession.ratedMovies
                        );
                        return updatedSession;
                    });
                } else {
                    throw new Error(
                        `Request failed with status ${response.status}`
                    );
                }
            }
        } catch (error) {
            throw new Error(`Error rating movie: ${error.message}`);
        }
    };
    const movieListPagination = (pageNumber) => {
        setPage(pageNumber);
    };

    const items = [
        {
            key: '1',
            label: `Search`,

            children: (
                <>
                    <Searchbox
                        onChange={(text) => setSearchQuery(text)}
                        value={searchQuery}
                    />
                    <MovieList
                        error={error}
                        sessionError={sessionError}
                        loader={isLoading}
                        movies={movies}
                        query={searchQuery}
                        rateMovie={rateMovie}
                        myRatedMovies={session.ratedMovies}
                        pagination={shouldRenderPagination()}
                        page={page}
                        totalPages={totalPages}
                        movieListPagination={movieListPagination}
                    />
                </>
            ),
        },
        {
            key: '2',
            label: `Rated`,
            forceRender: true,
            children: (
                <div>
                    <RatedFilms
                        sessionId={session.sessionId}
                        myRatedMovies={session.ratedMovies}
                    />
                </div>
            ),
        },
    ];

    const handleTabClick = (key) => {
        setActiveTab(key);
    };

    return (
        <GenresProvider>
            <div className="App">
                {!isOnline ? (
                    <Alert
                        className="alert-start"
                        style={{ textAlign: 'left' }}
                        message="Error"
                        description="No internet connection"
                        type="error"
                        showIcon
                    />
                ) : (
                    <Tabs
                        activeKey={activeTab}
                        onTabClick={handleTabClick}
                        defaultActiveKey="1"
                        items={items}
                        destroyInactiveTabPane
                    />
                )}
            </div>
        </GenresProvider>
    );
};

export default App;
