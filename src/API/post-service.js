export default class MovieService {
    static async fetchData(query) {
        const api = '7686f6535a89f5b4a53e9d688a5a2d41';

        const response = await fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=${api}&query=${query}&page=1`
        );
        return response.json();
    }
}
