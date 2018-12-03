import { elements } from './base';
import { limitTitleWords } from './searchView';

export const toggleLikeBtn = isLiked => {
    const iconString = isLiked ? 'icon-heart' : 'icon-heart-outlined';
    document.querySelector('.movie__love use').setAttribute('href', `img/icons.svg#${iconString}`);
    // icons.svg#icon-heart-outlined
};

export const toggleLikeMenu = numLikes => {
    elements.likesMenu.style.visibility = numLikes > 0 ? 'visible' : 'hidden';
};

export const renderLike = like => {
    let path = like.img ? "https://image.tmdb.org/t/p/w500" + like.img : "https://www.themoviedb.org/assets/1/v4/logos/stacked-blue-5cd9d4be255c92e26c4a6c7722a66a7b636abaf8b0f3d7b44cbb26c6dcee605d.svg";

    const content = `
        <li>
            <a class="likes__link" href="#${like.id}">
                <figure class="likes__fig">
                    <img src="${path}" alt="${like.title}">
                </figure>
                <div class="likes__data">
                    <h4 class="likes__name">${limitTitleWords(like.title)}</h4>
                    <p class="likes__author">${like.tagline}</p>
                </div>
            </a>
        </li>
    `;
    elements.likesList.insertAdjacentHTML('beforeend', content);
};

export const deleteLike = id => {
    const el = document.querySelector(`.likes__link[href*="${id}"]`).parentElement;
    if (el) el.parentElement.removeChild(el);
}