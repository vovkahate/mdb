import React, { useState, useEffect } from 'react';
import { Pagination } from 'antd';
import MovieCard from './moviecard';
import axios from 'axios';
import Loader from './loader';

const RatedFilms = ({ sessionId, myRatedMovies }) => {
    const [list, setList] = useState([]);
    const [pages, setPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    const fetchRatedFilms = async (sessionId, page) => {
        try {
            const api = '7686f6535a89f5b4a53e9d688a5a2d41';
            const response = await axios.get(
                `https://api.themoviedb.org/3/guest_session/${sessionId}/rated/movies?api_key=${api}&page=${page}`
            );
            console.log('пошел запрос оцененных фильмов :', response);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const newData = await fetchRatedFilms(sessionId, currentPage);
                setList(newData.results);
                setPages(newData.total_results);
                console.log('сработал фетч в 2 табе и...', newData);
                console.log(
                    'фильмов отдал фетч их делим на 20 на странице',
                    newData.total_results
                );

                console.log('массив этих фильмов: ', newData.results);
                setIsLoading(false);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const newData = await fetchRatedFilms(sessionId, currentPage);
                setList(newData.results);
                setPages(newData.total_results);
                console.log('сработал фетч в 2 табе и...', newData);
                console.log(
                    'фильмов отдал фетч их делим на 20 на странице',
                    newData.total_results
                );

                console.log('массив этих фильмов: ', newData.results);
                setIsLoading(false);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [myRatedMovies, currentPage]);

    const items = list.map((item) => (
        <MovieCard
            movie={item}
            myRatedMovies={myRatedMovies}
            interact={false}
            key={item.id}
        />
    ));

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <>
                    <div className="rated-list">{items}</div>

                    <Pagination
                        defaultCurrent={1}
                        showSizeChanger={false}
                        pageSize={20}
                        current={currentPage}
                        total={pages}
                        showTotal={(total) => `Total ${total} items`}
                        onChange={(page) => setCurrentPage(page)}
                    />
                </>
            )}
        </>
    );
};

export default RatedFilms;
