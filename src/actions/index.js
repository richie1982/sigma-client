export function getUser(user) {
    return { type: 'GET_USER', payload: user }
}

export function signOut() {
    return { type: 'SIGN_OUT' }
}

export function getInventory(data) {
    return { type: 'GET_INVENTORY', payload: data }
}

export function addInventory(product) {
    return { type: 'ADD_INVENTORY', payload: product }
}

export function removeInventory(product) {
    return { type: 'REMOVE_INVENTORY', payload: product }
}

export function clearInventory() {
    return { type: "CLEAR_INVENTORY" }
}

export function updateInventoryData(data) {
    return { type: 'UPDATE_DATA', payload: data }
}

export function getCompanies(data) {
    return { type: 'GET_COMPANIES', payload: data }
}

export function updateSearch(searchTerm) {
    return { type: 'UPDATE_SEARCH', payload: searchTerm }
}

export function clearSearch() {
    return { type: 'CLEAR_SEARCH' }
}

export function filterCompanies(searchTerm) {
    return {type: 'FILTER_COMPANIES', payload: searchTerm }
}

export function getProductData(data) {
    return { type: 'GET_DATA', payload: data }
}

export function selectProduct(product) {
    return { type: 'SELECT_PRODUCT', payload: product }
}

export function getNews(data) {
    const filteredNews = data.reduce((unique, item) => unique.includes(item) ? unique : [...unique, item], [])
    return { type: 'GET_NEWS', payload: filteredNews }
}

export function setDailyData(data) {
    return { type: 'SET_DAILY', payload: data }
}

export function setWeeklyData(data) {
    return { type: 'SET_WEEKLY', payload: data }
}

