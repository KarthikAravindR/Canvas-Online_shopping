import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBalanceScaleRight } from '@fortawesome/free-solid-svg-icons';
import Rating from '../../components/UI/Rating/Rating'

import * as actions from '../../store/actions/index'
import { Link, withRouter } from 'react-router-dom'
import './Checkout.css'

class Checkout extends Component {
    state = {
        rating: 0,
    }
    componentDidMount() {
        this.props.onFetchOrders(this.props.userid, this.props.token)
    }
    setRating = rating => {
        this.setState({ rating: rating });
    };
    saveRating = (shoeid) => {
        this.props.onChangeRating(this.state.rating,shoeid,this.props.token)
    };
    render() {
        let today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = dd + '/' + mm + '/' + yyyy;
        dd = Number(dd)
        mm = Number(mm)
        yyyy = Number(yyyy)
        return (
            <div className="singleforders">
                {this.props.myorders[0] ? this.props.myorders.map(order => {
                    let dddate = Number(order.productsdetails.deliverydate.split('/')[0])
                    let ddmonth = Number(order.productsdetails.deliverydate.split('/')[1])
                    let ddyear = Number(order.productsdetails.deliverydate.split('/')[2])
                    let isDelivered = false
                    if (yyyy > ddyear) {
                        isDelivered = true
                    } else if (yyyy === ddyear) {
                        if (mm > ddmonth) {
                            isDelivered = true
                        } else if (mm === ddmonth) {
                            if (dd >= dddate) {
                                isDelivered = true
                            }
                        }
                    }
                    return (
                        <div key={order.id}>
                            <p>ORDER NO: <strong>{Math.random()}</strong></p>
                            <div className="everyforders">
                                <div className="myordersproductsandprices">
                                    <div className="myorders">
                                        {order.productsdetails.products.map(product => (
                                            <div className="myordersproductdetail_Delivered" key={product.id}>
                                                <div className="myordersproductdetail">
                                                    <div className="myordersproductimage">
                                                        <img src={product.pic} alt={product.id} />
                                                    </div>
                                                    <div className="myordersparticularproductdetails">
                                                        <div className="myordersnameandprice">
                                                            <div className="myordersnamedessold">
                                                                <div className="orderproductsname"><strong>{product.name}</strong></div>
                                                                <p className="orderproductsdescription">{product.description}</p>
                                                            </div>
                                                            <div className="myordersparticularprice">
                                                                <div className="myordersparticularsize">Size: <strong>{product.size}</strong></div>
                                                                <div className="myordersparticulardiscountedprice">Rs.{product.discountedprice}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {isDelivered && <div className="productrating">
                                                    <p>Rate The Product:</p>
                                                    <Rating
                                                        numberOfStars="5"
                                                        currentRating="0"
                                                        onClick={this.setRating}
                                                    />
                                                    <button type="submit" onClick={() => this.saveRating(product.shoeid)}>
                                                        Submit Rating
                                                    </button>
                                                </div>}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="myorderstotal">
                                        <div><strong>TOTAL:</strong></div>
                                        <div><strong>Rs.{order.productsdetails.totaldiscountedprice}</strong></div>
                                    </div>
                                </div>
                                <div className="ordersuserdata">
                                    <div>Ordered On: <strong>{order.productsdetails.ordereddate}</strong></div>
                                    <div className="allordersaddressdet">
                                        <p ><strong>Will Be Delivered To This Address :</strong></p>
                                        <div>
                                            <div>Street:{order.deliverydetails.street}</div>
                                            <div>Country:{order.deliverydetails.country}</div>
                                            <div>zipcode: {order.deliverydetails.zipcode}</div>
                                        </div>
                                    </div>
                                    <div style={{ width: "100%" }}>Paid by: {order.deliverydetails.paymentmethod}</div>
                                    <div style={{ marginTop: "8px", color: "rgb(0,184,0)" }}>{isDelivered ? <p>Delivered On <strong>{order.productsdetails.deliverydate}</strong></p> : <p>Yayyy! you Will Recieve the package by: <strong>{order.productsdetails.deliverydate}</strong></p>}</div>
                                </div>
                            </div>
                        </div>
                    )
                }) : <div className="orderempty">
                        <FontAwesomeIcon icon={faBalanceScaleRight} style={{ marginRight: "8px", color: "#FF527B", fontSize: "10rem", fontWeight: "100" }} />
                        <p style={{ marginTop: "8px" }}><strong>Hey, It feels So light!</strong></p>
                        <p>You have not Ordered yet. <Link style={{ color: "#ff2058" }} to='/shoes'>Add Some Items</Link></p>
                    </div>}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        myorders: state.order.orders,
        userid: state.auth.userid,
        isAuthenticated: state.auth.token !== null,
        token: state.auth.token
    }
}
const mapDispatchToState = dispatch => {
    return {
        onFetchOrders: (userid, token) => { dispatch(actions.fetchOrder(userid, token)) },
        onChangeRating: (rating,shoeid, token) => { dispatch(actions.changeRating(rating, shoeid, token)) },
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToState)(Checkout))
