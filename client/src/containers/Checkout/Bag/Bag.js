import React, { useEffect } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruckMoving, faGifts, faShieldVirus, faBalanceScaleRight } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import axios from 'axios'

import * as actions from '../../../store/actions/index'
import './Bag.css'

const Bag = props =>  {
    // componentDidMount() {
    //     props.onFetchBag(props.userid, props.token)
    //     this.outofstock()
    //     console.log(props.Bag)
    // }
    const {Bag} = props
    useEffect(() => {
        props.onFetchBag(props.userid, props.token)
    },[])
    useEffect(() => {
        outofstock()
    },[Bag])
    const redirectToProductHandler = id => {
        props.history.push('/shoes/' + id)
    }
    const orderClickHandler = () => {
        props.history.push('/checkout/address')
    }
    const bagRemoveHandler = (id) => {
        props.onRemoveBag(id, props.token)
        props.onpurchasable()
    }
    const moveToWishlistHandler = (id) => {
        const selectedwish = props.Bag.filter(task => task.id === id)
        const newwishlist = {
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
            user: props.userid
        }
        props.onaddWishlist(newwishlist, props.token)
        props.onRemoveBag(id, props.token)
        props.onpurchasable()
    }
    const outofstock = () => {
        props.Bag.map(product => axios.get(process.env.REACT_APP_BACKEND_URL + '/shoes/' + product.shoeid)
            .then(response => {
                if (product.size === 7) {if (response.data.product.stockseven === 0 && product.available) {props.onoutofstock(product.id,false)}}
                if (product.size === 8) { if (response.data.product.stockeight === 0 && product.available) {props.onoutofstock(product.id,false)}}
                if (product.size === 9) { if (response.data.product.stocknine === 0 && product.available) {props.onoutofstock(product.id,false)}}
                if (product.size === 11) { if (response.data.product.stockeleven === 0 && product.available) {props.onoutofstock(product.id,false)}}
                if (product.size === 10) {if (response.data.product.stockten === 0 && product.available) {props.onoutofstock(product.id,false)}}
            })
            .catch(error => { console.log(error) })
        )
    }
        let totaloriginalprice = 0
        let totaldiscountedprice = 0
        let totaldiscountoffer = 0
        props.Bag.forEach((val, i, self) => {
            totaloriginalprice = totaloriginalprice + self[i].originalprice
            totaldiscountedprice = totaldiscountedprice + self[i].discountedprice
            totaldiscountoffer = totaldiscountoffer + self[i].discountoffer
        })
        // this.outofstock()
        // console.log(props.Bag)
        return (
            <div>
                {props.Bag[0] ?
                    <div>
                        {/* {this.outofstock()} */}
                        <div className="bagtoolbar">
                            <div className="bagbreadcrumbs">
                                <span style={{ color: "rgb(0,184,0)", marginRight: "4px" }}>Bag</span>
                                <span style={{ marginRight: "4px" }}>--&rarr;</span>
                                <span style={{ marginRight: "4px" }}>Address & Payment</span>
                            </div>
                            <div className="outer">
                                <div className="inner">
                                    <i className="top left"></i>
                                    <i className="top right"></i>
                                    <div className="bagsecurity">
                                        <FontAwesomeIcon icon={faShieldVirus} style={{ marginRight: "8px", color: "white" }} />100% SECURE
                                </div>
                                    <i className="bottom right"></i>
                                    <i className="bottom left"></i>
                                </div>
                            </div>
                        </div>
                        <div className="bag">
                            <div className="bagdetails">
                                <div className="bagavailableoffers">
                                    <div><strong><FontAwesomeIcon icon={faGifts} style={{ marginRight: "8px", color: "#ff2058" }} /> Available Offers</strong></div>
                                    <p>10% Cashback upto Rs 500 on a minimum spend of Rs 1,000 with PayZapp. TCA</p>
                                </div>
                                <div className="bagfreedelivery"><FontAwesomeIcon icon={faTruckMoving} style={{ marginRight: "8px", color: "green" }} />Yay!<strong>Free Delivery</strong> on this order</div>
                                <div className="bagitemprice">
                                    <p>My Shopping Bag <strong>({props.Bag.length} {props.Bag.length > 1 ? "Items" : "Item"})</strong></p>
                                    <p>Total: <strong>Rs.{totaldiscountedprice}</strong></p>
                                </div>
                                {props.Bag.map(product => {
                                    console.log(product)
                                    console.log(product.available)
                                    return (
                                        <div className="bageveryproducts">
                                            <div className="bagproductdetail">
                                                <div className="bagproductimage" onClick={() => redirectToProductHandler(product.shoeid)}>
                                                    <img src={product.pic} alt="" />
                                                </div>
                                                <div className="bagparticularproductdetails">
                                                    <div className="bagnameandprice">
                                                        <div className="bagnamedessold">
                                                            <div><strong>Puma</strong></div>
                                                            <p style={{ color: "rgb(78, 75, 75)" }}>{product.description}</p>
                                                            <p style={{ color: "rgb(78, 75, 75)" }}>Sold By: {product.soldby}</p>
                                                        </div>
                                                        <div className="bagparticularprice">
                                                            <span className="bagparticulardiscountedprice">Rs.{product.discountedprice}</span>
                                                            <span className="bagparticularoriginalprice">Rs.{product.originalprice}</span> <p className="bagparticulardiscountoffer">(Rs.{product.discountoffer} OFF)</p>
                                                        </div>
                                                    </div>
                                                    <div className="bagparticularsize">Size: <strong>{product.size}</strong></div>
                                                </div>
                                            </div>
                                            <div className="bagremovewishlist">
                                                <button onClick={() => bagRemoveHandler(product.id)} className="bagremovebutton">Remove</button>
                                                <button onClick={() => moveToWishlistHandler(product.id)} className="bagwishlistbutton">Move To WishList</button>
                                            </div> 
                                            {product.available ? null:<div className="bagoutofstock">Product Went Out of stock</div>}
                                        </div>
                                    )
                                })}
                            </div>
                            <div className="bagorder">
                                <p className="bagordereachprice"><strong>PRICE DETAILS</strong></p>
                                <div className="bagordereachprice">
                                    <div>Bag Total</div>
                                    <p><strong>Rs.{totaloriginalprice}</strong></p>
                                </div>
                                <div className="bagordereachprice">
                                    <div>Bag Discount</div>
                                    <p style={{ color: "rgb(0, 184, 0)" }}><strong>- Rs.{totaldiscountoffer}</strong></p>
                                </div>
                                <div className="bagordereachprice">
                                    <div>Order Total</div>
                                    <p><strong>Rs.{totaldiscountedprice}</strong></p>
                                </div>
                                <div className="bagordereachprice">
                                    <div>Delivery Charges</div>
                                    <div>
                                        <span style={{ textDecoration: "line-through", color: "rgb(74,74,74)" }}> RS.99 </span><span style={{ color: "rgb(0, 184, 0)", marginLeft: "8px" }}> <strong>FREE</strong></span>
                                    </div>
                                </div>
                                <div className="bagordereachpricetotal">
                                    <div><strong>Total</strong></div>
                                    <p><strong>Rs.{totaldiscountedprice}</strong></p>
                                </div>
                                <button disabled={!props.purchase} onClick={() => orderClickHandler(totaloriginalprice, totaldiscountedprice, totaldiscountoffer)}>PLACE ORDER</button>
                            </div>
                        </div>
                    </div> : <div className="bagempty">
                        <FontAwesomeIcon icon={faBalanceScaleRight} style={{ marginRight: "8px", color: "#FF527B", fontSize: "10rem", fontWeight: "100" }} />
                        <p style={{ marginTop: "8px" }}><strong>Hey, It feels So light!</strong></p>
                        <p>There is Nothing in your Bag. <Link style={{ color: "#ff2058" }} to='/shoes'>Add Some Items</Link></p>
                    </div>}
            </div>
        )

}
const mapStateToProps = state => {
    return {
        Bag: state.canvas.bag,
        userid: state.auth.userid,
        isAuthenticated: state.auth.token !== null,
        token: state.auth.token,
        purchase:state.canvas.purchase
    }
}
const mapDispatchToState = dispatch => {
    return {
        onFetchBag: (userid, token) => { dispatch(actions.fetchBag(userid, token)) },
        onRemoveBag: (id, token) => { dispatch(actions.removeBag(id, token)) },
        onaddWishlist: (newwishlist, token) => { dispatch(actions.AddWishlist(newwishlist, token)) },
        onoutofstock: (id,bool) => {dispatch({ type: "OUT_OF_STOCK",id:id,bool:bool })},
        onpurchasable: () => {dispatch({ type: "ON_PURCHASABLE" })},
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToState)(Bag))
