import React, { useCallback, useEffect, useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";
import spinner from "./spinner.gif";

function App() {
  const [loaderStatus, setLoaderStatus] = useState(false);
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  const fetchMovieHandler = useCallback(async ()=> {
    setLoaderStatus(true);
    setError(null);
    try {
      const response = await fetch("https://swapi.py4e.com/api/films/");
      if (!response.ok) {
        throw new Error('Something went wrong');
      }
      const data = await response.json();
      const transformedMovie = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date,
        };
      });
      setLoaderStatus(false);
      setMovies(transformedMovie);
    } catch (error) {
      setError(error.message);
    }
    setLoaderStatus(false)
  }, []);
useEffect(() => {
  fetchMovieHandler();
}, [fetchMovieHandler])

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>
        {!loaderStatus && <MoviesList movies={movies} />}
        {!loaderStatus && error && <p>{error}</p>}
        {loaderStatus && (
          <div class="text-center">
            <img
              src={spinner}
              class="rounded"
              alt="loading"
              style={{ width: "60px", height: "70px" }}
            />
          </div>
        )}
      </section>
    </React.Fragment>
  );
}

export default App;
