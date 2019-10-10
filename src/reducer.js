import { combineReducers } from 'redux'

let defaultState = {
    user: null
}
function handleUser(state = defaultState, action){
    switch(action.type){
        case "SAVE USER":
            return {...state, user: action.payload}
        case "SELECTED BOOK":
            return {...state,}
        default: 
            return state
    }
}

const rootReducer = combineReducers({
    handleUser: handleUser,
})
export default rootReducer