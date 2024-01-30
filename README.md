# Film Finder, a Codecademy project  
 
This is a project using API. It shows a random movie withing a chosen genre form the TMDB.  
To run the site, you need to have an API key. [For further instructions click here.](https://developer.themoviedb.org/docs/getting-started)  

Many helper functions were handed to me on a plate in this one, I was also guided how to create getGenres(), getMovies() and getMovieInfo().
NEVERTHELESS, I have learnt a lot, which is what it is all about :)

My input: 
- entering your own API key is required through a form and stored in localStorage,
- if API is correct, the form disappears from UI,
- createMovieRuntime() - renders HTML for runtime,
- createMovieReleaseDate() - renders HTML for release date,
- getMovieCast() - gets info about random movie cast,
- createCastList() - renders HTML for getMovieCast(),
- alternated getMovies() - the original one selected a random movie only from the 1st page - I made it choose random page form 1 to 500 -the scope for pages accepted by TMDB,
- like and dislike counter binded with a list of movies you you wish and wish not see (handleClick(), updateListHTML(), handleLikeMovie(), handleDislikeMovie()),
- reset() function clearing the counter and a list of movies,
- all the little alternations needed for the code to work,
- responsive layout.  

[see demo version](xxx)
