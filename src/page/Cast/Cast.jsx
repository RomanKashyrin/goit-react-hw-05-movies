import { useState, useEffect } from "react";
import { getMovieCast, IMAGE_URL } from "Api/movieApi";
import PropTypes from 'prop-types';
import { useParams } from "react-router-dom";
import css from './Cast.module.css';

const MovieCast = () => {
    const [cast, setCast] = useState([]);
    const { movieId } = useParams();

    console.log(movieId);

    useEffect(() => {
        const getCast = async () => {
            const { cast } = await getMovieCast(movieId);
            setCast(cast);
        }
        getCast();
    }, [movieId]);

    return (
        <>

                <ul className={css.list}>
            {cast && cast.map(({ id, profile_path, name, character }) => (

                    <li className={css.item}  key={id}>
                        <img className={css.img} src={
                            profile_path ? IMAGE_URL + profile_path
                                : `https://bitsofco.de/content/images/2018/12/broken-1.png`
                        } alt={name} height="200" width="100" />
                        <p className={css.name}>{name}</p>
                        <p className={css.character}>Character: {character}</p>
                    </li>
            ))}

                </ul>

        </>

    );
}

MovieCast.protoType = {
    movieId: PropTypes.string,
}

export default MovieCast;