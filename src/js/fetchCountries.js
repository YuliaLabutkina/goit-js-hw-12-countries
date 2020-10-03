class FetchCountries {
    constructor(searchQuery) {
        this.url = `https://restcountries.eu/rest/v2/name/${searchQuery}`
    };
    
    makeRequest = () => {;
       return fetch(this.url).then(res => res.json()).then(countries => {
            return countries
        });
    } 
    
}

export default FetchCountries;


// const fetchCountries = (searchQuery) => {
//     const url = `https://restcountries.eu/rest/v2/name/${searchQuery}`

//     return fetch(url).then(res => res.json()).then(countries => {
//         return countries
//     });

// }