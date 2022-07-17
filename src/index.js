// бібліотеки
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

import './css/styles.css';
// шаблон
import countryInfo from './templates/country.hbs'

import fetchCountries from "./fetchCountries";

const inputEl = document.querySelector('#search-box');
const listEl = document.querySelector('.country-list');
const DEBOUNCE_DELAY = 300;

// розмітка списку країн при пошуку    не треба
// const markup = createItemsMarkup(items);
// listEl.innerHTML = markup;

// function createItemsMarkup(items) {
// return items.map(item => `<li>${item.name}</li>`).join();
// }

inputEl.addEventListener('input', debounce(onSearch, 300));

function onSearch(event) {
    const filter = event.target.value.toLowerCase().trim();
    console.log(filter)

    // const filteredItems = countries.filter(item => item.toLowerCase().includes(filter))

    // const markup = createItemsMarkup(filteredItems);
    // listEl.innerHTML = markup;
}
// fetch('https://restcountries.com/v2/all?fields=name,capital,population,flags,languages').then(responce => responce.json()).then(console.log);