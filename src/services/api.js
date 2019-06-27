const baseUrl = 'http://localhost:3000'
const alphaUrl = 'https://www.alphavantage.co/query?'
const alphaAPIKey = 'SZ3EMK9594ZWZ6WJ'
const timeSeriesIntraDay = 'TIME_SERIES_INTRADAY'
const fxIntraDay = 'FX_INTRADAY'
const tradierUrl = "https://api.tradier.com/v1/markets/search?q=" 
const tradierIndex = "&indexes=false"
const iexAPIKey =  'pk_0cdead94812d4aec884c10e4cc744ddb'

export const fetchInventory = () => {
    return fetch(baseUrl + '/inventory', {
        headers: { 'Authorisation': localStorage.token }
    }).then(resp => resp.json())
}

export const logIn = (email, password) => {
    return fetch(baseUrl + '/log_in', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            email,
            password
        })
    }).then(resp => resp.json())
}

export const signUp = (first_name, last_name, email, password) => {
    return fetch(baseUrl + '/create', {
        method: "POST",
        headers: { "Content-Type": 'application/json' },
        body: JSON.stringify({
            first_name,
            last_name,
            email,
            password
        })
    }).then(resp => resp.json())
}

export const validate = () => {
    return fetch(baseUrl + '/validate', {
        headers: { 'Authorisation': localStorage.token }
    }).then(resp => resp.json())
}

export const fetchData = (ticker) => {
    return fetch(alphaUrl + 'function=' + timeSeriesIntraDay + '&symbol=' + ticker + '&interval=1min&apikey=' + alphaAPIKey)
        .then(resp => resp.json())
}

export const fetchCompany = () => {
    return fetch('https://cloud.iexapis.com/stable/ref-data/symbols?token=' + iexAPIKey)
    .then(resp => resp.json())
}

window.fetchCompany = fetchCompany