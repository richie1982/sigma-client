export function getUser(user) {
    return { type: 'GET_USER', payload: user }
}

export function getInventory(data) {
    return { type: 'GET_INVENTORY', payload: data }
}