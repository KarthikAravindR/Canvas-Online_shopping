import * as actionTypes from './actionTypes'
import axios from 'axios'

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (userId,token,email,username) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        userId: userId,
        token: token,
        email: email,
        username: username,
    }
}

export const authFailed = (error) => {
    return {
        type: actionTypes.AUTH_FAILED,
        error: error
    }
}
export const clearall = () => {
    console.log("CLEAR_ALL CALLED")
    return {
        type: "CLEAR_ALL",
    }
}

export const logout = () => {
    console.log("LOGOUT CALLED")
    console.log(process.env.REACT_APP_BACKEND_URL)
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('expirationDate')
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const authTimeOut = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
            dispatch(clearall())
        },expirationTime * 1000)
    }
}

export const auth = (email, password, isSignup, username) => {
    return dispatch => {
        dispatch(authStart())
        let url = process.env.REACT_APP_BACKEND_URL + '/auth/signup'
        let authData = {
            username: username,
            email: email,
            password: password,
        }
        if (!isSignup) {
            url = process.env.REACT_APP_BACKEND_URL + '/auth/login'
            authData = {
                email: email,
                password: password,
            }
        }
        axios.post(url, authData)
            .then(response => {
                const expirationDate = new Date(new Date().getTime() +  3600 * 1000)
                localStorage.setItem('token', response.data.token)
                localStorage.setItem('userId', response.data.userId)
                localStorage.setItem('email', response.data.email)
                localStorage.setItem('username', response.data.username)
                localStorage.setItem('expirationDate', expirationDate)
                dispatch(authSuccess(response.data.userId,response.data.token,response.data.email,response.data.username))
                dispatch(authTimeOut(3600))
            })
            .catch(error => {
                dispatch(authFailed(error.response.data.message))
            })
    }
}

export const authCheckState = () => {
    const token = localStorage.getItem('token')
    const email = localStorage.getItem('email')
    const username = localStorage.getItem('username')
    const expirationDate = new Date(localStorage.getItem('expirationDate'))
    const localId = localStorage.getItem('userId')
    return dispatch => {
        if(token === null) {
            dispatch(logout())
            dispatch(clearall())
        }else {
            if (expirationDate <= new Date()) {
                dispatch(logout())
                dispatch(clearall())
            }else {
                dispatch(authSuccess(localId, token, email, username))
                dispatch(authTimeOut((expirationDate.getTime() - new Date().getTime())/1000))
            }
        }
    }
}