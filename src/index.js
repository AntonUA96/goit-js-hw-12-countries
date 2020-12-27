import './style.css';
import '@pnotify/core/dist/BrightTheme.css';
import countrySearch from './fetchCountries';
import manyCountry from './templates/manyCountry.hbs';
import oneCountry from './templates/oneCountry.hbs';
const { error } = require('@pnotify/core');
var debounce = require('lodash.debounce');



const input = document.querySelector('input');
const section = document.querySelector('section');


input.addEventListener('input', debounce(onInput, 500));

function onInput(event) {
    event.preventDefault();
    clearCountryList();

    const query = event.target.value;
    console.log(query);

    countrySearch.fetchCountries(query).then(data => {
if(data.length > 10) {
    error({ text: "Too many matches found. Please enter a more specific query!"});
}
else if(data.length === 1) {
    section.insertAdjacentHTML('beforeend', oneCountry(data));
    section.classList.add('main-section');
}
else if(data.length <= 10) {
    section.insertAdjacentHTML('beforeend', manyCountry(data));
    section.classList.remove('main-section');
}
    });
}

function clearCountryList() {
    section.innerHTML = '';
}