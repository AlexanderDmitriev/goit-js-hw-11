import './sass/main.scss';
import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';

const queryParameters = {
  key: '25236091-8685fe5809d54541c15ad7685', //мой уникальный ключ доступа к API
  q: '', //термин для поиска. То, что будет вводить пользователь
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
};

let url;

const refs = {
  inputSearchForm: document.querySelector('.search-form__input'),
  buttonSearchForm: document.querySelector('.button'),
  seachingForm: document.querySelector('.search-form'),
};

const searchFormHandler = event => {
  event.preventDefault();
  queryParameters.q = refs.inputSearchForm.value;
  url = `${BASE_URL}?key=${queryParameters.key}&q=${queryParameters.q}&image_type=${queryParameters.image_type}&orientation=${queryParameters.orientation}&safesearch=${queryParameters.safesearch}`;
  console.log(getImage(url));
};

async function getImage(url) {
  try {
    const response = await axios.get(url);

    console.log(response);
  } catch (error) {
    console.error(error);
  }
}

refs.seachingForm.addEventListener('submit', searchFormHandler);
