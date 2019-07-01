const baseUrl = 'http://localhost:3000'
const alphaUrl = 'https://www.alphavantage.co/query?'
const alphaAPIKey = 'SZ3EMK9594ZWZ6WJ'
const timeSeriesIntraDay = 'TIME_SERIES_INTRADAY'
const fxIntraDay = 'FX_INTRADAY'
const iexAPIKey =  'pk_0cdead94812d4aec884c10e4cc744ddb'
const newsUrl = "http://webhose.io/filterWebContent?token=8a523f8c-d197-449c-9d80-bcc5fb1b6924&format=json&ts=1561798808490&sort=crawled&q=markets%20language%3Aenglish%20site_type%3Anews%20site_category%3Afinancial_news"
const bloombergUrl ='https://bloomberg-market-and-financial-news.p.rapidapi.com/stories/list?template=CURRENCY&id=gbpusd'


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

export const saveProduct = (name, ticker) => {
    return fetch(baseUrl, {
        method: "POST",
        headers: { "Content-Type": 'application/json' },
        body: JSON.stringify({
            name,
            ticker
        })
    }).then(resp => resp.json)
}

export const deleteProduct = (id) => {
    return fetch(baseUrl, {
        method: "DELETE",
        headers: { "Content-Type": 'application/json' },
        body: JSON.stringify({
            id
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

export const fetchNews = () => {
    return fetch(bloombergUrl, {
        headers: { 
            "X-RapidAPI-Host": "bloomberg-market-and-financial-news.p.rapidapi.com",
            "X-RapidAPI-Key": "097defe05dmsh11f4f84d356fb00p1c87c9jsn0f2e9305339a"
        }
    }).then(resp => resp.json())
}

export const fetchNews1 = () => {
    return fetch(newsUrl)
        .then(resp => resp.json())
}

window.fetchNews1 = fetchNews1
