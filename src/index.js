import Notiflix, { Notify } from 'notiflix';

import ApiService from './js/fetchImages';
import { createImagesCards } from './js/createImageCard';

const refs = {
  formEl: document.querySelector('#search-form'),
  galleryEl: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

refs.loadMoreBtn.hidden = true;
refs.formEl.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

// const options = {
//   root: null,
//   rootMargin: '100px',
//   threshold: 0,
// };

// const observer = new IntersectionObserver(onPagination, options);
const apiService = new ApiService();

function onSearch(event) {
  event.preventDefault();

  apiService.query = event.currentTarget.elements.searchQuery.value.trim();
  if (apiService.query === '') {
    return Notiflix.Notify.info('Please, enter your serch parameters!');
  }
  refs.loadMoreBtn.hidden = true;
  apiService.resetPage();
  cleanGallery();
  apiService.fetchImages().then(({ hits, totalHits }) => {
    if (totalHits === 0) {
      //////////////
      return Notiflix.Notify.info('Нічого не знайдено!');
      /////////////////////////
    }
    if (totalHits <= apiService.per_page) {
      refs.loadMoreBtn.hidden = true;
      createImagesCards(hits);
    } else {
      createImagesCards(hits);
      refs.loadMoreBtn.hidden = false;
    }
    Notiflix.Notify.info(`Hooray! We found ${totalHits} images.`);
  });
}

function onLoadMore() {
  apiService.fetchImages().then(({ hits }) => createImagesCards(hits));
}

function cleanGallery() {
  refs.galleryEl.innerHTML = '';
}
