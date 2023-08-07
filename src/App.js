import React, { useEffect, useState } from 'react';
import './styles/App.css';

import Searchbox from './components/searchbox';
import MovieService from './API/post-service';
import { useFetching } from './hooks/useFetching';
import Loader from './components/loader';
import Pagi from './components/pagination';
import MovieList from './components/movielist';
import NoInternet from './components/nointernet';
import Error from './components/error';
import { createSession } from './funcs';
import axios from 'axios';
import { Tabs } from 'antd';
import RatedFilms from './components/ratedfilms';

const App = () => {
    const [movies, setMovies] = useState([]);
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [totalPages, setTotalPages] = useState(0);
    const [page, setPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [sessionError, setSessionError] = useState(false);

    const [totalRatedPages, setTotalRatedPages] = useState(1);

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

    useEffect(() => {
        localStorage.setItem('session', JSON.stringify(session));
    }, [session]);

    useEffect(() => {
        const initializeSession = async () => {
            if (!session.sessionId) {
                try {
                    const [success, sessionId] = await createSession();
                    console.log('Guest session created:', success);
                    console.log('Guest session ID:', sessionId);

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
            const response = await axios.post(
                `https://api.themoviedb.org/3/movie/${movieId}/rating`,
                {
                    value: rating,
                },
                {
                    params: {
                        api_key: '7686f6535a89f5b4a53e9d688a5a2d41',
                        guest_session_id: session.sessionId,
                    },
                },
                {
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8',
                    },
                }
            );

            if (response.status === 201) {
                const result = response.data;
                console.log('оценка произведена', result);

                setSession((prev) => {
                    const updatedSession = {
                        ...prev,
                        ratedCount: prev.ratedCount + 1,
                        ratedMovies: { ...prev.ratedMovies, [movieId]: rating },
                    };
                    console.log(
                        'записал оценок в сессию',
                        updatedSession.ratedCount
                    );
                    console.log('оценки в сессии:', updatedSession.ratedMovies);
                    return updatedSession;
                });

                return result;
            } else {
                throw new Error(
                    `Request failed with status ${response.status}`
                );
            }
        } catch (error) {
            throw new Error(`Error rating movie: ${error.message}`);
        }
    };

    const fetchRatedFilms = async (sessionId, page) => {
        try {
            const api = '7686f6535a89f5b4a53e9d688a5a2d41';
            const response = await axios.get(
                `https://api.themoviedb.org/3/guest_session/${session.sessionId}/rated/movies?api_key=${api}&page=${page}`
            );
            console.log('сработала фетч Рэйтед филмс:', response);
            console.log(
                'и там же total rated pages',
                response.data.total_pages
            );
            setTotalRatedPages(response.data.total_pages);

            return response.data;
        } catch (error) {
            console.log(error);
        }
    };

    const items = [
        {
            key: '1',
            label: `Search`,

            children: (
                <>
                    {!isOnline ? (
                        <NoInternet />
                    ) : error || sessionError ? (
                        <Error error={error || sessionError} /> // пока что так сделал хз
                    ) : isLoading ? (
                        <Loader />
                    ) : (
                        <>
                            <Searchbox
                                onChange={(text) => setSearchQuery(text)}
                                value={searchQuery}
                            />
                            <MovieList
                                movies={movies}
                                query={searchQuery}
                                rateMovie={rateMovie}
                                myRatedMovies={session.ratedMovies}
                            />
                        </>
                    )}

                    {shouldRenderPagination() && (
                        <Pagi
                            total={totalPages}
                            handlePage={(page) => setPage(page)}
                            current={page}
                        />
                    )}
                </>
            ),
        },
        {
            key: '2',
            label: `Rated`,

            children: (
                <div>
                    <RatedFilms
                        fetch={fetchRatedFilms}
                        sessionId={session.sessionId}
                        totalFilmsRated={session.ratedCount}
                        totalRatedPages={totalRatedPages}
                        myRatedMovies={session.ratedMovies}
                    />
                </div>
            ),
        },
    ];
    const [activeTab, setActiveTab] = useState('1');

    const handleTabClick = (key) => {
        setActiveTab(key);
    };

    return (
        <div className="App">
            <Tabs
                activeKey={activeTab}
                onTabClick={handleTabClick}
                defaultActiveKey="1"
                items={items}
            />
        </div>
    );
};

export default App;
