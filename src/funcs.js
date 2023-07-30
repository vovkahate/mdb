import { format } from 'date-fns';

function getDate(date) {
    try {
        return format(new Date(date), 'MMMM dd, yyyy');
    } catch {
        return 'No date for this movie';
    }
}

function getGenres(id) {
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
        878: 'Science Fiction',
        9648: 'Mystery',
        10402: 'Music',
        10749: 'Romance',
        10751: 'Family',
        10752: 'War',
        10770: 'TV Movie',
    };
    return genres[id];
}

export { getDate, getGenres };
