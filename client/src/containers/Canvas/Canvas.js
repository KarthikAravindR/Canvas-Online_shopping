import React, { Component } from 'react'
// import { Route } from 'react-router-dom'

// import Toast from '../../components/UI/Toasts/Toast'
// import ProductList from '../../components/productlist/productlist'
// import Fullproduct from '../../components/fullproduct/fullproduct'
// import Toolbar from '../../components/Toolbar/Toolbar'
// import Bag from '../Checkout/Bag/Bag'
// import Wishlist from '../Checkout/Wishlist/Wishlist'
// import Contactdata from '../Checkout/Contactdata/Contactdata'
// import Checkout from '../Checkout/Checkout'
// import Auth from '../Auth/Auth'
// import Logout from '../Auth/Logout/Logout'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import './Canvas.css'

class Canvas extends Component {
    redirecttoproductsHandler = () => {
        this.props.history.push('/shoes')
    }
    nikeshoeHandler = () => {
        this.props.onnikeshoes()
        this.props.history.push('/shoes')
    }
    adidasshoeHandler = () => {
        this.props.onadidasshoes()
        this.props.history.push('/shoes')
    }
    pumashoeHandler = () => {
        this.props.onpumashoes()
        this.props.history.push('/shoes')
    }
    blueshoeHandler = () => {
        this.props.onblueshoes()
        this.props.history.push('/shoes')
    }
    redshoeHandler = () => {
        this.props.onredshoes()
        this.props.history.push('/shoes')
    }
    blackshoeHandler = () => {
        this.props.onblackshoes()
        this.props.history.push('/shoes')
    }
    render() {
        return (
            <div className="canvas">
                <div className="carouselwrap" >
                    <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                        <ol className="carousel-indicators">
                            <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                        </ol>
                        <div className="carousel-inner" onClick={this.redirecttoproductsHandler}>
                            <div className="carousel-item active" >

                                <div className="secondslidewrap">
                                    <div className="secondslidefirstwrap">
                                        <p className="secondslidefirstwrapshoes">SHOES</p>
                                        <p className="secondslidefirstwrapoff">UPTO 60% OFF</p>
                                        <p className="secondslidefirstwrapexplore">Explore</p>
                                    </div>
                                    <div className="secondslidesecondwrap">
                                        <img src="http://melanie-f.com/en/img/slipper-red.png" className="d-block w-100" alt="..." />
                                    </div>
                                </div>
                            </div>
                            <div className="carousel-item " onClick={this.redirecttoproductsHandler}>
                                {/* <img src="..." className="d-block w-100" alt="...">#FF4F58#FD6F48 */}
                                <div className="shoeimagewrap">
                                    <img src="https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2020/8/3/6be704e0-0fd0-452c-ad1e-ffa0380514b71596466463015-sports-shoe-cat-dk.jpg" className="d-block w-100" alt="..." />
                                </div>
                            </div>
                            <div className="carousel-item jumping">
                                <div className="secondsslidewrap">
                                    <div className="secondsslidefirstwrap">
                                        <p className="secondslidefirstwrapshoes">SHOES</p>
                                        <p className="secondslidefirstwrapoff">UPTO 60% OFF</p>
                                        <p className="secondslidefirstwrapexplore">Explore</p>
                                    </div>
                                    <div className="secondsslidesecondwrap">
                                        <img src="https://images.unsplash.com/photo-1542702942-01343dd60a84?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80" className="d-block w-100" alt="..." />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="sr-only">Previous</span>
                        </a>
                        <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="sr-only">Next</span>
                        </a>
                    </div>
                </div>
                <div className="Brands">
                    <p>POPULAR BRANDS</p>
                    <div className="allbrandflex">
                        <div className="eachbrandbox" onClick={this.nikeshoeHandler}>
                            <div className="eachbrandboximg"><img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80" alt="" /></div>
                            <div className="eachbrandboxname">UPTO 50% OFF</div>
                        </div>
                        <div className="eachbrandbox" onClick={this.adidasshoeHandler}>
                            <div className="eachbrandboximg"><img src="https://images.unsplash.com/photo-1525092029632-cb75fe5dd776?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80" alt="" /></div>
                            <div className="eachbrandboxname">UPTO 30% OFF</div>
                        </div>
                        <div className="eachbrandbox" onClick={this.pumashoeHandler}>
                            <div className="eachbrandboximg"><img src="https://images.pexels.com/photos/2016145/pexels-photo-2016145.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="" /></div>
                            <div className="eachbrandboxname">UPTO 40% OFF</div>
                        </div>
                    </div>
                </div>
                <div className="colors">
                    <p>The Color Pallette</p>
                    <div className="allcolorflex">
                        <div className="eachcolorbox" onClick={this.blueshoeHandler}>
                            <div className="eachcolorboximg"><img src="https://images.unsplash.com/photo-1468581264429-2548ef9eb732?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80" alt="" /></div>
                            <div className="eachcolorboxname">Scenery Blue</div>
                        </div>
                        <div className="eachcolorbox" onClick={this.redshoeHandler}>
                            <div className="eachcolorboximg"><img src="https://images.unsplash.com/photo-1444012830796-83db7e1db0d3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80" alt="" /></div>
                            <div className="eachcolorboxname">Classic Red</div>
                        </div>
                        <div className="eachcolorbox" onClick={this.blackshoeHandler}>
                            <div className="eachcolorboximg"><img src="https://images.unsplash.com/photo-1503431128871-cd250803fa41?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80" alt="" /></div>
                            <div className="eachcolorboxname">Just Black</div>
                        </div>
                    </div>
                </div>
                <footer id="globalFooter" className="global">
                    <div className="inner">
                        <div className="row spaced">
                            <div className="col contact-details">
                                <p>A fashion Store in Philadelphia<br></br>
                                    <a href="mailto:hello@griflan.com">hello@canvas.com</a> 
                                    <span className="vline-div dsk">•</span> 856.816.6159 <span className="vline-div">•</span><br></br>
                                        Philadelphia, PA
                                </p>
                            </div>
                            <div className="col social-links">
                                <ul>
                                    <li><a href="https://www.facebook.com/karthik.aravind.R/" target="_blank" rel="noopener noreferrer" className="uline">Facebook</a></li>
                                    <li>+</li>
                                    <li><a href="https://www.instagram.com/karthik_aravind_98/" target="_blank" rel="noopener noreferrer" className="uline">Instagram</a></li>
                                    <li>+</li>
                                    <li><a href="https://dribbble.com/karthikaravind" target="_blank" rel="noopener noreferrer" className="uline">Dribbble</a></li>
                                </ul>
                            </div>
                    </div>
                    <div className="legal"><p>Copyright 2020 Canvas Inc. All Rights Reserved</p></div>
                    </div>	
                </footer>
        </div>
        )
    }
}

const mapDispatchToState = dispatch => {
    return {
        onnikeshoes: () => {dispatch({ type: "NIKE_SHOES_ONLY" })},
        onadidasshoes: () => {dispatch({ type: "ADIDAS_SHOES_ONLY" })},
        onpumashoes: () => {dispatch({ type: "PUMA_SHOES_ONLY" })},
        onblueshoes: () => {dispatch({ type: "BLUE_SHOES_ONLY" })},
        onredshoes: () => {dispatch({ type: "RED_SHOES_ONLY" })},
        onblackshoes: () => {dispatch({ type: "BLACK_SHOES_ONLY" })},
    }
}
export default withRouter(connect(null, mapDispatchToState)(Canvas))