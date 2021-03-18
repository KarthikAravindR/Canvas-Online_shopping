import * as actionTypes from './actionTypes'
import axios from 'axios'

export const AddOrderStart = () => {
    return {
        type: actionTypes.ADD_ORDERS_START,
    }
}
export const AddOrderSuccess = () => {
    return {
        type: actionTypes.ADD_ORDERS_SUCCESS,
    }
}
export const AddOrderFailed = (error) => {
    return {
        type: actionTypes.ADD_ORDERS_FAILED,
        error: error
    }
}
export const addOrder = (neworder,token) => {
    let config = {
        headers: {
            Authorization: 'Bearer '+ token,
        }
    }
    return dispatch => {
        dispatch(AddOrderStart())
        axios.post(process.env.REACT_APP_BACKEND_URL + '/checkout/myorders', neworder,config)
            .then(response => {
                dispatch(AddOrderSuccess())
                setTimeout(() => {
                    dispatch(orderPlacedAlert())
                },2000)
            })
            .catch(error => {
                dispatch(AddOrderFailed(error))
            })
    }
}
export const orderPlacedAlert = () => {
    return {
        type: actionTypes.ORDER_PLACED_ALERT,
    }
}

export const fetchOrderStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START,
    }
}
export const fetchOrderSuccess = (neworder) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        neworder: neworder
    }
}
export const fetchOrderFailed = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAILED,
        error: error
    }
}
export const fetchOrder = (userid,token) => {
    let config = {
        headers: {
            Authorization: 'Bearer '+ token,
        }
    }
    return dispatch => {
        dispatch(fetchOrderStart())
        axios.get(process.env.REACT_APP_BACKEND_URL + '/checkout/myorders/'+userid,config)
            .then(response => {
                dispatch(fetchOrderSuccess(response.data.order))
            })
            .catch(error => {
                dispatch(fetchOrderFailed(error))
            })
    }
}