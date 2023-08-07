import { format } from 'date-fns';
import axios from 'axios';

function getDate(date) {
    // для обработки даты в фнс)
    try {
        return format(new Date(date), 'MMMM dd, yyyy');
    } catch {
        return 'No date for this movie';
    }
}

function getGenres(id = 0) {
    // заменим потом на контекст по заданию
    const genres = {
        12: 'Adventure',
        14: 'Fantasy',
        16: 'Animation',
        18: 'Drama',
        27: 'Horror',
        28: 'Action',
        35: 'Comedy',
        36: 'History',
        37: 'Western',
        53: 'Thriller',
        80: 'Crime',
        99: 'Documentary',
        878: 'Science',
        9648: 'Mystery',
        10402: 'Music',
        10749: 'Romance',
        10751: 'Family',
        10752: 'War',
        10770: 'TV',
    };
    if (id in genres) {
        return genres[id];
    } else return 'unknown';
}

const shortenDescription = (description) => {
    // сокращаем описание
    if (description.length > 100) {
        let endSpace = description.substring(0, 100).lastIndexOf(' ');
        return description.substring(0, endSpace) + '...';
    } else if (description === '') {
        return 'No description';
    } else return description;
};

async function createSession() {
    // создаем сессию
    const api = '7686f6535a89f5b4a53e9d688a5a2d41';
    try {
        const response = await axios.get(
            `https://api.themoviedb.org/3/authentication/guest_session/new?api_key=${api}`
        );
        return [response.data.success, response.data.guest_session_id];
    } catch (e) {
        console.log(e);
    }
}

const color = (rating) => {
    // находим цвет колечка
    if (rating < 3) {
        return 'raiting under3';
    } else if (rating < 5) {
        return 'raiting under5';
    } else if (rating < 7) {
        return 'raiting under7';
    } else return 'raiting under10';
};

export { getDate, getGenres, shortenDescription, createSession, color };
