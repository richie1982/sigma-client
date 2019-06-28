export function getUser(user) {
    return { type: 'GET_USER', payload: user }
}

export function signOut() {
    return { type: 'SIGN_OUT' }
}

export function getInventory(data) {
    return { type: 'GET_INVENTORY', payload: data }
}

export function getCompanies(data) {
    return { type: 'GET_COMPANIES', payload: data }
}

export function updateSearch(searchTerm) {
    debugger
    return { type: 'UPDATE_SEARCH', payload: searchTerm }
}

export function clearSearch() {
    return { type: 'CLEAR_SEARCH' }
}

export function filterCompanies(searchTerm) {
    return {type: 'FILTER_COMPANIES', payload: searchTerm }
}