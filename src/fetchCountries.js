 function fetchCountries(name) {
    const url = 'https://restcountries.com/v3.1/name/';
    const headers = '?fields=name,capital,population,flags,languages';
    return fetch(`${url}${name}${headers}`
    ).then(resp => { if (!resp.ok) { throw new Error(resp.statusText) } return resp.json() });
}

export { fetchCountries }