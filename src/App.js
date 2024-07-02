import React, { useCallback, useEffect, useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";
import spinner from "./spinner.gif";
import AddMovie from "./components/AddMovie";

function App() {
  const [loaderStatus, setLoaderStatus] = useState(false);
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  const fetchMovieHandler = useCallback(async () => {
    setLoaderStatus(true);
    setError(null);
    try {
      const response = await fetch(
        "https://sharpener-react-project-default-rtdb.firebaseio.com/movies.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const data = await response.json();
      const loadMovie = [];
      for (const key in data) {
        loadMovie.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate,
        });
      }

      setLoaderStatus(false);
      setMovies(loadMovie);
    } catch (error) {
      setError(error.message);
    }
    setLoaderStatus(false);
  }, []);
  useEffect(() => {
    fetchMovieHandler();
  }, [fetchMovieHandler]);

  async function addMovieHandler(movie) {
    const response = await fetch(
      "https://sharpener-react-project-default-rtdb.firebaseio.com/movies.json",
      {
        method: "POST",
        body: JSON.stringify(movie),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data);
  }
  async function deleteFunction() {
    await fetch(
      "https://sharpener-react-project-default-rtdb.firebaseio.com/movies.json",
      {
        method: "DELETE",
      }
    );
  }

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>
        {!loaderStatus && (
          <MoviesList movies={movies} delete={deleteFunction} />
        )}
        {!loaderStatus && error && <p>{error}</p>}
        {loaderStatus && (
          <div className="text-center">
            <img
              src={spinner}
              className="rounded"
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
