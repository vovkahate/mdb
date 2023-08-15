import { format } from 'date-fns';
import axios from 'axios';

function getDate(date) {
    try {
        return format(new Date(date), 'MMMM dd, yyyy');
    } catch {
        return 'No date for this movie';
    }
}

const shortenDescription = (description, symbols = 100) => {
    if (description.length > symbols) {
        let endSpace = description.substring(0, symbols).lastIndexOf(' ');
        return description.substring(0, endSpace) + '...';
    } else if (description === '') {
        return 'No description';
    } else return description;
};

async function createSession() {
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
    if (rating < 3) {
        return 'raiting under3';
    } else if (rating < 5) {
        return 'raiting under5';
    } else if (rating < 7) {
        return 'raiting under7';
    } else return 'raiting under10';
};

export { getDate, shortenDescription, createSession, color };
