export function getUser(user) {
    return { type: 'GET_USER', payload: user }
}

export function signOut(id) {
    return { type: 'SIGN_OUT', id }
}

export function getInventory(data) {
    return { type: 'GET_INVENTORY', payload: data }
}