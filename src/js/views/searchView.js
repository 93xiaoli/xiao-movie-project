import {elements} from './base';

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
    elements.searchInput.value = '';
};

export const clearResults = () => {
    elements.searchResList.innerHTML = '';
    elements.searchResPages.innerHTML = '';
};

export const highlightSelected = id => {
    const resultsArr = Array.from(document.querySelectorAll('.results__link'));
    resultsArr.forEach(el => {
        el.classList.remove('results__link--active');
    });
    document.querySelector(`.results__link[href*="${id}"]`).classList.add('results__link--active');
};

export const limitTitleWords = (title, limit = 17) => {
    const newTitle = [];
    if (title.length > limit) {
        title.split(' ').reduce((acc, cur) => {
            if (acc + cur.length <= limit) {
                newTitle.push(cur);
            }
            return acc + cur.length;
        }, 0);

        return `${newTitle.join(' ')} ...`;
    }
    return title;
}

const renderMovie = movie => {
    let path;
    if (movie.poster_path) {
        path = "https://image.tmdb.org/t/p/w500" + movie.poster_path;
    } else {
        path = "https://www.themoviedb.org/assets/1/v4/logos/stacked-blue-5cd9d4be255c92e26c4a6c7722a66a7b636abaf8b0f3d7b44cbb26c6dcee605d.svg";
    }

    const content = `
        <li>
            <a class="results__link" href="#${movie.id}">
                <figure class="results__fig">
                    <img src=${path} alt="${movie.title}">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${limitTitleWords(movie.title)}</h4>
                    <p class="results__author">${limitTitleWords(movie.overview, 100)}</p>
                </div>
            </a>
        </li>
    `;
    elements.searchResList.insertAdjacentHTML('beforeend', content);
};

// type: 'prev' or 'next'
const createButton = (page, type) => `
    <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>
        <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
        </svg>
    </button>
`;


const renderButtons = (page, pages) => {
    let button;

    if (page === 1 && pages > 1) {
        // first page
        button = createButton(page, 'next');
    } else if (page < pages) {
        // mid
        button = `
            ${createButton(page, 'prev')}
            ${createButton(page, 'next')}
        `;
    } else if (page === pages && pages > 1) {
        // last page
        button = createButton(page, 'prev');
    }
    if (button) {
        elements.searchResPages.insertAdjacentHTML('afterbegin', button);
    }

};


export const renderResults = (movies, sortRate, page = 1) => {
    // render results of current page
    // Ten items per page
    let content = movies.results;
    if (content.length > 10) {
        if (page % 2) {
            content = content.splice(10);
        } else {
            content = content.splice(0, 10);
        }
    }
    console.log(sortRate, content)
    if (sortRate) {
        content.sort((a, b) => {
            return b.vote_average - a.vote_average;
        });
    }
    console.log(sortRate, content)
    content.forEach(renderMovie);

    // render pagination buttons
    renderButtons(page, movies["total_pages"]);
};
