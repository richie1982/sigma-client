import { combineReducers } from 'redux'

const userReducer = (state = null, action) => {
    switch(action.type) {
        case "GET_USER":
            return action.payload
        default:
            return state
    }
}

const inventoryReducer = (state = [], action) => {
    switch(action.type) {
        case "GET_INVENTORY":
            return [...state, ...action.payload]
        default:
            return state
    }
}

const rootReducer = combineReducers({
    user: userReducer,
    inventory: inventoryReducer
})

export default rootReducer