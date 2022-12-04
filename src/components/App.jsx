import Loader from './Loader/Loader';
import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import MovieReviews from 'page/Reviews/Reviews';
import MovieCast from 'page/Cast/Cast';
import SharedLayout  from "./SharedLayout/SharedLayout";
import Home from 'page/Home/Home';
import Movies from 'page/Movies/Movies';
import MovieDetails from 'page/MovieDetails/MovieDetails';
// import Navigation from "./Navigation/Navigation";
import 'styles.css';

export const App = () => {
  return (
    <div>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route index element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/movies/:movieId" element={<MovieDetails />}>
              <Route path="reiwers" element={<MovieReviews />} />
              <Route path="cast" element={<MovieCast />} />
            </Route>
          </Route>
          <Route path="*" element={Home} />
        </Routes>
      </Suspense>
    </div>
  );
};
