import React, { Component } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBalanceScaleRight } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux'
import { Link,withRouter } from 'react-router-dom'

import * as actions from '../../../store/actions/index'
import './Wishlist.css'

class Wishlist extends Component {
    componentDidMount() {
        this.props.onFetchWishlist(this.props.userid,this.props.token)
    }
    redirectToProductHandler = id => {
        this.props.history.push('/shoes/' + id)
    }
    removeWishlistHandler = (id) => {
        this.props.onRemoveWishlist(id,this.props.token)
    }
    moveToBagHandler = (id) => {
        const selectedwish = this.props.wishlist.filter(task => task.id === id)
        const newbag = {
            pic: selectedwish[0].pic,
            name: selectedwish[0].name,
            description: selectedwish[0].description,
            color: selectedwish[0].color,
            soldby: selectedwish[0].soldby,
            size: selectedwish[0].size,
            originalprice: selectedwish[0].originalprice,
            discountedprice: selectedwish[0].discountedprice,
            discountoffer: selectedwish[0].discountoffer,
            shoeid: selectedwish[0].shoeid,
            user: this.props.userid
        }
        this.props.onaddBag(newbag,this.props.token)
        this.props.onRemoveWishlist(id,this.props.token)
    }
    render() {
        return(
            <div>
                {this.props.wishlist[0]?
                <div className="wishistdetails">
                <p style={{color:"#ff2058",marginBottom:"16px"}}>Wishlist Items: ({this.props.wishlist.length} Items)</p>
                {this.props.wishlist.map(product => {
                    return (
                        <div className="wishisteveryproducts">
                            <div className="wishistproductdetail">
                                <div className="wishistproductimage" onClick={() => this.redirectToProductHandler(product.shoeid)}>
                                    <img src={product.pic} alt={product.id} />
                                </div>
                                <div className="wishistparticularproductdetails">
                                    <div className="wishistnameandprice">
                                        <div className="wishistnamedessold">
                                            <div><strong>Puma</strong></div>
                                            <p style={{ color: "rgb(78, 75, 75)" }}>{product.description}</p>
                                            <p style={{ color: "rgb(78, 75, 75)" }}>Sold By: {product.soldby}</p>
                                        </div>
                                        <div className="wishistparticularprice">
                                            <span className="wishistparticulardiscountedprice">Rs.{product.discountedprice}</span>
                                            <span className="wishistparticularoriginalprice">Rs.{product.originalprice}</span> <p className="wishistparticulardiscountoffer">(Rs.{product.discountoffer} OFF)</p>
                                        </div>
                                    </div>
                                    <div className="wishistparticularsize">Size: <strong>{product.size}</strong></div>
                                </div>
                            </div>
                            <div className="wishistremovewishlist">
                                <button onClick={() => this.removeWishlistHandler(product.id)} className="wishistremovebutton">Remove</button>
                                <button onClick={() => this.moveToBagHandler(product.id)} className="wishistwishlistbutton">Move To Bag</button>
                            </div>
                        </div>
                    )
                })}
            </div>:  <div className="wishlistempty">
                <FontAwesomeIcon icon={faBalanceScaleRight} style={{ marginRight: "8px", color: "#FF527B",fontSize:"10rem",fontWeight:"100" }} /> 
                <p style={{marginTop:"8px"}}><strong>Hey, It feels So light!</strong></p>   
                <p>There is Nothing in your Wishlist. <Link style={{color:"#ff2058"}} to='/shoes'>Add Some Items</Link></p>
                    </div>}
            </div>
        )
    }
}
    const mapStateToProps = state => {
        return {
            wishlist: state.canvas.wishlist,
            userid: state.auth.userid,
            isAuthenticated: state.auth.token !== null,
            token: state.auth.token
        }
    }
    const mapDispatchToState = dispatch => {
        return {
            onFetchWishlist: (userid,token) => { dispatch(actions.fetchWishlist(userid,token)) },
            onRemoveWishlist: (id,token) => { dispatch(actions.removeWishlist(id,token)) },
            onaddBag: (newbag,token) => { dispatch(actions.AddBag(newbag,token))},
        }
    }
    export default withRouter(connect(mapStateToProps, mapDispatchToState)(Wishlist))