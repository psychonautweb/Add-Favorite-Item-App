const addMovieModalEl = document.getElementById('add-modal');
const startAddMovieButtonEl = document.querySelector('header button');
const backdropDiv = document.getElementById('backdrop');
const cancelAddMovieButton = addMovieModalEl.querySelector('.btn--passive');
const confirmaddMovieButton = addMovieModalEl.querySelector('.btn--success');
const userInputsEl = addMovieModalEl.querySelectorAll('input');
const entryTextSection = document.getElementById('entry-text');
const deleteMovieModal = document.getElementById('delete-modal');


const movies = [];

const toggleBackdropDiv = () => {
    backdropDiv.classList.toggle('visible');
};

const updateUi = () => {
    if(movies.length === 0) {
        entryTextSection.style.display = 'block';
    } else {
        entryTextSection.style.display = 'none';
    }
};

const closeMovieDeletionModal = () => {
    toggleBackdropDiv();
    deleteMovieModal.classList.remove('visible');
}

const deleteMovieHandler = (movieId) => {
    let movieIndex = 0;
    for (const movie of movies) {
        if(movie.id === movieId) {
            break;
        }
        movieIndex++;
    }
    movies.splice(movieIndex, 1); // removes item with x index from array
    const listRoot = document.getElementById('movie-list');
    listRoot.children[movieIndex].remove();
    closeMovieDeletionModal();
    updateUi();
};

const startDeleteMovieHandler = (movieId) => {
    deleteMovieModal.classList.add('visible');
    toggleBackdropDiv();

    const cancelDeletionButton = deleteMovieModal.querySelector('.btn--passive');
    let confirmDeletionButton = deleteMovieModal.querySelector('.btn--danger');

    confirmDeletionButton.replaceWith(confirmDeletionButton.cloneNode(true)); // creates deep clone
    confirmDeletionButton = deleteMovieModal.querySelector('.btn--danger');

    cancelDeletionButton.removeEventListener('click', closeMovieDeletionModal);

    cancelDeletionButton.addEventListener('click', closeMovieDeletionModal);
    confirmDeletionButton.addEventListener('click', deleteMovieHandler.bind(null, movieId) );
};

const renderNewMovieElement = (id, title, imageUrl, rating) => {
    const newMovieElement = document.createElement('li');
    newMovieElement.className = 'movie-element';
    newMovieElement.innerHTML = `
    <div class="movie-element__image">
        <img src="${imageUrl}" alt="${title}">
    </div>
    <div class="movie-element__info">
        <h2>${title}</h2>
        <p>${rating}/5 starts</p>
    </div>
    `;
    newMovieElement.addEventListener('click', startDeleteMovieHandler.bind(null, id));
    const listRoot = document.getElementById('movie-list');
    listRoot.append(newMovieElement);
}

const closeMovieModal = () => {
    addMovieModalEl.classList.remove('visible');
}

const showMovieModal = () => {
    addMovieModalEl.classList.toggle('visible');
    toggleBackdropDiv();
};

const clearMovieInput = () => {   // dynamically loops through all input elements and sets them to empty
    for (const usrInput of userInputsEl) {
        usrInput.value = '';
    }
};

const cancelAddMovieHandler = () => {
    closeMovieModal();
    toggleBackdropDiv();
    clearMovieInput();
};

const addMovieHandler = () => {
    const titleValue = userInputsEl[0].value;
    const imageUrlValue = userInputsEl[1].value;
    const ratingValue = userInputsEl[2].value;

    if(titleValue.trim() === '' || imageUrlValue.trim() === '' || ratingValue.trim() === '' || +ratingValue < 1 || +ratingValue >5) {
        alert('Please enter valid values (rating between 1 and 5).');
        return;
    }                         //trim removes excess whitespaces

    const newMovie = {
        id: Math.random().toString(),
        title: titleValue,
        image: imageUrlValue,
        rating: ratingValue
    };

    movies.push(newMovie);
    closeMovieModal();
    toggleBackdropDiv();
    clearMovieInput();
    renderNewMovieElement(newMovie.id, newMovie.title, newMovie.image, newMovie.rating);
    updateUi();
};

const backdropClickHandler = () => {
    closeMovieModal();
    closeMovieDeletionModal();
    clearMovieInput();
};


startAddMovieButtonEl.addEventListener('click', showMovieModal);
backdropDiv.addEventListener('click', backdropClickHandler);
cancelAddMovieButton.addEventListener('click', cancelAddMovieHandler);
confirmaddMovieButton.addEventListener('click', addMovieHandler);

