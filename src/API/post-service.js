export default class MovieService {
    static api = '7686f6535a89f5b4a53e9d688a5a2d41';

    static async fetchData(query, page = 1) {
        //const api = '7686f6535a89f5b4a53e9d688a5a2d41';

        const response = await fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=${MovieService.api}&query=${query}&page=${page}`
        );
        return response.json();
    }

    static async rateMovie(movieId, sessionId, rating) {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/${movieId}/rating?api_key=${MovieService.api}&guest_session_id=${sessionId}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                },
                body: JSON.stringify({ value: rating }),
            }
        );

        return await response.json();
    }
    static async fetchRated(sessionId, page) {
        const response = await fetch(
            `https://api.themoviedb.org/3/guest_session/${sessionId}/rated/movies?api_key=${MovieService.api}&page=${page}`,
            { cache: 'no-cache' }
        );
        const result = await response.json();
        console.log('пошел запрос оцененных фильмов :', result);
        return result;
    }
}
