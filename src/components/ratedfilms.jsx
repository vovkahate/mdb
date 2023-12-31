import React, { useState, useEffect } from 'react';
import { Pagination } from 'antd';
import MovieCard from './moviecard';
import Loader from './loader';
import MovieService from '../API/post-service';
import { Alert } from 'antd';

const RatedFilms = ({ sessionId, myRatedMovies }) => {
    const [list, setList] = useState([]);
    const [pages, setPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    const fetchRatedFilms = async (sessionId, page) => {
        const response = await MovieService.fetchRated(sessionId, page);
        return response;
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                await new Promise((resolve) => setTimeout(resolve, 4000));
                const newData = await fetchRatedFilms(sessionId, currentPage);
                setList(newData.results);
                setPages(newData.total_results);
                setIsLoading(false);
            } catch (error) {
                console.log('ошибка запроса оцененных фильмов', error);
            }
        };

        fetchData();
    }, [myRatedMovies, currentPage]);

    const items = list
        ? list.map((item) => (
              <MovieCard
                  movie={item}
                  myRatedMovies={myRatedMovies}
                  interact={false}
                  key={item.id}
              />
          ))
        : null;

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : items && items.length > 0 ? (
                <>
                    <div className="rated-list">{items}</div>

                    <Pagination
                        defaultCurrent={1}
                        showSizeChanger={false}
                        pageSize={20}
                        current={currentPage}
                        total={pages}
                        onChange={(page) => setCurrentPage(page)}
                        style={{
                            marginTop: '36px',
                            marginBottom: '17px',
                        }}
                    />
                </>
            ) : (
                <Alert
                    className="alert-start"
                    message="В списке оцененных пока нет фильмов"
                    type="info"
                    showIcon
                />
            )}
        </>
    );
};

export default RatedFilms;
