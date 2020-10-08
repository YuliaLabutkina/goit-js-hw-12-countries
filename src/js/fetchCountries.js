import { error } from './plugin-pnotify';


const fetchCountries = (searchQuery) => {
    const url = `https://restcountries.eu/rest/v2/name/${searchQuery}`

    return fetch(url).then(response => {

        if (!response.ok) {
            throw ('No such country found! Try again!')
        } 
        return response.json()
    }).catch( err => {
        new error(`An error has occurred! ${err}`);
    });
}

export default fetchCountries;