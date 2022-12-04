import { useState, useEffect } from "react";
import { useLocation, useParams, Link, Outlet } from "react-router-dom";
import { getMovieDetails, IMAGE_URL } from "Api/movieApi";
import css from './MovieDetails.module.css';
import MovieReviews from "page/Reviews/Reviews";
import MovieCast from "page/Cast/Cast";

const MovieDetails = () => {
    const [movie, setMovie] = useState(null);
    const { movieId } = useParams();
    const location = useLocation();
    // console.log('movieId', movieId);
    const goBack = location.state?.from ?? "/movies";

    useEffect(() => {
        const getMovie = async () => {
            const currentMovie = await getMovieDetails(movieId);
            setMovie(currentMovie);
        }
        getMovie();
    }, [movieId]);

    return (
        <>
            {!movie ? (
                <div>This movie is not found</div>
            ) : (
                <>
                    <Link className={css.goBack} to={goBack}>Go back</Link>

                    <div className={css.movieContainer}>
                        <div className={css.movieImg}>
                            <img className={css.img} src={
                                movie.poster_path ? IMAGE_URL + movie.poster_path
                                    : `https://bitsofco.de/content/images/2018/12/broken-1.png`
                            } alt={movie.title} width="250" height="100" />
                        </div>

                        <div className={css.movieDiscr}>
                            <h2>{movie.title}</h2>
                            <p>User score: {`${movie.vote_average * 10}`}%</p>
                            <h3>Overview</h3>
                            <p className={css.overview}>{`${movie.overview}`}</p>
                            <h3>Genres</h3>
                            <p>{`${movie.genres.map(genre => genre.name).join(' / ')}`}</p>
                        </div>
                    </div>
                </>
            )}

            <h2  className={css.addinfoTitle}>Additional information</h2>
            <div className={css.addInfoBox}>
                <Link state={{ MovieCast }} to="cast" className={css.addInfoLink}>
                    Cast
                </Link>
                <Link state={{ MovieReviews }} to="reiwers" className={css.addInfoLink}>
                    Reiwers
                </Link>
            </div>
            <Outlet />
        </>
    );
};

export default MovieDetails;