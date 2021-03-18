import * as actionTypes from './actionTypes'
import axios from 'axios'

export const fetchshoesStart = () => {
    return {
        type: actionTypes.FETCH_SHOES_START
    }
}
export const fetchshoesSuccess = (updatedshoes) => {
    return {
        type: actionTypes.FETCH_SHOES_SUCCESS,
        shoes: updatedshoes
    }
}
export const fetchshoesFailed = (error) => {
    return {
        type: actionTypes.FETCH_SHOES_FAILED,
        error: error
    }
}
export const shoes = (token, userId) => {
    return dispatch => {
        dispatch(fetchshoesStart())
        // const queryparams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"'
        axios.get(process.env.REACT_APP_BACKEND_URL + '/shoes')
            .then(response => {
                dispatch(fetchshoesSuccess(response.data.shoe))
            })
            .catch(error => {
                dispatch(fetchshoesFailed(error))
            })
    }
}
// export const decreasestocksizestart = () => {
//     return {
//         type: actionTypes.ADD_ORDERS_START,
//     }
// }
// export const decreasestocksizeSuccess = () => {
//     return {
//         type: actionTypes.ADD_ORDERS_SUCCESS,
//     }
// }
// export const decreasestocksizeFailed = (error) => {
//     return {
//         type: actionTypes.ADD_ORDERS_FAILED,
//         error: error
//     }
// }
export const decreasestocksize = (shoeid,shoesize,token) => {
    let config = {
        headers: {
            Authorization: 'Bearer '+ token,
        }
    }
    return dispatch => {
        dispatch(fetchshoesStart())
        axios.patch(process.env.REACT_APP_BACKEND_URL + '/shoes/stocksize/' + shoeid, {shoesize:shoesize},config)
            .then(response => {
                console.log(response)
                dispatch(fetchshoesSuccess(response.data.shoe))
            })
            .catch(error => {
                // dispatch(decreasestocksizeFailed())
                dispatch(fetchshoesFailed(error))
            })
    }
}

export const fetchParticularShoeStart = () => {
    return {
        type: actionTypes.FETCH_PARTICULAR_SHOE_START
    }
}
export const fetchParticularShoekSuccess = (data) => {
    return {
        type: actionTypes.FETCH_PARTICULAR_SHOE_SUCCESS,
        data: data
    }
}
export const fetchParticularShoeFailed = (error) => {
    return {
        type: actionTypes.FETCH_PARTICULAR_SHOE_FAILED,
        error: error
    }
}
export const fetchParticularShoe = (id) => {
    return dispatch => {
        dispatch(fetchParticularShoeStart())
        axios.get(process.env.REACT_APP_BACKEND_URL + '/shoes/' + id)
            .then(response => {
                dispatch(fetchParticularShoekSuccess(response.data.product))
            })
            .catch(error => {
                dispatch(fetchParticularShoeFailed(error))
            })
    }
}

export const AddBagStart = () => {
    return {
        type: actionTypes.ON_ADD_BAG_START,
    }
}
export const AddBagSucces = (orderID,newbag) => {
    return {
        type: actionTypes.ON_ADD_BAG_SUCCESS,
        orderID:orderID,
        newbag:newbag
    }
}
export const AddBagFailed = (error) => {
    return {
        type: actionTypes.ON_ADD_BAG_FAILED,
        error: error
    }
}
export const AddBag = (newbag,token) => {
    let config = {
        headers: {
            authorization: 'Bearer '+ token,
        }
    }
    return dispatch => {
        dispatch(AddBagStart())
        axios.post(process.env.REACT_APP_BACKEND_URL + '/checkout/bag', newbag,config)
            .then(response => {
                dispatch(AddBagSucces(response.data.bag._id,newbag))
                setTimeout(() => {
                    dispatch(deleteTaskAlert())
                }, 2000)
            })
            .catch(error => {
                dispatch(AddBagFailed(error))
            })
    }
}
export const deleteTaskAlert = () => {
    return {
        type: actionTypes.DELETE_TASK_ALERT,
    }
}
export const fetchBagStart = () => {
    return {
        type: actionTypes.ON_FETCH_BAG_START,
    }
}
export const fetchBagSucces = (newbag) => {
    return {
        type: actionTypes.ON_FETCH_BAG_SUCCESS,
        newbag: newbag
    }
}
export const fetchBagFailed = (error) => {
    return {
        type: actionTypes.ON_FETCH_BAG_FAILED,
        error: error
    }
}
export const fetchBag = (userid,token) => {
    let config = {
        headers: {
            Authorization: 'Bearer '+ token,
        }
    }
    return dispatch => {
        dispatch(fetchBagStart())
        axios.get(process.env.REACT_APP_BACKEND_URL + '/checkout/bag/' + userid,config)
            .then(response => {
                // console.log(response.data.bag)
                dispatch(fetchBagSucces(response.data.bag))
            })
            .catch(error => {
                dispatch(fetchBagFailed(error))
            })
    }
}
export const removeBagStart = () => {
    return {
        type: actionTypes.REMOVE_BAG_START,
    }
}
export const removeBagSucces = (id) => {
    return {
        type: actionTypes.REMOVE_BAG_SUCCESS,
        id: id
    }
}
export const removeBagFailed = (error) => {
    return {
        type: actionTypes.REMOVE_BAG_FAILED,
        error: error
    }
}
export const removeBag = (id,token) => {
    let config = {
        headers: {
            Authorization: 'Bearer '+ token,
        }
    }
    return dispatch => {
        dispatch(removeBagStart())
        axios.delete(`${process.env.REACT_APP_BACKEND_URL}/checkout/bag/${id}`,config)
            .then(response => {
                dispatch(removeBagSucces(id))
            })
            .catch(error => {
                dispatch(removeBagFailed(error))
            })
    }
}

