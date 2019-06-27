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