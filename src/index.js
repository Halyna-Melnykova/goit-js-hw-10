// бібліотеки
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

import './css/styles.css';
// шаблон
import countryInfo from './templates/country.hbs'

import fetchCountries from "./fetchCountries";

const inputEl = document.querySelector('#search-box');
const listEl = document.querySelector('.country-list');
const containerEl = document.querySelector('.country-info');
const DEBOUNCE_DELAY = 300;

// розмітка списку країн при пошуку
function createItemsMarkup(items) {
return items.map(item => `<li>${item.name}</li>`).join();
}

inputEl.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(event) {
    const filter = event.target.value.toLowerCase().trim();
    console.log(filter)

    const filteredItems = countries.filter(item => item.toLowerCase().includes(filter))

    const markup = createItemsMarkup(filteredItems);
    listEl.innerHTML = markup;
}

fetchCountries()
.then(renderCountryInfo)
.catch(error => console.log(error));
// Notiflix.Notify.failure(`"Oops, there is no country with that name"`)

function renderCountryInfo(country) {
    const markup = countryInfo(country);
    containerEl.innerHTML = markup;
}
