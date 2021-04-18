import './styles.css';
import debounce from 'lodash.debounce';
import countryCardTempl from './templates/country-card.hbs';
import countryListTempl from './templates/country-list.hbs';
import CountriesApi from './js/serch-api';

const inputRef = document.querySelector('.input');
const containerRef = document.querySelector('.result-container');

const countriesApi = new CountriesApi();

const inputDebounce = debounce(e => {
  onSearch(e);
}, 500);

inputRef.addEventListener('input', inputDebounce);

function onSearch(e) {
  clearRender();
  countriesApi.query = e.target.value;
  countriesApi
    .fetchCountry()
    .then(country => {
      if (country.length > 1) {
        renderCountryList(country);
      } else {
        renderCountryCard(country);
      }
    })
    .catch(onFetchError);
}

function renderCountryCard(country) {
  const countryMarkup = countryCardTempl(country);
  containerRef.insertAdjacentHTML('beforeend', countryMarkup);
}

function renderCountryList(country) {
  const countryMarkup = countryListTempl(country);
  containerRef.insertAdjacentHTML('beforeend', countryMarkup);
}

function clearRender() {
  containerRef.innerHTML = '';
}

function onFetchError(error) {
  alert('Can not find this name!');
}
