import { useState, useEffect } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import Notiflix from 'notiflix';
import { searchMovie } from "Api/movieApi";
import css from './Movies.module.css';

const Movies = () => {
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();

    const query = searchParams.get('query') ?? '';
    const location = useLocation();
    console.log(query);

    useEffect(() => {
        if (query === '') {
            return;
        }

        const getMovies = async () => {
            try {
                setError(null);

                const result = await searchMovie(query);
                setMovies(result.results);
            } catch (e) {
                setError(e.toJSON());
            }
        };
        getMovies();
    }, [query]);

    const updateQuery = query => {
        // const nextParams = query !== '' ? { query } : {};
        console.log(query);
        setSearchParams({ query });
        console.log({ query });
    }

    const handleInputChange = e => {
        setSearchQuery(e.target.value.toLowerCase());
    }

    const handleSubmit = e => {
        e.preventDefault();
        reset();
        updateQuery(searchQuery);
    }

    const reset = () => {
        setSearchParams('');
        setError(null);
    }

    return (
        <div className={css.box}>
            {error && Notiflix.Notify.warning('Sorry, there are no movies matching your search query. Please try again.')}
            <header className="Searchbar">
                <form className="SearchForm" onSubmit={handleSubmit}>
                    <input
                        onChange={handleInputChange}
                        value={searchQuery}
                        className="SearchForm-input"
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search movies"
                    />

                    <button type="submit" className="SearchForm-button">
                        <span>Search</span>
                    </button>
                </form>
            </header>

            <ul className={css.list}>
                {movies.length > 0 && movies.map(({ id, title, poster_path }) => (

                    <li key={id} className={css.list_item}>
                        <Link className={css.link}
                            to={`/movies/${id}`} state={{ from: location }}
                        >
                            <img
                                src={
                                    poster_path
                                        ? `https://image.tmdb.org/t/p/w300${poster_path}`
                                        : 'https://bitsofco.de/content/images/2018/12/broken-1.png'
                                }
                                width="200" height="150"
                                alt={title} />
                            <p className={css.title}>{title}</p>
                        </Link>
                    </li>
                ))}

            </ul>
        </div>
    );
}

export default Movies;