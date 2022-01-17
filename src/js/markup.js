import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { getImage } from './getImage';
import { refs } from '..';
import cardRender from '../cardRender.hbs';
import { galleryModal } from '..';

export const markup = (url, type) => {
  getImage(url)
    .then(response => {
      if (response != undefined) {
        if (response.data.totalHits > 0) {
          if (type === 'new') {
            refs.galleryOfImages.innerHTML = cardRender(response.data.hits);
          } else if (type === 'more') {
            refs.galleryOfImages.insertAdjacentHTML('beforeend', cardRender(response.data.hits));
          }

          galleryModal.refresh();
        }
      } else {
        refs.galleryOfImages.innerHTML = '';
        throw new Error('Sorry, there are no images matching your search query. Please try again.');
      }
    })
    .catch(error => Notify.failure(error.message));
};
