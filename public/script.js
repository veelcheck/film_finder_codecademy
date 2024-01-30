import { populateGenreDropdown, getSelectedGenre, clearCurrentMovie, getRandomMovie, displayMovie, showBtns} from "./helpers.js";
import { titleArrayLikes, titleArrayDislikes } from "./helpers.js";
import { likeListElement, dislikeListElement } from "./helpers.js";

const apiKeyForm = document.getElementById('apiKeyForm');

function saveApiKeyLocally(apiKey) {
  localStorage.setItem('api_key', apiKey);
}

apiKeyForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const apiKeyInput = document.getElementById('apiKey');
  const apiKey = apiKeyInput.value;

  // Save the API key locally
  saveApiKeyLocally(apiKey);
});

const displayApiKeyWarning = (message) => {
  alert(message);
};


const tmdbKey = localStorage.getItem('api_key');
const tmdbBaseUrl = 'https://api.themoviedb.org/3';
const playBtn = document.getElementById('playBtn');

const getGenres = async () => {
  const genreRequestEndpoint = '/genre/movie/list';
  const requestParams = `?api_key=${tmdbKey}`;
  let urlToFetch = tmdbBaseUrl + genreRequestEndpoint + requestParams;

  try {
    const response = await fetch(urlToFetch);

    if (response.ok) {
      const jsonResponse = await response.json();
      const genres = jsonResponse.genres;
      return genres;
    } else {
      if (response.status === 401 || response.status === 403) {
        displayApiKeyWarning('Invalid API Key. Please check your API key and --REFRESH-- the page.')
      } else {
        console.error(`Failed to fetch genres. Status: ${response.status}`);
      }
    }
  } catch(error) {
      console.log(error);
      displayApiKeyWarning('An error occurred while fetching genres. Please try again.');
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

    const listHTML = titleArrayLikes.map(singleTitle => `<li>${singleTitle}</li>`).join('');
    likeListElement.innerHTML = `<ol>${listHTML}</ol>`

    const listHTML2 = titleArrayDislikes.map(singleTitle => `<li>${singleTitle}</li>`).join('');
    dislikeListElement.innerHTML = `<ol>${listHTML2}</ol>`;
    }

const movies = await getMovies();
const randomMovie = await getRandomMovie(movies);
const info = await getMovieInfo(randomMovie);
const cast = await getMovieCast(randomMovie);
displayMovie(info, cast);
showBtns();
};

getGenres().then(populateGenreDropdown);
playBtn.addEventListener('click', showRandomMovie);