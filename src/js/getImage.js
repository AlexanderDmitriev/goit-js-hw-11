import axios from 'axios';
import { perPage } from '..';
export let res;
export async function getImage(url) {
  try {
    const response = await axios.get(url);
    res = response.data.totalHits;
    if (response.data.totalHits > 0) {
      return response;
    }
    throw new Error('Sorry, there are no images matching your search query. Please try again.');
  } catch (error) {
    error => Notify.failure(error.message);
  }
}
