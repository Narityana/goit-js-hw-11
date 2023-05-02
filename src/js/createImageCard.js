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
        `
<div class="photo-card">
<a class="gallery__link" href="${largeImageURL}">
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
      </a>
    </div>`
    )
    .join('');

  galleryEl.insertAdjacentHTML('beforeend', markup);
}
