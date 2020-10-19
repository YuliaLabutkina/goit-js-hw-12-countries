import { error } from './plugin-pnotify';


const fetchCountries = (searchQuery) => {
    const url = `https://restcountries.eu/rest/v2/name/${searchQuery}`

    return fetch(url).then(response => {

        if (!response.ok) {
            throw ('No such country found! Try again!')
        } 
        return response.json()
    }).catch( err => {
        new error({
            title: 'An error has occurred!',
            text: `${err}`,
            delay: 1500, 
        });
    });
}

export default fetchCountries;