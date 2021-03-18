import * as actionTypes from '../actions/actionTypes'

const inditialState = {
    token: null,
    userid: null,
    username: null,
    email: null,
    error: null,
    loading: false
}

const reducer = (state = inditialState, action) => {
    switch(action.type) {
        case actionTypes.AUTH_START :
            return {
                ...state,
                error: null,
                loading: true
            }
        case actionTypes.AUTH_SUCCESS :
            return {
                ...state,
                // token: action.idToken,
                userid: action.userId,
                token: action.token,
                email: action.email,
                username: action.username,
                loading: false
            }
        case actionTypes.AUTH_FAILED :
            return {
                ...state,
                error: action.error,
                loading: false
            }
        case actionTypes.AUTH_LOGOUT :
            return {
                ...state,
                token: null,
                userid: null
            }
        case 'CLEAR_AUTH_ERROR' :
            return {
                ...state,
                error: null
            }
        default: 
            return state
    }
}

export default reducer