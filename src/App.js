import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";
import spinner from "./spinner.gif";

function App() {
  const [loaderStatus, setLoaderStatus] = useState(false);
  const [movies, setMovies] = useState([]);

  async function fetchMovieHandler() {
    setLoaderStatus(true);
    const response = await fetch("https://swapi.py4e.com/api/films/");
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
  }
  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>
        {!loaderStatus && <MoviesList movies={movies} />}
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
