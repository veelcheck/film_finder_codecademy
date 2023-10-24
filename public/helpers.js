import { showRandomMovie } from "./script.js";

// Populate dropdown menu with all the available genres
export const populateGenreDropdown = (genres) => {
    const select = document.getElementById('genres')

    for (const genre of genres) {
        let option = document.createElement("option");
        option.value = genre.id;
        option.text = genre.name;
        select.appendChild(option);
    }
};

// Returns the current genre selection from the dropdown menu
export const getSelectedGenre = () => {
    const selectedGenre = document.getElementById('genres').value;
    
    return selectedGenre;
};

getSelectedGenre();

// Displays the like and dislike buttons on the page
const showBtns = () => {
    const btnDiv = document.getElementById('likeOrDislikeBtns');

    btnDiv.removeAttribute('hidden');

// My addition: displays like/displike count together with a reset count button
    const countDiv = document.getElementById('likeOrDislikeCount');
    const resetBtn = document.getElementById('reset');
    
    
    countDiv.removeAttribute('hidden');
    resetBtn.removeAttribute('hidden');
    
    const likeCount = document.getElementById('count--likes');
    const value = parseInt(localStorage.getItem('likes')) || 0;
    likeCount.innerHTML = `<span class="hidden">Movies you </span>like: ${value}`;

    const dislikeCount = document.getElementById('count--dislikes');
    const value2 = parseInt(localStorage.getItem('dislikes')) || 0;
    dislikeCount.innerHTML = `<span class="hidden">Movies you </span>don't like: ${value2}`;
};


// Clear the current movie from the screen
export const clearCurrentMovie = () => {
    const moviePosterDiv = document.getElementById('moviePoster');
    const movieTextDiv = document.getElementById('movieText');
    const movieCastDiv = document.getElementById('movieCast');
   
    moviePosterDiv.innerHTML = '';
    movieTextDiv.innerHTML = '';

// My addition: clears the cast form the screen
    movieCastDiv.innerHTML = '';
}

let titleArrayLikes = [];
let titleArrayDislikes = [];


// After liking a movie, clears the current movie from the screen and gets another random movie
const likeMovie = () => {
    clearCurrentMovie();
    showRandomMovie();

// My addition: counts and stores likes, shows title
    const likeCount = document.getElementById('count--likes');
    const likeList = document.getElementById('title-list-likes');

    const value = parseInt(localStorage.getItem('likes')) || 0;
    const currentTitle = localStorage.getItem('title');
    titleArrayLikes.push(currentTitle);

    likeList.removeAttribute('hidden');

    let counter = value + 1;
    likeCount.innerHTML = `<span class="hidden">Movies you </span>like: ${counter}`;
    localStorage.setItem('likes', counter);

    const titleArrayLikesJoined = titleArrayLikes.join(", ");
    
    if (counter === 1) {
        likeList.innerHTML = currentTitle;
        localStorage.setItem('titleLikes-stored', JSON.stringify(titleArrayLikesJoined));
        return
    } else {
        const titlesUnpacked = JSON.parse(localStorage.getItem('titleLikes-stored'));
        likeList.innerHTML = `${titlesUnpacked}, ${currentTitle}`;
        localStorage.setItem('titleLikes-stored', JSON.stringify(titleArrayLikesJoined));
    }

    //localStorage.setItem('titleLikes-stored', JSON.stringify(titleArrayLikesJoined));
};


// After disliking a movie, clears the current movie from the screen and gets another random movie
const dislikeMovie = () => {
    clearCurrentMovie();
    showRandomMovie();

// My addition: counts and stores dislikes, shows titles
    const dislikeCount = document.getElementById('count--dislikes');
    const dislikeList = document.getElementById('title-list-dislikes');

    const value = parseInt(localStorage.getItem('dislikes')) || 0;
    const currentTitle = localStorage.getItem('title');
    titleArrayDislikes.push(currentTitle);

    
    dislikeList.removeAttribute('hidden');

    let counter = value + 1;
    dislikeCount.innerHTML = `<span class="hidden">Movies you </span>don't like: ${counter}`;
    localStorage.setItem('dislikes', counter);

    const titleArrayDislikesJoined = titleArrayDislikes.join(", ");

    dislikeList.innerHTML = titleArrayDislikes.join(", ");

    if (counter === 1) {
        dislikeList.innerHTML = currentTitle;
        localStorage.setItem('titleDislikes-stored', JSON.stringify(titleArrayDislikesJoined));
    } else {
        const titlesUnpacked = JSON.parse(localStorage.getItem('titleDislikes-stored'));
        dislikeList.innerHTML = `${titlesUnpacked}, ${currentTitle}`;
        localStorage.setItem('titleDislikes-stored', JSON.stringify(titleArrayDislikesJoined));
    }

    //localStorage.setItem('titleDislikes-stored', JSON.stringify(titleArrayDislikesJoined));
};
    

