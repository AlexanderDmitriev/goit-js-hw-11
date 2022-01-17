import './sass/main.scss';
import axios from 'axios';
import cardRender from '../src/cardRender.hbs';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const BASE_URL = 'https://pixabay.com/api/';

const queryParameters = {
  key: '25236091-8685fe5809d54541c15ad7685', //мой уникальный ключ доступа к API
  q: '', //термин для поиска. То, что будет вводить пользователь
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
};

const { key, q, image_type, orientation, safesearch } = queryParameters;
const searchParams = 'webformatURL,largeImageURL,tags,likes,views,comments,downloads';
let url;

const refs = {
  inputSearchForm: document.querySelector('.search-form__input'),
  buttonSearchForm: document.querySelector('.button'),
  seachingForm: document.querySelector('.search-form'),
  galleryOfImages: document.querySelector('.gallery'),
};

const searchFormHandler = event => {
  event.preventDefault();
  queryParameters.q = refs.inputSearchForm.value.trim();
  const keys = `${key}&q=${queryParameters.q}&image_type=${image_type}&orientation=${orientation}&safesearch=${safesearch}`;
  url = `${BASE_URL}?key=${keys}?fields=${searchParams}`;

  getImage(url)
    .then(response => {
      if (response != undefined) {
        if (response.data.totalHits > 0) {
          refs.galleryOfImages.innerHTML = cardRender(response.data.hits);
        }
      } else {
        refs.galleryOfImages.innerHTML = '';
        throw new Error('Sorry, there are no images matching your search query. Please try again.');
      }
    })
    .catch(error => Notify.failure(error.message));
};

const galleryModal = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionType: 'alt',
  captionDelay: 200,
  captionPosition: 'bottom',
});

async function getImage(url) {
  try {
    const response = await axios.get(url);
    galleryModal.refresh();
    console.log(response.data);
    if (response.data.totalHits > 0) {
      return response;
    }
    throw new Error('Sorry, there are no images matching your search query. Please try again.');
  } catch (error) {
    error => Notify.failure(error.message);
  }
}

refs.seachingForm.addEventListener('submit', searchFormHandler);
