import error from './plugin-pnotify';


const fetchCountries = (searchQuery) => {
    const url = `https://restcountries.eu/rest/v2/name/${searchQuery}`

    return fetch(url).then(response => {

        if (!response.ok) {
            throw new error('No such country found! Try again!')
        }
        return response.json()
    }).catch( err => {
        new error('No such country found! Try again!');
    });
}

export default fetchCountries;