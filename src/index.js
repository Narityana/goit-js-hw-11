import Notiflix, { Notify } from 'notiflix';
import ApiService from './js/fetchImages';
import { createImagesCards } from './js/createImageCard';
import { onScroll } from './js/scroll';

const refs = {
  formEl: document.querySelector('#search-form'),
  galleryEl: document.querySelector('.gallery'),
  guardEl: document.querySelector('.guard'),
};

const options = {
  root: null,
  rootMargin: '300px',
  threshold: 0,
};

const observer = new IntersectionObserver(onPagination, options);
const apiService = new ApiService();

refs.formEl.addEventListener('submit', onSearch);

function onSearch(event) {
  event.preventDefault();

  apiService.query = event.currentTarget.elements.searchQuery.value.trim();
  if (apiService.query === '') {
    return Notiflix.Notify.info('Please, enter your serch parameters!');
  }

  apiService.resetPage();
  cleanGallery();
  apiService.fetchImages().then(({ hits, totalHits }) => {
    if (totalHits === 0) {
      return Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
    createImagesCards(hits);
    if (apiService.page !== apiService.total_pages) {
      observer.observe(refs.guardEl);
    }
    Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
  });
  onScroll();
}

function cleanGallery() {
  refs.galleryEl.innerHTML = '';
}

function onPagination(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      apiService.page += 1;
      apiService.fetchImages().then(({ hits }) => createImagesCards(hits));

      if (apiService.page === apiService.total_pages) {
        observer.unobserve(guard);
      }
    }
  });
}
