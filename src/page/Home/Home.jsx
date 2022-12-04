import { fetchTranding } from "Api/movieApi";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import css from './Home.module.css';

const Home = () => {
    const [movies, setMovies] = useState([]);
    const location = useLocation();

    useEffect(() => {
        const getMovies = async () => {
            const { results } = await fetchTranding();
            // console.log(results);
            setMovies(results);
        };

        getMovies();
    }, []);

    return (
        // <>
        <div className={css.box}> 

            <h1 className={css.homeTitle}>Tranding today</h1>
            <ul className={css.list}>
                {movies && movies.map(({ id, title, poster_path }) => (

                    <li key={id} className={css.listItem}>
                        <Link
                            to={`/movies/${id}`} state={{ from: location }}>
                            <img
                                className={css.img}
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

        // </>
    );
}


export default Home;