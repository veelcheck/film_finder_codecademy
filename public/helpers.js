import { showRandomMovie } from "./script.js";

export const likeListElement = document.getElementById('title-list-likes');
export const dislikeListElement = document.getElementById('title-list-dislikes');

const likeCount = document.getElementById('count--likes');
const dislikeCount = document.getElementById('count--dislikes');

const selectGenre = document.getElementById('genres');
const btnDiv = document.getElementById('likeOrDislikeBtns');
const countDiv = document.getElementById('likeOrDislikeCount');
const resetBtn = document.getElementById('reset');

// Populates dropdown menu with all the available genres.
export const populateGenreDropdown = (genres) => {
    const select = document.getElementById('genres')

    for (const genre of genres) {
        let option = document.createElement("option");
        option.value = genre.id;
        option.text = genre.name;
        select.appendChild(option);
    }
};

// Returns the current genre selection from the dropdown menu.
export const getSelectedGenre = () => {
    return selectGenre.value;
};

getSelectedGenre();

// Displays like and dislike buttons.
export const showBtns = () => {
    btnDiv.removeAttribute('hidden');
    countDiv.removeAttribute('hidden');
    resetBtn.removeAttribute('hidden');
    likeListElement.removeAttribute('hidden');
    dislikeListElement.removeAttribute('hidden');

    const value = parseInt(localStorage.getItem('likes')) || 0;
    likeCount.innerHTML = `<span class="hidden">Movies you </span>like: ${value}`;

    const value2 = parseInt(localStorage.getItem('dislikes')) || 0;
    dislikeCount.innerHTML = `<span class="hidden">Movies you </span>don't like: ${value2}`;
};

// Clears current movie from the screen.
export const clearCurrentMovie = () => {
    const moviePosterDiv = document.getElementById('moviePoster');
    const movieTextDiv = document.getElementById('movieText');
    const movieCastDiv = document.getElementById('movieCast');
   
    moviePosterDiv.innerHTML = '';
    movieTextDiv.innerHTML = '';
    movieCastDiv.innerHTML = '';
}

export let titleArrayLikes = JSON.parse(localStorage.getItem('arrayLikes')) || [];
export let titleArrayDislikes = JSON.parse(localStorage.getItem('arrayDislikes')) || [];

// Clears current movie and shows another whenever like or dislike button is clicked.
const handleClick = () => {
    clearCurrentMovie();
    showRandomMovie();
}

// Updates list of both liked and disliked movies.
const updateListHTML = (storageKeyCount, titleArray, listElement, storageKeyArray, keyCount) => 
    {
    const value = parseInt(localStorage.getItem(storageKeyCount)) || 0;
    const currentTitle = localStorage.getItem('title');
    titleArray.push(currentTitle);
    localStorage.setItem(storageKeyArray, JSON.stringify(titleArray));

    let counter = value + 1;
    keyCount.innerHTML = `<span class="hidden">Movies you </span>like: ${counter}`;
    localStorage.setItem(storageKeyCount,
        counter)
    
    if (counter === 1) {
        console.log(listElement);
        listElement.innerHTML = `<ol><li>${currentTitle}</li></ol>`;
        return
    } else {
        const parsed = JSON.parse(localStorage.getItem(storageKeyArray));
        console.log(parsed);
        const listHTML = parsed.map(singleTitle => `<li>${singleTitle}</li>`).join('');
        listElement.innerHTML = `<ol>${listHTML}</ol>`;
    }
    };

//After liking a movie, gets another random movie.
const handleLikeMovie = () => {
    handleClick();
    updateListHTML(
        'likes', 
        titleArrayLikes, 
        likeListElement, 
        'arrayLikes', 
        likeCount
        );
    };

// After disliking a movie, gets another random movie.
const handleDislikeMovie = () => {
    handleClick();
    updateListHTML(
        'dislikes', 
        titleArrayDislikes, 
        dislikeListElement, 
        'arrayDislikes', 
        dislikeCount
        );
    };
    
