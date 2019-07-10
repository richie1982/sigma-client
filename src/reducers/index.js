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
            return [...state, action.payload]
        case "REMOVE_INVENTORY":
            return state.filter(el => el.id !== action.payload.product_id)
        case 'CLEAR_INVENTORY':
            return state = []
        case 'UPDATE_DATA':
            return state.map((item) => {
                if (item.id !== action.payload.id) {
                    return item
                }
                return {...item, ...action.payload }
            })
        default:
            return state
    }
}

const companyReducer = (state = [], action) => {
    switch(action.type) {
        case "GET_COMPANIES":
            return [...state, ...action.payload]
        case 'CLEAR_COMPANIES':
            return state = []
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
        case 'CLEAR_PRODUCT_DATA':
            return state = null
        default:
            return state
    }
}

const newsDataReducer = (state = [], action) => {
    switch(action.type) {
        case 'GET_NEWS':
            return [...state, ...action.payload]
        case 'CLEAR_NEWS':
            return state = []
        default:
            return state
    }
}

const selectedProductReducer = (state = null, action ) => {
    switch(action.type) {
        case 'SELECT_PRODUCT':
            return state = action.payload
        case 'CLEAR_PRODUCT':
                return state = null
        default:
            return state
    }
}

const setDailyDataReducer = (state = null, action ) => {
    switch(action.type) {
        case 'SET_DAILY':
            return state = action.payload
        case 'CLEAR_DAILY_DATA':
            return state = null
        default:
            return state
    }
}

const setWeeklyDataReducer = (state = null, action ) => {
    switch(action.type) {
        case 'SET_WEEKLY':
            return state = action.payload
        case 'CLEAR_WEEKLY_DATA':
                return state = null            
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
    newsData: newsDataReducer,
    selectedProduct: selectedProductReducer,
    dailyData: setDailyDataReducer,
    weeklyData: setWeeklyDataReducer,
})

export default rootReducer