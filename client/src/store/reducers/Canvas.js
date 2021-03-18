import * as actionTypes from '../actions/actionTypes'
// import searchfilter from '../../components/UI/Search/Searchfilter'

const initialState = {
    shoes: [],
    isLoading: false,
    error: null,
    loadedPost: null,
    deliverycheck: false,
    pincode: null,
    size: null,
    addclass: false,
    bag: [],
    modalShow: false,
    wishlist: [],
    successfullydeleted: false,
    successfullywishlisted: false,
    loginShow: true,
    name: "",
    picturemodalshow: false,
    picture: "",
    purchase: true
}

const reducer = (state = initialState, action) => {
    // const commonvalbasedonid = (arr1, arr2) => {
    //     arr1.map( b => {
    //         return arr2.map(s => {
    //             if(b.shoeid === s.id){
    //                 if(s.stockseven < 1){
    //                     b.available = false
    //                 }
    //             }
    //             return b
    //         })
    //     })
    // }
    switch (action.type) {
        case actionTypes.FETCH_SHOES_START:
            return {
                ...state,
                isLoading: true
            }
        case actionTypes.FETCH_SHOES_SUCCESS:
            return {
                ...state,
                shoes: action.shoes,
                isLoading: false
            }
        case actionTypes.FETCH_SHOES_FAILED:
            return {
                isLoading: false,
                error: action.error
            }
        case actionTypes.FETCH_PARTICULAR_SHOE_START:
            return {
                ...state,
                isLoading: true,
            }
        case actionTypes.FETCH_PARTICULAR_SHOE_SUCCESS:
            return {
                ...state,
                loadedPost: action.data,
                isLoading: false,
            }
        case actionTypes.FETCH_PARTICULAR_SHOE_FAILED:
            return {
                ...state,
                isLoading: false,
                error: action.error
            }
        case actionTypes.ON_ADD_BAG_START:
            return {
                ...state,
                isLoading: true,
            }
        case actionTypes.DELETE_TASK_ALERT:
            return {
                ...state,
                successfullydeleted: false
            }
        case actionTypes.ON_ADD_BAG_SUCCESS:
            const newOrder = {
                ...action.newbag,
                id: action.orderID
            }
            return {
                ...state,
                isLoading: false,
                bag: state.bag.concat(newOrder),
                successfullydeleted: true
            }
        case actionTypes.ON_ADD_BAG_FAILED:
            return {
                ...state,
                isLoading: false,
                error: action.error
            }
        case actionTypes.ON_FETCH_BAG_START:
            return {
                ...state,
                isLoading: true,
            }
        case actionTypes.ON_FETCH_BAG_SUCCESS:
            
            let newbags = action.newbag.map(b => { return { ...b, available: true } })
            console.log(newbags)
            // let a = commonvalbasedonid(newbags,state.shoes)
            // console.log(a)
            // console.log(newbags)
            // console.log(state.shoes)
                return {
                    ...state,
                    isLoading: false,
                    bag: newbags
                }
            case actionTypes.ON_FETCH_BAG_FAILED:
            return {
                ...state,
                isLoading: false,
                error: action.error
            }
        case actionTypes.REMOVE_BAG_START:
            return {
                ...state,
                isLoading: true,
            }
        case actionTypes.REMOVE_BAG_SUCCESS:
            return {
                ...state,
                isLoading: false,
                bag: state.bag.filter(task => task.id !== action.id),
            }
        case actionTypes.REMOVE_BAG_FAILED:
            return {
                ...state,
                isLoading: false,
                error: action.error
            }
        case actionTypes.CLEAR_BAG_START:
            return {
                ...state,
                isLoading: true,
            }
        case actionTypes.CLEAR_BAG_SUCCESS:
            return {
                ...state,
                isLoading: false,
                bag: [],
            }
        case actionTypes.CLEAR_BAG_FAILED:
            return {
                ...state,
                isLoading: false,
                error: action.error
            }

        case actionTypes.ON_ADD_WISHLIST_START:
            return {
                ...state,
                isLoading: true,
            }
        case actionTypes.ADD_WISHLIST_ALERT:
            return {
                ...state,
                successfullywishlisted: false
            }
        case actionTypes.ON_ADD_WISHLIST_SUCCESS:
            const newOrder1 = {
                ...action.newwishlist,
                id: action.id
            }
            return {
                ...state,
                isLoading: false,
                wishlist: state.wishlist.concat(newOrder1),
                successfullywishlisted: true
            }
        case actionTypes.ON_ADD_WISHLIST_FAILED:
            return {
                ...state,
                isLoading: false,
                error: action.error
            }
        case actionTypes.ON_FETCH_WISHLIST_START:
            return {
                ...state,
                isLoading: true,
            }
        case actionTypes.ON_FETCH_WISHLIST_SUCCESS:
            return {
                ...state,
                isLoading: false,
                wishlist: action.newwishlist
            }
        case actionTypes.ON_FETCH_WISHLIST_FAILED:
            return {
                ...state,
                isLoading: false,
                error: action.error
            }
        case actionTypes.REMOVE_WISHLIST_START:
            return {
                ...state,
                isLoading: true,
            }
        case actionTypes.REMOVE_WISHLIST_SUCCESS:
            return {
                ...state,
                isLoading: false,
                wishlist: state.wishlist.filter(task => task.id !== action.id),
            }
        case actionTypes.REMOVE_WISHLIST_FAILED:
            return {
                ...state,
                isLoading: false,
                error: action.error
            }
        case "LOGIN":
            return {
                ...state,
                loginShow: false,
                name: action.name
            }
        case "LOGOUT":
            return {
                ...state,
                loginShow: true,
                name: ""
            }
        case "DELIVERY_CHECK":
            return {
                ...state,
                deliverycheck: true
            }
        case "UPDATE_SIZE":
            return {
                ...state,
                size: action.size
            }
        case "PINCODE":
            return {
                ...state,
                pincode: action.event
            }
        case "MODAL_SHOW":
            return {
                ...state,
                modalShow: true
            }
        case "MODAL_CLOSE":
            return {
                ...state,
                modalShow: false,
                picturemodalshow: false,
            }
        case "PICTURE_MODAL_OPEN":
            return {
                ...state,
                picturemodalshow: true,
                picture: action.pic
            }
        case "PICTURE_MODAL_CLOSE":
            return {
                ...state,
                picturemodalshow: false,
                picture: ""
            }
        case "CLEAR_ALL":
            console.log("CLEARED BAG AND WISHLIST")
            return {
                ...state,
                bag: [],
                wishlist: [],
                name: ""
            }
        case "OUT_OF_STOCK":
            console.log("OUT_OF_STOCK")
            let newsbag = [...state.bag]
            newsbag.map(b => {
                if(b.id === action.id){
                    b.available = action.bool
                }
            })
            console.log(newsbag)
            return {
                ...state,
                bag: newsbag,
                purchase: false
            }
        case "ON_PURCHASABLE":
            console.log("ON_PURCHASABLE")
            return {
                ...state,
                purchase: true
            }
        default:
            return state
    }
}

export default reducer