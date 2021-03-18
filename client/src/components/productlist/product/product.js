import React from 'react'
import LazyLoad from 'react-lazyload'

import Carousel from '../../fullproduct/mobilecarousel/mobilecarousel'
import Spinner from '../../UI/LoadingIndicator/LoadingIndicator'
import './product.css'

const product = (props) => {
    return (
        <div className="product1" onClick={() => props.clicked(props.id)} target="_blank">
            <div className="shoeimg" >
                <LazyLoad placeholder={<Spinner />} offset={[-100, 100]}>
                    <Carousel style={{ margin: "0" }}
                        pic1={props.pic1}
                        pic2={props.pic2}
                        pic3={props.pic3}
                        pic4={props.pic4}
                        pic5={props.pic5}
                        rootwidth={227}
                        imgwidth={227}
                        height={316} /></LazyLoad>
                {/* <img src={props.pic1} alt=""/> */}
            </div>
            <div className="shoetitle">
                <div>{props.name}</div>
                {props.rating > 0
                    ? <div className="shoerating">{props.rating}<span className="star1">&#9733;</span></div>
                    : <div className="shoenotrated">Not Yet Rated</div>}
            </div>
            <p className="shoedescription">{props.description}</p>
            <div className="everyprice">
                <span className="discountedprice"> Rs.{props.discountedprice}</span>
                <span className="originalprice">  Rs.{props.originalprice}  </span>
                <span className="discountoffer"> ({props.discountoffer} OFF) </span>
            </div>
        </div>
    )
}

export default product