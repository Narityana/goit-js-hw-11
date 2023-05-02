import Notiflix, { Notify } from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
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

const lightbox = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
});

const observer = new IntersectionObserver(onPagination, options);
const apiService = new ApiService();

refs.formEl.addEventListener('submit', onSearch);

async function onSearch(event) {
  event.preventDefault();

  apiService.query = event.currentTarget.elements.searchQuery.value.trim();
  if (apiService.query === '') {
    return Notiflix.Notify.info('Please, enter your serch parameters!');
  }
  refs.guardEl.innerHTML = '';
  apiService.resetPage();
  cleanGallery();
  try {
    const { hits, totalHits } = await apiService.fetchImages();
    if (totalHits === 0) {
      return Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
    createImagesCards(hits);
    lightbox.refresh();

    if (apiService.page !== apiService.total_pages) {
      observer.observe(refs.guardEl);
    }

    Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
  } catch (error) {
    console.log(error);
  }
}
onScroll();
function cleanGallery() {
  refs.galleryEl.innerHTML = '';
}

async function onPagination(entries, observer) {
  entries.forEach(async entry => {
    if (entry.isIntersecting) {
      apiService.page += 1;
      try {
        const { hits } = await apiService.fetchImages();
        createImagesCards(hits);
        lightbox.refresh();
        if (apiService.page === apiService.total_pages) {
          observer.unobserve(guard);
        }
        if (apiService.page > apiService.total_pages) {
          refs.guardEl.insertAdjacentHTML(
            'beforeend',
            '<p class="last-page">These are all images at your search query!</p>'
          );
        }
      } catch (error) {
        console.log(error);
      }
    }
  });
}
