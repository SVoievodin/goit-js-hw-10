import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './fetchCountries.js'

var debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;
const searchBox = document.getElementById('search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

searchBox.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(e) {
    if (e.target.value.trim() !== '') {
        fetchCountries(e.target.value.trim()).then(data => {
            if (data.length > 10) {
                Notify.info('Too many matches found. Please enter a more specific name.');
            };
            if (data.length <= 10) {
                countryList.innerHTML = countryListMarkup(data);
                countryInfo.innerHTML = "";
            }
            if (data.length === 1) {
                countryInfo.innerHTML = countryInfoMarkup(data);
                countryList.innerHTML = "";
            }
            console.log(data);
        }).catch(err => {
            countryInfo.innerHTML = "";
            countryList.innerHTML = "";
            console.log(err);
            Notify.failure('Oops, there is no country with that name');
        });
    }
};

function countryListMarkup(arr) {
    return arr.map(({ flags: { svg, alt }, name: { official } }) =>
        `<li style="list-style: none;">
        <img src="${svg}" alt="${alt}" height = "25" width="40" />
      <span style="font-size: 18px;">${official}</span></li>`).join('')
}

function countryInfoMarkup(arr) {
    return arr.map(({ flags: { svg, alt }, name: { official }, capital, languages, population }) =>
        `<ul style="list-style: none;">
        <li>
          <img style="display: inline-block;" src="${svg}" alt="${alt}" height="25" />
          <h1 style="font-size: 42px; display: inline-block;">${official}</h1>
        </li>
        <li>
          <span><b>Capital:</b> ${capital}</span>
        </li>
        <li>
          <span><b>Population: </b>${population}</span>
        </li>
        <li>
          <span><b>Languages: </b>${Object.values(languages)}</span>
        </li>
      </ul>`).join('')
}

