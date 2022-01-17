import axios from 'axios';

export async function getImage(url) {
  try {
    const response = await axios.get(url);

    console.log(response.data);
    if (response.data.totalHits > 0) {
      return response;
    }
    throw new Error('Sorry, there are no images matching your search query. Please try again.');
  } catch (error) {
    error => Notify.failure(error.message);
  }
}
