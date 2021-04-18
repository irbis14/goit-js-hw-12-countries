import './styles.css';
import debounce from 'lodash.debounce';
import countryCardTempl from './templates/country-card.hbs';
import countryListTempl from './templates/country-list.hbs';
import CountriesApi from './js/serch-api';
import { error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

const inputRef = document.querySelector('.input');
const containerRef = document.querySelector('.result-container');

const countriesApi = new CountriesApi();

const inputDebounce = debounce(e => {
  onSearch(e);
}, 500);

function onSearch(e) {
  clearRender();
  countriesApi.query = e.target.value;
  countriesApi
    .fetchCountry()
    .then(country => {
      countrySearch(country);
    })
    .catch(onFetchError);
}

function countrySearch(country) {
  if (country.length === 1) {
    renderCountryCard(country);
  } else if (country.length >= 2 && country.length <= 10) {
    renderCountryList(country);
  } else if (country.length > 10) {
    error({
      title: 'To many matches found.',
      text: 'Please enter a more specific query.',
    });
  }
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

function onFetchError() {
  error({
    title: 'Nothing found.',
    text: 'Please enter a more specific query.',
  });
}

inputRef.addEventListener('input', inputDebounce);
