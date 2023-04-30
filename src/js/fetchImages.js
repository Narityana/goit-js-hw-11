import axios from 'axios';

export default class ApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.per_page = 40;
  }

  async fetchImages() {
    const BASE_URL = 'https://pixabay.com/api/';
    const API_KEY = '35824205-a7946410d22ee02a168027a28';
    const params = new URLSearchParams({
      key: API_KEY,
      q: this.searchQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: this.page,
      per_page: this.per_page,
    });

    const url = `${BASE_URL}?${params}`;
    try {
      const response = await axios.get(url);
      this.incrementPage();

      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
  incrementPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }
}
