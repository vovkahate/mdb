export default class MovieService {
    apiKey = '7686f6535a89f5b4a53e9d688a5a2d41';
    token =
        'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3Njg2ZjY1MzVhODlmNWI0YTUzZTlkNjg4YTVhMmQ0MSIsInN1YiI6IjY0YzUzYTllZWVjNWI1MDBlMjNiYTg2ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2sv3KwhO3RhPRl23e6YRhvWvbkhzq_eEmBxwISQ3pqg';

    static async fetchData(query) {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3Njg2ZjY1MzVhODlmNWI0YTUzZTlkNjg4YTVhMmQ0MSIsInN1YiI6IjY0YzUzYTllZWVjNWI1MDBlMjNiYTg2ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2sv3KwhO3RhPRl23e6YRhvWvbkhzq_eEmBxwISQ3pqg`,
            },
        };
        const response = await fetch(
            `https://api.themoviedb.org/3/search/movie?query=${query}&page=1`,
            options
        );
        return response.json();
    }
}
