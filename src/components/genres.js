import React from 'react';
import { createContext } from 'react';
import { useEffect, useState } from 'react';

export const GenresContext = createContext();

const GenresProvider = ({ children }) => {
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const response = await fetch(
                    `https://api.themoviedb.org/3/genre/movie/list?api_key=7686f6535a89f5b4a53e9d688a5a2d41&language=en`
                );
                const data = await response.json();
                setGenres(data.genres);
            } catch (error) {
                console.log(error);
            }
        };
        fetchGenres();
    }, []);

    return (
        <GenresContext.Provider value={{ genres }}>
            {children}
        </GenresContext.Provider>
    );
};
export default GenresProvider;
