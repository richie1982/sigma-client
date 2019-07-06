const baseUrl = 'http://localhost:3000'
const alphaUrl = 'https://www.alphavantage.co/query?'
const alphaAPIKey = 'SZ3EMK9594ZWZ6WJ'
const timeSeriesIntraDay = 'TIME_SERIES_INTRADAY'
const fxIntraDay = 'FX_INTRADAY'
const iexAPIKey =  '?token=pk_0cdead94812d4aec884c10e4cc744ddb'
const newsUrl = 'http://webhose.io/filterWebContent?token=8a523f8c-d197-449c-9d80-bcc5fb1b6924&format=json&ts=1562166299528&sort=published&q=markets%20language%3Aenglish%20site_type%3Anews%20site_category%3Afinancial_news'
const bloombergUrl ='https://bloomberg-market-and-financial-news.p.rapidapi.com/stories/list?template=CURRENCY&id=gbpusd'


export const fetchInventory = () => {
    return fetch(baseUrl + '/inventory', {
        headers: { 'Authorisation': localStorage.token }
    }).then(resp => resp.json())
}

export const logIn = async (email, password) => {
    return await fetch(baseUrl + '/log_in', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            email,
            password
        })
    }).then(resp => resp.json())
}

export const signUp = (first_name, last_name, email, password) => {
    return fetch(baseUrl + '/users', {
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

export const saveProduct = (name, ticker, email) => {
    return fetch(baseUrl + '/products', {
        method: "POST",
        headers: { "Content-Type": 'application/json' },
        body: JSON.stringify({
            name,
            ticker,
            email
        })
    }).then(resp => resp.json())
}

export const deleteProduct = (id) => {
    return fetch(baseUrl + '/delete', {
        method: "DELETE",
        headers: { 
            "Content-Type": 'application/json',
            'Authorisation': localStorage.token 
            },
        body: JSON.stringify({
            product_id: id
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
    return fetch('https://cloud.iexapis.com/stable/ref-data/symbols' + iexAPIKey)
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

export const fetchData1 = (query) => {
    return fetch('https://cloud.iexapis.com/stable/tops' + iexAPIKey + '&symbols=' + query)
    .then(resp => resp.json())
    // .then(data => console.log(data))
}

export const fetchData2 = async (query) => {
    return await fetch('https://cloud.iexapis.com/stable/stock/' + query + '/quote' + iexAPIKey)
    .then(resp => resp.json())
    // .then(data => console.log(data))
}

window.fetchData1 = fetchData1
window.fetchData2 = fetchData2
window.saveProduct = saveProduct
