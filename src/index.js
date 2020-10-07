import './styles.css'
import _ from 'lodash';
import error from './js/plugin-pnotify';
import ref from './js/ref';
import countryMarkup from './template/country-markup.hbs';
import fetchCountries from './js/fetchCountries';


const createCountryMarkup = (countries) => {
    const markupCountry = countries.reduce((acc, el) => acc + countryMarkup(el), '');
    ref.countryMarkupRef.insertAdjacentHTML('beforeend', markupCountry);
};


const createCountryList = (countries) => {
    const markupCountriesList = countries.reduce((acc, el) => acc + `<li>${el.name}</li>`, '');
    ref.countriesListRef.insertAdjacentHTML('beforeend', markupCountriesList);
};


const clearMarkup = () => {
    ref.countryMarkupRef.innerHTML = '';
    ref.countriesListRef.innerHTML = '';
};


const findCountry = (event) => {
    clearMarkup();
    const requestedCountry = event.target;
    if(!requestedCountry.value) return;

    fetchCountries(requestedCountry.value).then(countries => {
        if (!countries) return;

        if(countries.length === 1) {
            createCountryMarkup(countries)
            return;
        };
    
        if(countries.length <= 10) {
            createCountryList(countries);

            ref.countriesListRef.addEventListener('click', (event) => {

                fetchCountries(event.target.textContent).then(countries => {
                    clearMarkup();
                    requestedCountry.value = '';
                    createCountryMarkup(countries);
                });
            })

            return;
        };

        if(countries.length > 10) {
            new error('Too many matches found. Please a more specific query');
            return;
        }
    })
};


ref.inputCountrySearchRef.addEventListener('input', _.debounce((event) => {
    findCountry(event);
  }, 500),
);