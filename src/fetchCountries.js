export function fetchCountries() {
    const url = 'https://restcountries.com/v2/all?fields=name,capital,population,flags,languages';

    return fetch(url).then(responce => responce.json());
}