export const AddWishlistStart = () => {
    return {
        type: actionTypes.ON_ADD_WISHLIST_START,
    }
}
export const AddWishlistSucces = (id,newwishlist) => {
    return {
        type: actionTypes.ON_ADD_WISHLIST_SUCCESS,
        id:id,
        newwishlist:newwishlist
    }
}
export const AddWishlistFailed = (error) => {
    return {
        type: actionTypes.ON_ADD_WISHLIST_FAILED,
        error: error
    }
}
export const AddWishlist = (newwishlist,token) => {
    let config = {
        headers: {
            Authorization: 'Bearer '+ token,
        }
    }
    return dispatch => {
        dispatch(AddWishlistStart())
        axios.post(process.env.REACT_APP_BACKEND_URL + '/checkout/wishlist', newwishlist,config)
            .then(response => {
                console.log(response)
                dispatch(AddWishlistSucces(response.data.wishlist._id,newwishlist))
                setTimeout(() => {
                    dispatch(AddWishlistAlert())
                }, 2000)
            })
            .catch(error => {
                dispatch(AddWishlistFailed(error))
            })
    }
}
export const AddWishlistAlert = () => {
    return {
        type: actionTypes.ADD_WISHLIST_ALERT,
    }
}
export const fetchWishlistStart = () => {
    return {
        type: actionTypes.ON_FETCH_WISHLIST_START,
    }
}
export const fetchWishlistSucces = (newwishlist) => {
    return {
        type: actionTypes.ON_FETCH_WISHLIST_SUCCESS,
        newwishlist: newwishlist
    }
}
export const fetchWishlistFailed = (error) => {
    return {
        type: actionTypes.ON_FETCH_WISHLIST_FAILED,
        error: error
    }
}
export const fetchWishlist = (userid,token) => {
    let config = {
        headers: {
            Authorization: 'Bearer '+ token,
        }
    }
    return dispatch => {
        dispatch(fetchWishlistStart())
        axios.get(process.env.REACT_APP_BACKEND_URL + '/checkout/wishlist/' + userid,config)
            .then(response => {
                dispatch(fetchWishlistSucces(response.data.wishlist))
            })
            .catch(error => {
                dispatch(fetchWishlistFailed(error))
            })
    }
}
export const removeWishlistStart = () => {
    return {
        type: actionTypes.REMOVE_WISHLIST_START,
    }
}
export const removeWishlistSucces = (id) => {
    return {
        type: actionTypes.REMOVE_WISHLIST_SUCCESS,
        id: id
    }
}
export const removeWishlistFailed = (error) => {
    return {
        type: actionTypes.REMOVE_WISHLIST_FAILED,
        error: error
    }
}
export const removeWishlist = (id,token) => {
    let config = {
        headers: {
            Authorization: 'Bearer '+ token,
        }
    }
    return dispatch => {
        dispatch(removeWishlistStart())
        axios.delete(`${process.env.REACT_APP_BACKEND_URL}/checkout/wishlist/${id}`,config)
            .then(response => {
                dispatch(removeWishlistSucces(id))
            })
            .catch(error => {
                dispatch(removeWishlistFailed(error))
            })
    }
}
export const changeRating = (rating,shoeid,token) => {
    let config = {
        headers: {
            Authorization: 'Bearer '+ token,
        }
    }
    return dispatch => {
        axios.patch(`${process.env.REACT_APP_BACKEND_URL}/shoes/rating/${shoeid}`, {rating:rating},config)
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
    }
}

