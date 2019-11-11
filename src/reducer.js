import { combineReducers } from 'redux'

let defaultState = {
    user: null,
    selectedBook: null,
}
function handleUser(state = defaultState, action){
    switch(action.type){
        case "SAVE USER":
            return {...state, user: action.payload}
        case "SELECTED BOOK":
            return {...state, selectedBook: action.payload}
        default: 
            return state
    }
}

const rootReducer = combineReducers({
    handleUser: handleUser,
})
export default rootReducer