import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export { createImagesCards };

const galleryEl = document.querySelector('.gallery');
function createImagesCards(images) {
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) =>
        `<a class="gallery__link" href="${largeImageURL}">
<div class="photo-card">
        <img
          class="photo-card__img"
          src="${webformatURL}"
          alt="${tags}"
          loading="lazy"
          width="320"
          height="212"
        />
      <div class="info">
        <p class="info-item">
          <b>Likes</b>
          <span>${likes}</span>
        </p>
        <p class="info-item">
          <b>Views</b>
          <span>${views}</span>
        </p>
        <p class="info-item">
          <b>Comments</b>
          <span>${comments}</span>
        </p>
        <p class="info-item">
          <b>Downloads</b>
          <span>${downloads}</span>
        </p>
      </div>
    </div>
        </a>`
    )
    .join('');

  galleryEl.insertAdjacentHTML('beforeend', markup);

  const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
    captionPosition: 'bottom',
  });
}