// My addition: resets the count
const reset = () => {
    localStorage.removeItem('likes');
    localStorage.removeItem('dislikes');
    localStorage.removeItem('titleLikes-stored');

    const likeCount = document.getElementById('count--likes');
    const dislikeCount = document.getElementById('count--dislikes');
    const likeList = document.getElementById('title-list-likes');
    const dislikeList = document.getElementById('title-list-dislikes');

    likeCount.innerHTML = `<span class="hidden">Movies you </span>like: 0`;
    dislikeCount.innerHTML = `<span class="hidden">Movies you </span>don't like: 0`;
    likeList.innerHTML = '';
    dislikeList.innerHTML = '';
    titleArrayLikes = [];
}

// Create HTML for movie poster
const createMoviePoster = (posterPath) => {
    const moviePosterUrl = `https://image.tmdb.org/t/p/original/${posterPath}`;

    const posterImg = document.createElement('img');
    posterImg.setAttribute('src', moviePosterUrl);
    posterImg.setAttribute('id', 'moviePoster');
  
    return posterImg;
};

// Create HTML for movie title
const createMovieTitle = (title) => {
    const titleHeader = document.createElement('h2');
    titleHeader.setAttribute('id', 'movieTitle');
    titleHeader.innerHTML = title;

    localStorage.setItem('title', title);
    return titleHeader;
};


// My addition: creates HTML for runtime
const createMovieRuntime = (runtime) => {
  const movieRuntime = document.createElement('h3');
  movieRuntime.setAttribute('id', 'movieRuntime');
  movieRuntime.innerHTML = `<span class="accent">Runtime:</span> ${runtime} min.`;

  return movieRuntime;
}

// My addition: creates HTML for release date
const createMovieReleaseDate = (release_date) => {
  const movieReleaseDate = document.createElement('h3');
  movieReleaseDate.setAttribute('id', 'movieReleaseDate');
  movieReleaseDate.innerHTML = `<span class="accent">Released:</span> ${release_date}`;

  return movieReleaseDate;
}

// Create HTML for movie overview
const createMovieOverview = (overview) => {
    const overviewParagraph = document.createElement('p');
    overviewParagraph.setAttribute('id', 'movieOverview');
    overviewParagraph.innerHTML = overview;
  
    return overviewParagraph; 
};

// My addition: creates HTMl for cast list
const createCastList = (cast) => {
  const castListParaghraph = document.createElement('p');
  castListParaghraph.setAttribute('id', 'movieCastList');
  castListParaghraph.innerHTML = `<span class="accent">Starring:</span> ${cast}`;

  return castListParaghraph;
}


// Returns a random movie from the first page of movies
export const getRandomMovie = (movies) => {
    const randomIndex = Math.floor(Math.random() * movies.length);
    const randomMovie = movies[randomIndex];
    return randomMovie;
};

// Uses the DOM to create HTML to display the movie
// My input: whatever concerns cast, runtime, release date or reset button
export const displayMovie = (movieInfo, cast) => {
    const moviePosterDiv = document.getElementById('moviePoster');
    const movieTextDiv = document.getElementById('movieText');
    const movieCastDiv = document.getElementById('movieCast');
    const likeBtn = document.getElementById('likeBtn');
    const dislikeBtn = document.getElementById('dislikeBtn');
    const resetBtn = document.getElementById('reset');
   
  
    // Create HTML content containing movie info
    const moviePoster = createMoviePoster(movieInfo.poster_path);
    const titleHeader = createMovieTitle(movieInfo.title);
    const overviewText = createMovieOverview(movieInfo.overview);
    const movieRuntime = createMovieRuntime(movieInfo.runtime);
    const movieReleaseDate = createMovieReleaseDate(movieInfo.release_date);
    const movieCastList = createCastList(cast);

  
    // Append title, poster, and overview to page
    moviePosterDiv.appendChild(moviePoster);
    movieTextDiv.appendChild(titleHeader);
    movieTextDiv.appendChild(overviewText);
    movieTextDiv.appendChild(movieRuntime);
    movieTextDiv.appendChild(movieReleaseDate);
    movieCastDiv.appendChild(movieCastList);

    showBtns();
    
    likeBtn.onclick = likeMovie;
    dislikeBtn.onclick = dislikeMovie;
    resetBtn.onclick = reset;
};