import React, { Component } from 'react'
import Spinner from '../../../components/UI/LoadingIndicator/LoadingIndicator'
import classes from './Contactdata.module.css'
import Input from '../../../components/UI/Input/Input'
import { connect } from "react-redux";
import * as actions from '../../../store/actions/index'
import { withRouter } from 'react-router-dom'

class Contactdata extends Component {
    state = {
        orders: {
            name: {
                elementtype: 'input',
                elementconfig: {
                    placeholder: 'Your Name',
                    type: 'input'
                },
                value: '',
                validation: {
                    isrequired: true,
                },
                valid: true
            },
            street: {
                elementtype: 'input',
                elementconfig: {
                    placeholder: 'street',
                    type: 'input'
                },
                value: '',
                validation: {
                    isrequired: true,
                },
                valid: true
            },
            zipcode: {
                elementtype: 'input',
                elementconfig: {
                    placeholder: 'ZIP Code',
                    type: 'input'
                },
                value: '',
                validation: {
                    isrequired: true,
                    // minLength: 5,
                    // maxLength: 5,
                    // isNumeric: true
                },
                valid: true
            },
            country: {
                elementtype: 'input',
                elementconfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    isrequired: true
                },
                valid: true,
            },
            email: {
                elementtype: 'input',
                elementconfig: {
                    placeholder: 'Your Mail',
                    type: 'input'
                },
                value: '',
                validation: {
                    isrequired: true,
                    isEmail: true
                },
                valid: true
            },
        },
        paymentmethod: "Cash On Delivery",
        forminvalid: false
    }
    componentDidMount() {
        this.props.onFetchBag(this.props.userid,this.props.token)
        
    }
    paymentSelectHandler = (paymentmethod) => {
        this.setState({
            paymentmethod: paymentmethod
        })
    }
    orderplacedHandler = (totaloriginalprice,totaldiscountedprice,totaldiscountoffer) => {
        var today = new Date();
        let deliverydate = new Date(today)
        deliverydate.setDate(deliverydate.getDate() + 5)
        var dd = String(today.getDate()).padStart(2, '0');
        var dr = String(deliverydate.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var mr = String(deliverydate.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        var yyyr = deliverydate.getFullYear();
        today = dd + '/' + mm + '/' + yyyy;
        deliverydate = dr + '/' + mr + '/' + yyyr
        console.log(today,deliverydate)
        const formdata = {}
        for (let formdataidentifier in this.state.orders) {
            formdata[formdataidentifier] = this.state.orders[formdataidentifier].value
        }
        formdata.paymentmethod = this.state.paymentmethod
        const order = {
            products:this.props.Bag.map(product => {
                    return(
                        {...product}
                    )
                })  
            ,
            totaloriginalprice: totaloriginalprice,
            totaldiscountedprice: totaldiscountedprice,
            totaldiscountoffer: totaldiscountoffer,
            ordereddate: today,
            deliverydate: deliverydate,
            userdata: formdata,
            user: this.props.userid
        }
        order.products.map(p => this.props.decresesize(p.shoeid,p.size,this.props.token))
        this.props.onAddOrder(order,this.props.token)
        this.props.history.push('/')
        this.props.Bag.map(b=> this.props.onClearBag(b.id,this.props.token))
    }

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }

        if (rules.isrequired) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    inputchangeHandler = (event, inputidentifier) => {
        const updatedformorders = {
            ...this.state.orders
        }
        const updatedformelements = {
            ...updatedformorders[inputidentifier]
        }
        updatedformelements.value = event.target.value
        updatedformelements.valid = this.checkValidity(updatedformelements.value, updatedformelements.validation)
        updatedformorders[inputidentifier] = updatedformelements
        let formvalidation = true
        for (let inputidentifier in updatedformorders) {
            formvalidation = updatedformorders[inputidentifier].valid && formvalidation
        }
        this.setState({ orders: updatedformorders, forminvalid: formvalidation })
    }

    render() {
        let totaloriginalprice = 0
        let totaldiscountedprice = 0
        let totaldiscountoffer = 0
        this.props.Bag.forEach((val, i, self) => {
            totaloriginalprice = totaloriginalprice + self[i].originalprice
            totaldiscountedprice = totaldiscountedprice + self[i].discountedprice
            totaldiscountoffer = totaldiscountoffer + self[i].discountoffer
        })
        let formelementarray = [];
        for (let key in this.state.orders) {
            formelementarray.push({
                id: key,
                config: this.state.orders[key]
            })
        }
        let form = <div>
            <form>
                {formelementarray.map(formelement => (
                    <Input key={formelement.id}
                        shouldvalidate={formelement.config.validation}
                        validity={formelement.config.valid}
                        changd={(event) => this.inputchangeHandler(event, formelement.id)}
                        label={formelement.id}
                        elementtype={formelement.config.elementtype}
                        elementconfig={formelement.config.elementconfig}
                        value={formelement.config.value} />
                ))}
            </form>
        </div>
        if (this.props.loading) {
            form = <Spinner />
        }
        return (
            <div>
                <div className={classes.addressbreadcrumbs}>
                    <span style={{  marginRight: "4px" }}>Bag</span>
                    <span style={{ marginRight: "4px" }}>--&rarr;</span>
                    <span style={{ color: "rgb(0,184,0)",marginRight: "4px" }}>Address & Payment</span>
                </div>
                <div className={classes.address}>
                    <div className={classes.useraddress}>
                        <div className={classes.Contactdata}>
                            <div style={{width: "100%", textAlign:"center"}}>
                                <h5>Enter Delivery Details Here</h5>
                            </div>
                            {form}
                            <div className={classes.payment}>
                                <button onClick={() => this.paymentSelectHandler("Net Banking")} className={classes.paymentbutton}>Net Banking</button>
                                <button onClick={() => this.paymentSelectHandler("Debit Card")} className={classes.paymentbutton}>Debit Card</button>
                                <button onClick={() => this.paymentSelectHandler("Credit Card")} className={classes.paymentbutton}>Credit Card</button>
                                <button onClick={() => this.paymentSelectHandler("Cash on Delivery")} className={classes.paymentbutton}>Cash on Delivery</button>
                            </div>
                        </div>
                    </div>
                    <div className={classes.addressorder}>
                        <p className={classes.addressordertotal}><strong>PRICE DETAILS</strong></p>
                        <div className={classes.addressordertotal}>
                            <div>Bag Total</div>
                            <p><strong>Rs.{totaloriginalprice}</strong></p>
                        </div>
                        <div className={classes.addressordertotal}>
                            <div>Bag Discount</div>
                            <p style={{ color: "rgb(0, 184, 0)" }}><strong>- Rs.{totaldiscountoffer}</strong></p>
                        </div>
                        <div className={classes.addressordertotal}>
                            <div>Order Total</div>
                            <p><strong>Rs.{totaldiscountedprice}</strong></p>
                        </div>
                        <div className={classes.addressordertotal}>
                            <div>Delivery Charges</div>
                            <div>
                                <span style={{ textDecoration: "line-through", color: "rgb(74,74,74)" }}> RS.99 </span><span style={{ color: "rgb(0, 184, 0)", marginLeft: "8px" }}> <strong>FREE</strong></span>
                            </div>
                        </div>
                        <div className={classes.addressordertotalprice}>
                            <div><strong>Total</strong></div>
                            <p><strong>Rs.{totaldiscountedprice}</strong></p>
                        </div>
                        <button disabled={!this.state.forminvalid} onClick={()=>this.orderplacedHandler(totaloriginalprice,totaldiscountedprice,totaldiscountoffer)}>PROCEED TO CHECKOUT</button>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return ({
        Bag: state.canvas.bag,
        userid: state.auth.userid,
        isAuthenticated: state.auth.token !== null,
        token: state.auth.token
    })
}
const mapDispatchToProps = dispatch => {
    return ({
        onFetchBag: (userid,token) => { dispatch(actions.fetchBag(userid,token)) },
        onAddOrder: (neworder,token) => { dispatch(actions.addOrder(neworder,token)) },
        onClearBag: (id,token) => { dispatch(actions.removeBag(id,token)) },
        decresesize: (shoeid,shoesize,token) => { dispatch(actions.decreasestocksize(shoeid,shoesize,token)) },
        // onPurchaseStart: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
    })
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Contactdata))