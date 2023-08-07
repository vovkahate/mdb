import React, { useState, useEffect } from 'react';
import { Pagination } from 'antd';
import MovieCard from './moviecard';

const RatedFilms = ({
    fetch,
    sessionId,
    totalFilmsRated,
    totalRatedPages,
    myRatedMovies,
}) => {
    const [list, setList] = useState([]);
    const [pages, setPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetch(sessionId, currentPage);
                setList(data.results);
                setPages(data.total_results);
                console.log('сработал юз эфект в 2 табе и...', data);
                console.log('totalPages', data.total_results);
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
    );
};

export default RatedFilms;
