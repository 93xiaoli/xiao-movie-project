import SearchMovie from './models/SearchMovie';
import Movie from './models/Movie';
import List from './models/List';
import Likes from './models/Likes';
import * as searchView from './views/searchView';
import * as movieView from './views/movieView';
import * as listView from './views/listView';
import * as likesView from './views/likesView';
import {elements, renderLoader, clearLoader} from './views/base';
import $ from "jquery";

const state = {};

/**
 * SEARCH MOVIE CONTROLLER
 */
const controlSearch = async () => {
    // 1) Get query from view
    const query = searchView.getInput().trim();
    const sortRate = $('.checkbox.sort-rate').is(':checked');

    if (query) {
        // 2) New search object and add to state
        state.search = new SearchMovie(query);

        // 3) Prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);


        try {
            // 4) Search for movies
            await state.search.getResults();
            // 5) Render results on UI
            clearLoader();
            searchView.renderResults(state.search.result, sortRate);
        } catch (err) {
            alert('Something wrong with the search...');
            clearLoader();
        }
    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});


elements.searchResPages.addEventListener('click', async e => {
    const btn = e.target.closest('.btn-inline');
    const sortRate = $('.checkbox.sort-rate').is(':checked');
    if (btn) {
        const page = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        await state.search.getResults(page);
        clearLoader();
        searchView.renderResults(state.search.result, sortRate, page);
    }
});


/**
 * Movie CONTROLLER
 */
const controlMovie = async () => {
    // Get ID from url
    const id = window.location.hash.replace('#', '');

    if (id) {
        // Prepare UI for changes
        movieView.removeMovie();
        renderLoader(elements.movie);

        // Highlight selected search item
        if (state.search)
            if (state.search.hasOwnProperty("result") && state.search.result.hasOwnProperty(id))
                searchView.highlightSelected(id);

        // Create new movie object
        state.movie = new Movie(id);

        try {
            // Get Movie data and parse ingredients
            await state.movie.getMovie();
            // Render movie
            clearLoader();
            movieView.renderMovie(
                state.movie.result,
                state.likes.isLiked(id)
            );

        } catch (err) {
            console.log(err);
        }
    }
};

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlMovie));


/**
 * LIST CONTROLLER
 */
const controlList = () => {
    // Create a new list IF there in none yet
    if (!state.list) state.list = new List();
    let cur = state.movie.result;
    const item = state.list.addItem(cur.id, cur.title, cur.tagline, cur.poster_path);
    if (item) listView.renderItem(item);
}

// Handle delete and update list item events
elements.watch.addEventListener('click', e => {
    const id = e.target.closest('.watch__item').dataset.itemid;

    // Handle the delete button
    if (e.target.matches('.watch__delete, .watch__delete *')) {
        // Delete from state
        state.list.deleteItem(id);
        // Delete from UI
        listView.deleteItem(id);
    }
});


/**
 * LIKE CONTROLLER
 */
const controlLike = () => {
    if (!state.likes) state.likes = new Likes();
    let cur = state.movie.result;
    if (!state.likes.isLiked(cur.id)) {
        // Add like to the state
        const newLike = state.likes.addLike(
            cur.id,
            cur.title,
            cur.poster_path,
            cur.tagline
        );
        // Toggle the like button
        likesView.toggleLikeBtn(true);

        // Add like to UI list
        likesView.renderLike(newLike);

        // User HAS liked current movie
    } else {
        // Remove like from the state
        state.likes.deleteLike(cur.id);

        // Toggle the like button
        likesView.toggleLikeBtn(false);

        // Remove like from UI list
        likesView.deleteLike(cur.id);
    }
    likesView.toggleLikeMenu(state.likes.getNumLikes());
};

// Restore liked movies on page load
window.addEventListener('load', () => {
    state.likes = new Likes();

    // Restore likes
    state.likes.readStorage();

    // Toggle like menu button
    likesView.toggleLikeMenu(state.likes.getNumLikes());

    // Render the existing likes
    state.likes.likes.forEach(like => likesView.renderLike(like));
});


// Handling movie button clicks
elements.movie.addEventListener('click', e => {
    if (e.target.matches('.movie__btn--add, .movie__btn--add *')) {
        // Watchlist
        controlList();
    } else if (e.target.matches('.movie__love, .movie__love *')) {
        // Like
        controlLike();
    }
});
