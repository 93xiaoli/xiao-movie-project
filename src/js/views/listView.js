import {elements} from './base';

export const renderItem = movie => {
    let path = movie.poster_path ? "https://image.tmdb.org/t/p/w500" + movie.poster_path : "https://www.themoviedb.org/assets/1/v4/logos/stacked-blue-5cd9d4be255c92e26c4a6c7722a66a7b636abaf8b0f3d7b44cbb26c6dcee605d.svg";
    const content = `
        <li class="watch__item" data-itemid=${movie.id}>
            <div class="watch__img">
                <img src="${path}" alt="${movie.title}" class="movie__img">
            </div>
            <p class="watch__title">${movie.title}</p>       
            <button class="watch__delete btn-tiny">
                <svg>
                    <use href="img/icons.svg#icon-circle-with-cross"></use>
                </svg>
            </button>
            <div>
                <p class="watch__tagline">${movie.tagline}</p>
            </div>
        </li>
    `;
    elements.watch.insertAdjacentHTML('beforeend', content);
};

export const deleteItem = id => {
    const item = document.querySelector(`[data-itemid="${id}"]`);
    if (item) item.parentElement.removeChild(item);
};
