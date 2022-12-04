import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3/';
export const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';
const KEY = '0c6aaf0b7647b8904eb56d7029fc3369';


export const fetchTranding = async () => {
    const queryString = `trending/movie/day?api_key=${KEY}`;
    const { data: movies } = await axios.get(queryString);
    return movies;
}

export const searchMovie = async query => {
    const queryString = `search/movie?api_key=${KEY}&language=en-US&page=1&include_adult=false&query=${query}`;
    const { data: movies } = await axios.get(queryString);
    return movies;
}

export const getMovieDetails = async movieId => {
    const queryString = `movie/${movieId}?api_key=${KEY}&language=en-US`;
    const { data: movies } = await axios.get(queryString);
    return movies;
}

export const getMovieCast = async movieId => {
    const queryString = `movie/${movieId}/credits?api_key=${KEY}&language=en-US`;
    const { data } = await axios.get(queryString);
    return data;
}

export const getMovieReviews = async movieId => {
    const queryString = `movie/${movieId}/reviews?api_key=${KEY}&language=en-US`;
    const { data } = await axios.get(queryString);
    return data;
}