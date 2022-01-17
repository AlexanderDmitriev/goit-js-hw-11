import './sass/main.scss';
import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import cardRender from '../src/cardRender.hbs';
import { getImage } from './js/getImage';
import { markup } from './js/markup';

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
let page;
let perPage = 40;

export const refs = {
  inputSearchForm: document.querySelector('.search-form__input'),
  buttonSearchForm: document.querySelector('.button'),
  seachingForm: document.querySelector('.search-form'),
  galleryOfImages: document.querySelector('.gallery'),
  loadMoreButton: document.querySelector('.load-more'),
};

const searchFormHandler = event => {
  event.preventDefault();
  page = 1;
  queryParameters.q = refs.inputSearchForm.value.trim();
  const keys = `${key}&q=${queryParameters.q}&image_type=${image_type}&orientation=${orientation}&safesearch=${safesearch}`;
  const pagination = `per_page=${perPage}&page=${page}`;
  url = `${BASE_URL}?key=${keys}&fields=${searchParams}&${pagination}`;

  markup(url, 'new');
};

export const galleryModal = new SimpleLightbox('.gallery a', {
  captionDelay: 200,
});

const loadMoreHandler = event => {
  page++;
  queryParameters.q = refs.inputSearchForm.value.trim();
  const keys = `${key}&q=${queryParameters.q}&image_type=${image_type}&orientation=${orientation}&safesearch=${safesearch}`;
  const pagination = `per_page=${perPage}&page=${page}`;
  url = `${BASE_URL}?key=${keys}&fields=${searchParams}&${pagination}`;

  markup(url, 'more');
};

refs.seachingForm.addEventListener('submit', searchFormHandler);
refs.loadMoreButton.addEventListener('click', loadMoreHandler);