// Resets the count.
const reset = () => {
    localStorage.removeItem('likes');
    localStorage.removeItem('dislikes');
    localStorage.removeItem('arrayLikes');
    localStorage.removeItem('arrayDislikes');

    likeCount.innerHTML = `<span class="hidden">Movies you </span>like: 0`;
    dislikeCount.innerHTML = `<span class="hidden">Movies you </span>don't like: 0`;
    likeListElement.innerHTML = `No movies you'd like to watch.`;
    dislikeListElement.innerHTML = `No movies you don't like.`;
    titleArrayLikes = [];
    titleArrayDislikes = [];
}

// Creates HTML for movie poster.
const createMoviePoster = (posterPath) => {
    const moviePosterUrl = `https://image.tmdb.org/t/p/original/${posterPath}`;
    const posterImg = document.createElement('img');
    posterImg.setAttribute('src', moviePosterUrl);
    posterImg.setAttribute('id', 'moviePoster');
    return posterImg;
};

// Creates HTML for movie title.
const createMovieTitle = (title) => {
    const titleHeader = document.createElement('h2');
    titleHeader.setAttribute('id', 'movieTitle');
    titleHeader.innerHTML = title;
    localStorage.setItem('title', title);
    return titleHeader;
};


// Creates HTML for runtime.
const createMovieRuntime = (runtime) => {
  const movieRuntime = document.createElement('h3');
  movieRuntime.setAttribute('id', 'movieRuntime');
  movieRuntime.innerHTML = `<span class="accent">Runtime:</span> ${runtime} min.`;
  return movieRuntime;
}

// Creates HTML for release date.
const createMovieReleaseDate = (release_date) => {
  const movieReleaseDate = document.createElement('h3');
  movieReleaseDate.setAttribute('id', 'movieReleaseDate');
  movieReleaseDate.innerHTML = `<span class="accent">Released:</span> ${release_date}`;
  return movieReleaseDate;
}

// Creates HTML for movie overview.
const createMovieOverview = (overview) => {
    const overviewParagraph = document.createElement('p');
    overviewParagraph.setAttribute('id', 'movieOverview');
    overviewParagraph.innerHTML = overview;
    return overviewParagraph; 
};

// Creates HTMl for cast list.
const createCastList = (cast) => {
  const castListParaghraph = document.createElement('p');
  castListParaghraph.setAttribute('id', 'movieCastList');
  castListParaghraph.innerHTML = `<span class="accent">Starring:</span> ${cast}`;
  return castListParaghraph;
}

// Returns a random movie from the first page of movies.
export const getRandomMovie = (movies) => {
    const randomIndex = Math.floor(Math.random() * movies.length);
    const randomMovie = movies[randomIndex];
    return randomMovie;
};

// Uses the DOM to create HTML to display the movie.
// Whatever concerns cast, runtime, release date or reset button.
export const displayMovie = (movieInfo, cast) => {
    const moviePosterDiv = document.getElementById('moviePoster');
    const movieTextDiv = document.getElementById('movieText');
    const movieCastDiv = document.getElementById('movieCast');
    const likeBtn = document.getElementById('likeBtn');
    const dislikeBtn = document.getElementById('dislikeBtn');
    const resetBtn = document.getElementById('reset');
  
    // Creates HTML content containing movie info.
    const moviePoster = createMoviePoster(movieInfo.poster_path);
    const titleHeader = createMovieTitle(movieInfo.title);
    const overviewText = createMovieOverview(movieInfo.overview);
    const movieRuntime = createMovieRuntime(movieInfo.runtime);
    const movieReleaseDate = createMovieReleaseDate(movieInfo.release_date);
    const movieCastList = createCastList(cast);

    // Appends title, poster, and overview to page
    moviePosterDiv.appendChild(moviePoster);
    movieTextDiv.appendChild(titleHeader);
    movieTextDiv.appendChild(overviewText);
    movieTextDiv.appendChild(movieRuntime);
    movieTextDiv.appendChild(movieReleaseDate);
    movieCastDiv.appendChild(movieCastList);

    likeBtn.addEventListener('click', handleLikeMovie);
    dislikeBtn.addEventListener('click', handleDislikeMovie);
    resetBtn.addEventListener('click', reset);
};