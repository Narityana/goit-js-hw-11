export function onScroll() {
  const firstCardEl = document.querySelector('.gallery').firstElementChild;
  if (firstCardEl) {
    const { height: cardHeight } = firstCardEl.getBoundingClientRect();
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  }
}
