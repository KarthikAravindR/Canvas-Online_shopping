import React, { Component } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faShoppingBag, faTruck, faStream } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux'

import Modal from '../UI/Modal/Modal'
import Picturemodal from '../UI/Picturemodal/Picturemodal'
import Carousel from './mobilecarousel/mobilecarousel'
import * as actions from '../../store/actions/index'
import './fullproduct.css';

class Fullproduct extends Component {
    componentDidMount() {
        // console.log(this.props);
        if (this.props.match.params.id) {
            if (!this.props.loadedPost || (this.props.loadedPost && this.props.loadedPost.id !== +this.props.match.params.id)) {
                this.props.onFetchParticularShoe(this.props.match.params.id)
            }
        }
    }
    deliveryChangeHandler = () => {
        this.props.ondeliverCheck()
    }
    sizechangeHandler = (size) => {
        this.props.onUpdateSize(size)
        
    }
    modalShowHandler = () => {
        this.props.onModalShow()
    }
    modalclosehandler = () => {
        this.props.onModalClose()
    }
    addToBagHandler = () => {
        const newbag = {
            pic: this.props.loadedPost.pic1,
            available: true,
            name: this.props.loadedPost.name,
            description: this.props.loadedPost.description,
            color: this.props.loadedPost.color,
            soldby: this.props.loadedPost.soldby,
            size: this.props.size,
            originalprice: this.props.loadedPost.originalprice,
            discountedprice: this.props.loadedPost.discountedprice,
            discountoffer: this.props.loadedPost.discountoffer,
            shoeid: this.props.loadedPost.id,
            user: this.props.userid
        }
        this.props.onaddBag(newbag,this.props.token)
    }
    addToWishlistHandler = () => {
        const newwishlist = {
            pic: this.props.loadedPost.pic1,
            name: this.props.loadedPost.name,
            description: this.props.loadedPost.description,
            color: this.props.loadedPost.color,
            soldby: this.props.loadedPost.soldby,
            size: this.props.size,
            originalprice: this.props.loadedPost.originalprice,
            discountedprice: this.props.loadedPost.discountedprice,
            discountoffer: this.props.loadedPost.discountoffer,
            shoeid: this.props.loadedPost.id,
            user: this.props.userid
        }
        this.props.onaddWishlist(newwishlist,this.props.token)
    }
    pictureModalHandler = (pic) => {
        this.props.onPictureModal(pic)
    }
    redirecttoauthenticate = () => {
        this.props.history.push('/auth')
    }
    render() {
        let fullproduct = null
        let stockavailable = [20,5,15,2,55,25,0,29,7]        
        if(this.props.loadedPost){
            stockavailable = [this.props.loadedPost.stockseven,this.props.loadedPost.stockeight,this.props.loadedPost.stocknine,this.props.loadedPost.stockten,this.props.loadedPost.stockeleven]
            console.log(stockavailable)
        }
        if (this.props.loadedPost) {
            fullproduct = (
                <div className="singleproduct">
                    <div className="allfiveimages">
                        <div className="allfiveimagesbox" onClick={() => this.pictureModalHandler(this.props.loadedPost.pic1)}><img src={this.props.loadedPost.pic1} alt={this.props.loadedPost.id} /></div>
                        <div className="allfiveimagesbox" onClick={() => this.pictureModalHandler(this.props.loadedPost.pic2)}><img src={this.props.loadedPost.pic2} alt={this.props.loadedPost.id} /></div>
                        <div className="allfiveimagesbox" onClick={() => this.pictureModalHandler(this.props.loadedPost.pic3)}><img src={this.props.loadedPost.pic3} alt={this.props.loadedPost.id} /></div>
                        <div className="allfiveimagesbox" onClick={() => this.pictureModalHandler(this.props.loadedPost.pic4)}><img src={this.props.loadedPost.pic4} alt={this.props.loadedPost.id} /></div>
                        <div className="allfiveimagesbox" onClick={() => this.pictureModalHandler(this.props.loadedPost.pic5)}><img src={this.props.loadedPost.pic5} alt={this.props.loadedPost.id} /></div>
                        <div className="allfiveimagesbox" onClick={() => this.pictureModalHandler(this.props.loadedPost.pic1)}><img src={this.props.loadedPost.pic1} alt={this.props.loadedPost.id} /></div>
                    </div>
                    <div className="fullproductcarousel">
                        <Carousel 
                            pic1={this.props.loadedPost.pic1}
                            pic2={this.props.loadedPost.pic2}
                            pic3={this.props.loadedPost.pic3}
                            pic4={this.props.loadedPost.pic4}
                            pic5={this.props.loadedPost.pic5}
                            rootwidth={1000}
                            imgwidth={400}
                            height={455}/>
                    </div>
                    <div className="allproductdetails">
                        <div className="allshoetitle">
                            <p>{this.props.loadedPost.name}</p>
                            <div className="shoerating">
                                {this.props.loadedPost.rated > 0 ? <div><span className="star2">&#9733;</span>
                                {this.props.loadedPost.rating}
                                <span className="shoerated">({this.props.loadedPost.rated})</span></div>:<div className="allnotrated">Not Yet Rated</div>}</div>
                            </div>
                        <p className="allshoedescription">{this.props.loadedPost.description}</p>
                        <div className="alleveryprice">
                            <span className="alldiscountedprice"> Rs.{this.props.loadedPost.discountedprice} </span>
                            <span className="alloriginalprice">  Rs.{this.props.loadedPost.originalprice}  </span>
                            <span className="alldiscountoffer"> (Rs.{this.props.loadedPost.discountoffer} OFF) </span>
                        </div>
                        <p className="alltaxes">inclusive all taxes</p>
                        {this.props.isAuthenticated && <div className="allsize">
                            <p>SELECT SIZES(UK Size)</p>
                            <button onClick={this.modalShowHandler}>Size chart &rarr;</button>
                        </div>}
                        {/* <div className="allsizepopup">
                        </div> */}
                        {this.props.isAuthenticated && <div className="allsizenumber">
                            <div className="buttonwrap">
                                <button 
                                    disabled={stockavailable[0] === 0} 
                                    className="allsizenumberbutton" 
                                    onClick={() => this.sizechangeHandler(7)}>7
                                    {stockavailable[0] === 0 ? <span class="size-buttons-size-strike-show"></span>:null}
                                </button>
                                {(stockavailable[0] > 0 && stockavailable[0] < 11) && <span class="size-buttons-inventory-left" style={{bottom: "-1px"}}>{stockavailable[0]} left</span>}
                            </div>
                            <div className="buttonwrap">
                                <button 
                                    disabled={stockavailable[1] === 0} 
                                    className="allsizenumberbutton" 
                                    onClick={() => this.sizechangeHandler(8)}>8
                                    {stockavailable[1] < 0 ? <span class="size-buttons-size-strike-show"></span>:null}
                                </button>
                                {(stockavailable[1] > 0 && stockavailable[1] < 11) && <span class="size-buttons-inventory-left" style={{bottom: "-1px"}}>{stockavailable[1]} left</span>}
                            </div>
                            <div className="buttonwrap">
                                <button 
                                    disabled={stockavailable[2] === 0} 
                                    className="allsizenumberbutton" 
                                    onClick={() => this.sizechangeHandler(9)}>9
                                    {stockavailable[2] === 0 ? <span class="size-buttons-size-strike-show"></span>:null}
                                </button>
                                {(stockavailable[2] > 0 && stockavailable[2] < 11) && <span class="size-buttons-inventory-left" style={{bottom: "-1px"}}>{stockavailable[2]}  left</span>}
                            </div>
                            <div className="buttonwrap">
                                <button 
                                    disabled={stockavailable[3] === 0} 
                                    className="allsizenumberbutton" 
                                    onClick={() => this.sizechangeHandler(10)}>10
                                    {stockavailable[3] === 0 ? <span class="size-buttons-size-strike-show"></span>:null}
                                </button>
                                {(stockavailable[3] > 0 && stockavailable[3] < 11) && <span class="size-buttons-inventory-left" style={{bottom: "-1px"}}>{stockavailable[3]} left</span>}
                            </div>
                            <div className="buttonwrap">
                                <button 
                                    disabled={stockavailable[4] === 0} 
                                    className="allsizenumberbutton" 
                                    onClick={() => this.sizechangeHandler(11)}>11
                                    {stockavailable[4] === 0 ? <span class="size-buttons-size-strike-show"></span>:null}
                                </button>
                                {(stockavailable[4] > 0 && stockavailable[4] < 11) && <span class="size-buttons-inventory-left" style={{bottom: "-1px"}}>{stockavailable[4]} left</span>}
                            </div>
                            {/* <div className="buttonwrap">
                                <button 
                                    disabled={stockavailable[5] === 0} 
                                    className="allsizenumberbutton" 
                                    onClick={() => this.sizechangeHandler(8)}>8
                                    {stockavailable[5] === 0 ? <span class="size-buttons-size-strike-show"></span>:null}
                                </button>
                                {stockavailable[5] < 11 && <span class="size-buttons-inventory-left" style={{bottom: "-1px"}}>{stockavailable[5]} left</span>}
                            </div>
                            <div className="buttonwrap">
                                <button 
                                    disabled={stockavailable[6] === 0} 
                                    className="allsizenumberbutton" 
                                    onClick={() => this.sizechangeHandler(9)}>9
                                    {stockavailable[6] === 0 ? <span class="size-buttons-size-strike-show"></span>:null}
                                </button>
                                {stockavailable[6] < 11 && <span class="size-buttons-inventory-left" style={{bottom: "-1px"}}>{stockavailable[6]} left</span>}
                            </div>
                            <div className="buttonwrap">
                                <button 
                                    disabled={stockavailable[7] === 0} 
                                    className="allsizenumberbutton" 
                                    onClick={() => this.sizechangeHandler(10)}>10
                                    {stockavailable[7] === 0 ? <span class="size-buttons-size-strike-show"></span>:null}
                                </button>
                                {stockavailable[7] < 11 && <span class="size-buttons-inventory-left" style={{bottom: "-1px"}}>{stockavailable[7]} left</span>}
                            </div>
                            <div className="buttonwrap">
                                <button 
                                    disabled={stockavailable[8] === 0} 
                                    className="allsizenumberbutton" 
                                    onClick={() => this.sizechangeHandler(11)}>11
                                    {stockavailable[8] === 0 ? <span class="size-buttons-size-strike-show"></span>:null}
                                </button>
                                {stockavailable[8] < 11 && <span class="size-buttons-inventory-left" style={{bottom: "-1px"}}>{stockavailable[8]} left</span>}
                            </div> */}
                        </div>}
                        <div className="allusercontrols">
                            {this.props.isAuthenticated?<div>
                                <button disabled={!this.props.size} onClick={this.addToBagHandler} className="alladdbag"><FontAwesomeIcon icon={faShoppingBag} style={{ marginRight: "8px" }} /> Add To Bag</button>
                                <button disabled={!this.props.size} onClick={this.addToWishlistHandler} className="allwishlist"><FontAwesomeIcon icon={faHeart} style={{ marginRight: "8px" }} /> WishList</button>
                            </div>
                            :<button onClick={this.redirecttoauthenticate} className="alladdbag1">Login/Signup</button>}
                        </div>
                        <div className="alldeliveryoption">
                            <p>DELIVERY OPTIONS <FontAwesomeIcon icon={faTruck} style={{ marginLeft: "8px" }} /></p>
                            <div className="alldeliverycheck">
                                <input type="number" placeholder="Enter pincode" value={this.props.pincode} onChange={event => this.props.onPincode(event.target.value)} />
                                <button disabled={!this.props.pincode} onClick={this.deliveryChangeHandler}>Check</button>
                            </div>
                            {!this.props.deliverycheck ? <p className="allavilability">Please enter PIN code to check Delivery Availability</p>
                                : <p className="alltaxes">Yay! We Deliver to this pincode</p>}
                        </div>
                        <div className="alldefaultdetails">
                            <p>100% Original Products</p>
                            <p>Free Delivery on order above Rs. 799</p>
                            <p>Pay on delivery might be available</p>
                            <p>Easy 30 days returns and exchanges</p>
                            <p>Try & Buy might be available</p>
                        </div>
                        <div className="alleveryproductdetails">
                            <p className="alldefaultproductdetails">PRODUCT DETAILS <FontAwesomeIcon icon={faStream} style={{ marginLeft: "8px" }} /></p>
                            <p className="alldefaultdesigndetails">Design Details :</p>
                            <p>{this.props.loadedPost.productdetail1}</p>
                            <p>{this.props.loadedPost.productdetail2}</p>
                            <p>{this.props.loadedPost.productdetail3}</p>
                            <p>{this.props.loadedPost.productdetail4}</p>
                            <p>{this.props.loadedPost.productdetail5}</p>
                        </div>
                        <div >
                            <p className="alldefaultdesigndetails">Size & Fit:</p>
                            <p>{this.props.loadedPost.shoewidth}</p>
                        </div>
                        <div >
                            <p className="alldefaultdesigndetails">Material & Care:</p>
                            <p>{this.props.loadedPost.materialcare1}</p>
                            <p>{this.props.loadedPost.materialcare2}</p>
                        </div>
                        <div className="allspecification">
                            <div className="alldefaultspecification">Specifications :</div>
                            <div className="allparticularspecification">
                                <div className="allspecificationHeading">Type</div>
                                <div>{this.props.loadedPost.type}</div>
                            </div>
                            <div className="allparticularspecification">
                                <div className="allspecificationHeading">Toe Shape</div>
                                <div>{this.props.loadedPost.toeshape}</div>
                            </div>
                            <div className="allparticularspecification">
                                <div className="allspecificationHeading">Pattern</div>
                                <div>{this.props.loadedPost.pattern}</div>
                            </div>
                            <div className="allparticularspecification">
                                <div className="allspecificationHeading">Fastening</div>
                                <div>{this.props.loadedPost.fastening}</div>
                            </div>
                            <div className="allparticularspecification">
                                <div className="allspecificationHeading">Shoe Width</div>
                                <div>{this.props.loadedPost.shoewidth}</div>
                            </div>
                            <div className="allparticularspecification">
                                <div className="allspecificationHeading">Ankle Height</div>
                                <div>{this.props.loadedPost.ankleheight}</div>
                            </div>
                            <div className="allparticularspecification">
                                <div className="allspecificationHeading">Insole</div>
                                <div>{this.props.loadedPost.insole}</div>
                            </div>
                            <div className="allparticularspecification">
                                <div className="allspecificationHeading">Sole Material</div>
                                <div>{this.props.loadedPost.solematerial}</div>
                            </div>
                        </div>
                        <div>
                            <p className="alldefaultproductcodesoldby">Supplier Information</p>
                            <p>Product Code: <strong>{this.props.loadedPost.productcode}</strong></p>
                            <p>Sold By: <strong>{this.props.loadedPost.soldby}</strong></p>
                        </div>
                    </div>
                </div>
            )
        }
        return (
            <div>
                <Modal  show={this.props.modalShow}
                        modalclosed={this.modalclosehandler}/>
                <Picturemodal />
                <div>
                    {fullproduct}
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        loadedPost: state.canvas.loadedPost,
        deliverycheck: state.canvas.deliverycheck,
        pincode: state.canvas.pincode,
        size: state.canvas.size,
        modalShow: state.canvas.modalShow,
        userid: state.auth.userid,
        isAuthenticated: state.auth.token !== null,
        token: state.auth.token
    }
}
const mapDispatchToState = dispatch => {
    return {
        onFetchParticularShoe: (id) => { dispatch(actions.fetchParticularShoe(id))},
        ondeliverCheck: () => { dispatch({type:"DELIVERY_CHECK"})},
        onUpdateSize: (size) => { dispatch({type:"UPDATE_SIZE",size:size})},
        onPincode: (event) => { dispatch({type:"PINCODE",event:event})},
        onaddBag: (newbag,token) => { dispatch(actions.AddBag(newbag,token))},
        onaddWishlist: (newwishlist,token) => { dispatch(actions.AddWishlist(newwishlist,token))},
        onModalShow: () => { dispatch({type:"MODAL_SHOW"})},
        onModalClose: () => { dispatch({type:"MODAL_CLOSE"})},
        onPictureModal: (pic) => { dispatch({type:"PICTURE_MODAL_OPEN",pic:pic})},
    }
}
export default connect(mapStateToProps, mapDispatchToState)(Fullproduct)