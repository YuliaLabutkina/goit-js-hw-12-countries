import './styles.css'
import _ from 'lodash';
import { error, success } from './js/plugin-pnotify';
import ref from './js/ref';
import countryMarkup from './template/country-markup.hbs';
import fetchCountries from './js/fetchCountries';


const createCountryMarkup = (countries) => {
    const markupCountry = countries.reduce((acc, el) => acc + countryMarkup(el), '');
    ref.countryMarkupRef.insertAdjacentHTML('beforeend', markupCountry);
    new success({
        title: 'Congratulations!',
        text: `You have found the country ${countries[0].name}!`,
        delay: 1500, 
    })
};


const createCountryList = (countries) => {
    const markupCountriesList = countries.reduce((acc, el) => acc + `<li class="country-markup__list-item">${el.name}</li>`, '');
    ref.countriesListRef.insertAdjacentHTML('beforeend', markupCountriesList);
};


const clearMarkup = () => {
    ref.countryMarkupRef.innerHTML = '';
    ref.countriesListRef.innerHTML = '';
};

const clearInput= () => {
    ref.inputCountrySearchRef.value = '';
}


const findCountry = (event) => {
    clearMarkup();
    const requestedCountry = event.target;
    if(!requestedCountry.value.trim()) return;

    fetchCountries(requestedCountry.value).then(countries => {
        if (!countries) return;

        if(countries.length === 1) {
            createCountryMarkup(countries);
            clearInput();
            return;
        };
    
        if(countries.length <= 10) {
            createCountryList(countries);

            ref.countriesListRef.addEventListener('click', (event) => {

                fetchCountries(event.target.textContent).then(countries => {
                    clearMarkup();
                    clearInput();
                    createCountryMarkup(countries);
                });
            })

            return;
        };

        if(countries.length > 10) {
            new error({
                title: 'Error!',
                text: 'Too many matches found. Please a more specific query',
                delay: 1500, 
            });
            return;
        }
    })
};


ref.inputCountrySearchRef.addEventListener('input', _.debounce((event) => {
    findCountry(event);
  }, 500),
);