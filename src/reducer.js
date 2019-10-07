let defaultState = {
    counter: 0,
    user: null
}
function rootReducer(state = defaultState, action){
    switch(action.type){
        case "INCREASE":
            return {...state, counter: state.counter+1}
        case "DECREASE":
            return {...state, counter: state.counter-1}
        case "SAVEUSER":
            return {...state, user: action.payload}
        default: 
            return state
    }
}



export default rootReducer