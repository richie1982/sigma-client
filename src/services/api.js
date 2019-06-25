const baseUrl = 'http://localhost:3000'

export const fetchInventory = () => {
    return fetch(baseUrl + '/inventory', {
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