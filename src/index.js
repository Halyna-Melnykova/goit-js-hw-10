// бібліотеки
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

import './css/styles.css';

// шаблони
import countryCardTemplate from './templates/country-card.hbs';
import countryListTemplate from './templates/country-list.hbs';

import { fetchCountries } from './fetch';

const inputEl = document.querySelector('#search-box');
const listEl = document.querySelector('.country-list');
const containerEl = document.querySelector('.country-info');
const DEBOUNCE_DELAY = 300;

inputEl.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(event) {
  let filter = event.target.value.trim();
  console.log(filter);
  if (filter === '') {
    return;
  }

  //  ф-я повертає проміс, який ми обробляємо
  fetchCountries(filter)
    .then(countries => {
    // масив країн
    //   console.log(countries);
    // розмітка
      renderCountryInfo(countries);
    })
    .catch(() => {
      Notiflix.Notify.failure('Oops, there is no country with that name');
    });
}

function renderCountryInfo(countries) {
  // очищаєм розмітку, перед новим пошуком
  listEl.innerHTML = '';
  containerEl.innerHTML = '';
  // перевірки за кількістю країн
  if (countries.length > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
    return;
  } else if (countries.length > 1 && countries.length <= 10) {
    listEl.innerHTML = countryListTemplate(countries);
    return;
  } else if (countries.length === 1) {
    countries[0].languages = Object.values(countries[0].languages).join(', ');
    containerEl.innerHTML = countryCardTemplate(countries[0]);
  }
}

