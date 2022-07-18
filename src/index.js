// бібліотеки
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

import './css/styles.css';
// шаблон
import countryCardTemplate from './templates/country-card.hbs';
import countryListTemplate from './templates/country-list.hbs';

import { fetchCountries } from './fetch';

const inputEl = document.querySelector('#search-box');
const listEl = document.querySelector('.country-list');
const containerEl = document.querySelector('.country-info');
const DEBOUNCE_DELAY = 300;

inputEl.addEventListener('input', onSearch);

function onSearch(event) {
  let filter = event.target.value.trim();
  console.log(filter);

  fetchCountries(filter)
    .then((countries) => {
        console.log(countries)
        renderCountryInfo(countries)})
    .catch(() => {Notiflix.Notify.failure("Oops, there is no country with that name")});
}

function renderCountryInfo(countries) {
    listEl.innerHTML = '';
    containerEl.innerHTML = '';

    if (countries.length > 10) {
        Notiflix.Notify.info("Too many matches found. Please enter a more specific name.")
        return;
    }
    if (countries.length > 1) {
        listEl.innerHTML = countryListTemplate(countries);
        return
    }
    containerEl.innerHTML = countryCardTemplate(countries[0]);
}
