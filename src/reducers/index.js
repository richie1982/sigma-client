import { combineReducers } from 'redux'

const userReducer = (state = null, action) => {
    switch(action.type) {
        case "GET_USER":
            return action.payload
        case "SIGN_OUT":
            return state.user = null
        default:
            return state
    }
}

const inventoryReducer = (state = [], action) => {
    switch(action.type) {
        case "GET_INVENTORY":
            return [...state, ...action.payload]
        case 'ADD_INVENTORY':  
            return [...state, ...action.payload] 
        case "REMOVE_INVENTORY":
            return state.filter(el => el.id !== action.id)
        default:
            return state
    }
}

const companyReducer = (state = [], action) => {
    switch(action.type) {
        case "GET_COMPANIES":
            return [...state, ...action.payload]
        default:
            return state
    }
}

const searchReducer = (state = "", action) => {
    switch(action.type) {
        case 'UPDATE_SEARCH':
            return state = action.payload
        case 'CLEAR_SEARCH':
            return state = ""
        default:
            return state
    }
}

const productDataReducer = (state = null, action) => {
    switch(action.type) {
        case 'GET_DATA':
            return state = action.payload
        default:
            return state
    }
}

const newsDataReducer = (state = [], action) => {
    switch(action.type) {
        case 'GET_NEWS':
            return [...state, ...action.payload]
        default:
            return state
    }
}

const rootReducer = combineReducers({
    user: userReducer,
    inventory: inventoryReducer,
    companies: companyReducer,
    searchTerm: searchReducer,
    productData: productDataReducer,
    newsData: newsDataReducer
})

export default rootReducer