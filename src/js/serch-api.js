const BASE_URL = 'https://restcountries.eu/rest/v2/name';

export default class CountriesApi {
  constructor() {
    this.searchQuery = '';
  }

  fetchCountry() {
    return fetch(`${BASE_URL}/${this.searchQuery}`).then(response => {
      if (!response.ok) {
        throw response;
      }
      return response.json();
    });
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
