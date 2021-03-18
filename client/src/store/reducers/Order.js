import * as actionTypes from '../actions/actionTypes'
// import searchfilter from '../../components/UI/Search/Searchfilter'

const initialState = {
    orders: [],
    isLoading: false,
    error: null,
    orderplaced:false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_ORDERS_START:
            return {
                ...state,
                isLoading: true,
            }
        case actionTypes.ORDER_PLACED_ALERT:
            return{
                ...state,
                orderplaced:false
            }
        case actionTypes.ADD_ORDERS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                orderplaced:true
            }
        case actionTypes.ADD_ORDERS_FAILED:
            return {
                ...state,
                isLoading: false,
                error: action.error
            }
        case actionTypes.FETCH_ORDERS_START:
            return {
                ...state,
                isLoading: true,
            }
        case actionTypes.FETCH_ORDERS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                orders:action.neworder
            }
        case actionTypes.FETCH_ORDERS_FAILED:
            return {
                ...state,
                isLoading: false,
                error: action.error
            }
        case "CLEAR_ALL":
            console.log("ORDERS CLEARED")
                return {
                    ...state,
                    orders: [],
                }
        default:
            return state
    }
}

export default reducer