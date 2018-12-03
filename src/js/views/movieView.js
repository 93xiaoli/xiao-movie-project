import {elements} from './base';

export const removeMovie = () => {
    elements.movie.innerHTML = '';
};

export const renderMovie = (movie, isLiked) => {
    let path, runtime, tagline, company_name;
    path = movie.poster_path ? "https://image.tmdb.org/t/p/w500" + movie.poster_path : "https://www.themoviedb.org/assets/1/v4/logos/stacked-blue-5cd9d4be255c92e26c4a6c7722a66a7b636abaf8b0f3d7b44cbb26c6dcee605d.svg";
    runtime = movie.runtime ? movie.runtime : "UNKNOWN";
    tagline = movie.tagline ? movie.tagline : movie.title;
    company_name = movie.production_companies.length ? movie.production_companies[0].name : '';

    const content = `
        <figure class="movie__fig">
            <img src="${path}" alt="${movie.title}" class="movie__img">
            <h1 class="movie__title">
                <span>${movie.title}</span>
            </h1>
        </figure>

        <div class="movie__details">
            <div class="movie__info">
                <svg class="movie__info-icon">
                    <use href="img/icons.svg#icon-stopwatch"></use>
                </svg>
                <span class="movie__info-data movie__info-data--minutes">${runtime}</span>
                <span class="movie__info-text"> minutes</span>
            </div>
            <div class="movie__info">
                <svg class="movie__info-icon">
                    <use href="img/icons.svg#icon-date"></use>
                </svg>
                <span class="movie__info-data">${movie.release_date}</span>
                <span class="movie__info-text"> </span>

            </div>
            <button class="movie__love">
                <svg class="header__likes">
                    <use href="img/icons.svg#icon-heart${isLiked ? '' : '-outlined'}"></use>
                </svg>
            </button>
        </div>

        <div class="movie__overview">
            <ul class="movie__overview-list">
					<li><strong>Rating:</strong> ${movie.vote_average} / 10 (${movie.vote_count} votes)</li>
					<li><strong>Revenue:</strong> ${movie.revenue}</li>
					<li><strong>Status:</strong> ${movie.status}</li>
					<li><strong>Production companies:</strong> ${company_name}</li>           
            </ul>

            <button class="btn-small movie__btn movie__btn--add">
                <svg class="search__icon">
                    <use href="img/icons.svg#icon-list"></use>
                </svg>
                <span>Add to watchlist</span>
            </button>
        </div>

        <div class="movie__directions">
            <h2 class="heading-2">${tagline}</h2>
            <p class="movie__directions-text">
                ${movie.overview}
            </p>
            <a class="btn-small movie__btn" href="https://www.imdb.com/title/${movie.imdb_id}" target="_blank">
                <span>IMDB</span>
                <svg class="search__icon">
                    <use href="img/icons.svg#icon-triangle-right"></use>
                </svg>
            </a>
            
        </div>
    `;
    elements.movie.insertAdjacentHTML('afterbegin', content);
};