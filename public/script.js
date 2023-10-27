import { populateGenreDropdown, getSelectedGenre, clearCurrentMovie, getRandomMovie, displayMovie, showBtns} from "./helpers.js";

let input;

// Gets the API key from the user
const getInput = () => {
  const inputOutOfStorage = localStorage.getItem('input');

  if (inputOutOfStorage) {
    input = inputOutOfStorage;
    return

  } else {
    input = window.prompt(`Enter your API key.`);
  }
  
  localStorage.setItem('input', input);
}

getInput();

//localStorage.removeItem('input');

let tmdbKey = input;
const tmdbBaseUrl = 'https://api.themoviedb.org/3';
const playBtn = document.getElementById('playBtn');

const getGenres = async () => {
  const genreRequestEndpoint = '/genre/movie/list';
  const requestParams = `?api_key=${tmdbKey}`;
  let urlToFetch = tmdbBaseUrl + genreRequestEndpoint + requestParams;

  let response = await fetch(urlToFetch);

  // Lets the user rewrite incorrect API key
  if (!response.ok) {
    input = window.prompt(`Wrong API key. Try again and REFRESH the page.`);
    localStorage.setItem('input', input);
  }

  try {
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

// My input
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
showBtns();
};

getGenres().then(populateGenreDropdown);
playBtn.onclick = showRandomMovie;
