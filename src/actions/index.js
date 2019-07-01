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

export function removeInventory(id) {
    return { type: 'REMOVE_INVENTORY', id }
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

export function getData(data) {
    return { type: 'GET_DATA', payload: data }
}

export function getNews(data) {
    return { type: 'GET_NEWS', payload: data }
}