import './sass/main.scss';
import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { markup } from './js/markup';
import { res } from './js/getImage';

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
export let perPage = 40;

export const refs = {
  inputSearchForm: document.querySelector('.search-form__input'),
  buttonSearchForm: document.querySelector('.button'),
  seachingForm: document.querySelector('.search-form'),
  galleryOfImages: document.querySelector('.gallery'),
  loadMoreButton: document.querySelector('.load-more'),
};

function toggleModal() {
  refs.loadMoreButton.classList.remove('is-hidden');
}
function addingHidden() {
  refs.loadMoreButton.classList.add('is-hidden');
}

const searchFormHandler = event => {
  event.preventDefault();
  page = 1;
  queryParameters.q = refs.inputSearchForm.value.trim();
  const keys = `${key}&q=${queryParameters.q}&image_type=${image_type}&orientation=${orientation}&safesearch=${safesearch}`;
  const pagination = `per_page=${perPage}&page=${page}`;
  url = `${BASE_URL}?key=${keys}&fields=${searchParams}&${pagination}`;

  markup(url, 'new');
  toggleModal();
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
  console.log(Math.ceil(res / perPage));
  if (Math.ceil(res / perPage) === page) {
    addingHidden();
    Notify.info("We're sorry, but you've reached the end of search results.");
  }
};

refs.seachingForm.addEventListener('submit', searchFormHandler);
refs.loadMoreButton.addEventListener('click', loadMoreHandler);
