import { useState, useEffect } from "react";
import { getMovieReviews } from "Api/movieApi";
import PropTypes from 'prop-types';
import { useParams } from "react-router-dom";
import css from './Reviews.module.css';


const MovieReviews = () => {
    const [reviews, setReviews] = useState([]);
    const { movieId } = useParams();

    useEffect(() => {
        const getReviews = async () => {
            const { results } = await getMovieReviews(movieId);
            setReviews(results);
        }
        getReviews();
    }, [movieId]);

    return (
        <div>
            {
                reviews.length > 0 ? (
                    <>
                        <ul className={css.list}>
                            {reviews.map(({ id, author, content }) => (
                                <li key={id} className={css.item}>
                                    <p className={css.author}>{author}</p>
                                    <p className={css.content}>{content}</p>
                                </li>
                            ))}
                        </ul>
                    </>
                ) : (
                    <p className={css.error}>We don't have any reviews for this movie.</p>
                )
            }
        </div>
    );
}

MovieReviews.protoType = {
    movieId: PropTypes.string,
}

export default MovieReviews;