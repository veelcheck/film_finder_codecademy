import { populateGenreDropdown, getSelectedGenre, clearCurrentMovie, getRandomMovie, displayMovie } from "./helpers.js";

const tmdbKey = 'bb7dd08afc8f17c5c7bdcace1728c3e2';
const tmdbBaseUrl = 'https://api.themoviedb.org/3';
const playBtn = document.getElementById('playBtn');

const getGenres = async () => {
const genreRequestEndpoint = '/genre/movie/list';
const requestParams = `?api_key=${tmdbKey}`;
const urlToFetch = tmdbBaseUrl + genreRequestEndpoint + requestParams;


try {
  const response = await fetch(urlToFetch);
  if (response.ok) {
    const jsonResponse = await response.json();
    const genres = jsonResponse.genres;
  
    return genres;
  }

  } catch(error) {
    console.log(error);
  }
};

const getMovies = async () => {
  let randomNumber = Math.ceil(Math.random() * 500); //Returns number 1-500, the scope for pages accepted by TMDB.
  const selectedGenre = getSelectedGenre();
  const discoverMovieEndpoint = '/discover/movie';
  const requestParams = `?api_key=${tmdbKey}&with_genres=${selectedGenre}&page=${randomNumber}`;
  
  const urlToFetch = tmdbBaseUrl + discoverMovieEndpoint + requestParams;

  try {
    const response = await fetch(urlToFetch);
    
    if (response.ok) {
      const jsonResponse = await response.json();
      const movies = jsonResponse.results;
      
      return movies;
    } 
     
  } catch(error) {
    console.log(error);
  }
};

const getMovieInfo = async (movie) => {
  const movieId = movie.id;
  const movieEndpoint = `/movie/${movieId}`;
  const requestParams = `?api_key=${tmdbKey}`;
  const urlToFetch = `${tmdbBaseUrl}${movieEndpoint}${requestParams}`;

  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const movieInfo = await response.json();
      
      return movieInfo;
  } 
  } catch(error) {
    console.log(error);
  }
};

const getMovieCast = async (movie) => {
  const movieId = movie.id;
  const movieCastEndpoint = `/movie/${movieId}/credits`;
  const requestParams = `?api_key=${tmdbKey}`;
  const urlToFetch = `${tmdbBaseUrl}${movieCastEndpoint }${requestParams}`;
  let movieCast = [];

  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const jsonResponse = await response.json();
      const cast = jsonResponse.cast;
      
     for (const i in cast) {
       const castIndex = cast[i].name;
       
       movieCast.push(castIndex);
      }
    
      return movieCast.slice(0, 6).join(", ");
      } 

    } catch(error) {
    console.log(error);
  }
}

// Gets a list of movies and ultimately displays the info of a random movie from the list
export const showRandomMovie = async () => {
  const movieInfo = document.getElementById('movieInfo');
  

  if (movieInfo.childNodes.length > 0) {
    clearCurrentMovie();
  };


const movies = await getMovies();
const randomMovie = await getRandomMovie(movies);
const info = await getMovieInfo(randomMovie);
const cast = await getMovieCast(randomMovie);
displayMovie(info, cast);
};

getGenres().then(populateGenreDropdown);
playBtn.onclick = showRandomMovie;
