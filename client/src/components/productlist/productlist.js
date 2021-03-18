import React, { Component } from 'react'
import Product from './product/product'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { animateScroll as scroll } from "react-scroll";
import * as actions from '../../store/actions/index'
import Fullproduct from '../fullproduct/fullproduct'
import { withRouter } from 'react-router-dom'
import './productlist.css'

class Productlist extends Component {
    state={
        filtershow: false,
    }
    componentDidMount() {
        this.props.onFetchShoes()
    }
    productclickedHandler = (id) => {
        // var url = '/shoes/' + id
        this.props.history.push('/shoes/' + id);
        // var win = window.open(url, '_blank');
        // win.focus();
    }
    onBrandFilterChange(filter) {
        const { brandFilter } = this.props;
        if (brandFilter.includes(filter)) {
            const filterIndex = brandFilter.indexOf(filter);
            const newFilter = [...brandFilter];
            newFilter.splice(filterIndex, 1);
            this.props.onbrandfilter(newFilter)
        } else {
            let newnewfilter = [...brandFilter, filter]
            this.props.onbrandfilter(newnewfilter)
        }
    }
    onColorFilterChange(filter) {
        const { colorFilter } = this.props;
        if (colorFilter.includes(filter)) {
            const filterIndex = colorFilter.indexOf(filter);
            const newFilter = [...colorFilter];
            newFilter.splice(filterIndex, 1);
            this.props.oncolorfilter(newFilter)
        } else {
            let newnewfilter = [...colorFilter, filter]
            this.props.oncolorfilter(newnewfilter)
        }
    }
    onPriceFilterChange(filter) {
        const { priceFilter } = this.props;
        if (priceFilter.includes(filter)) {
            const filterIndex = priceFilter.indexOf(filter);
            const newFilter = [...priceFilter];
            newFilter.splice(filterIndex, 1);
            this.props.onpricefilter(newFilter)
        } else {
            let newnewfilter = [...priceFilter, filter]
            this.props.onpricefilter(newnewfilter)
        }
    }
    openFilterHandler = () => {
        this.setState(prevState => {
            this.setState({filtershow:!prevState.filtershow})
        })
    }
    clearallfilterHanlder = () => {
        this.props.onclearfilter()
    }
    scrollToTop1 = () => {
        scroll.scrollToTop();
    }
    render() {
        const { brandList, brandFilter, colorFilter, colorList, priceFilter, priceList } = this.props;
        let filteredbrandList;
        let filteredcolorList;
        let filteredpriceList;
        let final = []
        if (brandFilter.length === 0 || brandFilter.length === brandList.length) {
            filteredbrandList = this.props.shoes;
        } else {
            filteredbrandList = this.props.shoes.filter(item =>
                this.props.brandFilter.includes(item.name)
            );
        }
        if (colorFilter.length === 0 || colorFilter.length === colorList.length) {
            filteredcolorList = filteredbrandList;
        } else {
            filteredcolorList = filteredbrandList.filter(item =>
                this.props.colorFilter.includes(item.color)
            );
        }
        if (priceFilter.length === 0 || priceFilter.length === priceList.length) {
            filteredpriceList = filteredcolorList;
        } else { 
            let fpl = this.props.priceFilter.map(p => {
                let l = p[0]
                let h = p[1]
                return(
                    filteredcolorList.filter(item =>
                        l <= item.discountedprice && item.discountedprice <= h)
                )
            })
            fpl.map(f => final.push(...f))
            filteredpriceList = [...final]
            
            // let low = this.props.priceFilter.map(item => {
            //     return (
            //         item[0]
            //     )
            // })
            // let high = this.props.priceFilter.map(item => {
            //     return (
            //         item[1]
            //     )
            // })
            // Array.min = function (array) {
            //     return Math.min.apply(Math, array);
            // };
            // Array.max = function (array) {
            //     return Math.max.apply(Math, array);
            // };
            // low = Array.min(low)
            // high = Array.max(high)
            // //     // let low = this.state.activeFilter[0][0]
            // //     // let high = this.state.activeFilter[this.state.activeFilter.length-1][1]
            // //     // if(low >= high){
            // //     //     low = this.state.activeFilter[this.state.activeFilter.length-1][0]
            // //     //     high= this.state.activeFilter[0][1]
            // //     // }
            // filteredpriceList = filteredbrandList.filter(item =>
            //     low <= item.discountedprice && item.discountedprice <= high)
        }
        // function commonvalbasedonid(arr1, arr2) {
        //     return arr1.filter((e) => {
        //         return arr2.some((ee) => ee.id === e.id)
        //     })}
        // let a
        // if (filteredcolorList.length === 0) {
        //     a = filteredbrandList
        // } else {
        //     // a = commonvalbasedonid(filteredbrandList, filteredcolorList)
        //     a = filteredbrandList.filter(function (x) {
        //         // checking second array contains the element "x"
        //         if (filteredcolorList.indexOf(x) !== -1)
        //             return true;
        //         else
        //             return false;
        //     });
        // }
        let filteredList = filteredpriceList
        // if (filteredpriceList.length === 0  && !checked) {
        //     filteredList = a
        // } else {
        //     // filteredList = commonvalbasedonid(a,filteredpriceList)
        //     filteredList = a.filter(function (x) {
        //         // checking second array contains the element "x"
        //         if (filteredpriceList.indexOf(x) !== -1)
        //             return true;
        //         else
        //             return false;
        //     });
        // }
        return (
            <div>
                <div className="EveryProductsandfilters">
                    <div scroll="no" className="productsfilter">
                        <div className="Filterheading"><div>
                            <p>
                                <strong>FILTERS</strong>
                            </p>
                            <button className="mobilefilterbutton" onClick={this.openFilterHandler}>Apply Filter</button>
                        </div>
                            <button className="clearfilterbutton" onClick={this.clearallfilterHanlder}>Clear All</button>
                        </div>
                        <div className="allthreefilters">
                            <div className={`BrandsFilter ${this.state.filtershow?"filtershoe":""}`}>
                                <p><strong>BRANDS</strong></p>
                                {this.props.brandList.map(filter => (
                                    <div className="everyfilter" key={filter.id}>
                                        <input
                                            id={filter.id}
                                            type="checkbox"
                                            checked={brandFilter.includes(filter.value)}
                                            onChange={() => this.onBrandFilterChange(filter.value)}
                                        />
                                        <label htmlFor={filter.id}>{filter.name}</label>
                                    </div>
                                ))}
                            </div>
                            <div className={`BrandsFilter ${this.state.filtershow?"filtershoe":""}`}>
                                <p><strong>COLOR</strong></p>
                                {this.props.colorList.map(filter => (
                                    <div className="everyfilter" key={filter.id}>
                                        <input
                                            id={filter.id}
                                            type="checkbox"
                                            checked={colorFilter.includes(filter.value)}
                                            onChange={() => this.onColorFilterChange(filter.value)}
                                        />
                                        <div className={`colorindicator ${filter.value}`}></div>
                                        <label htmlFor={filter.id}>{filter.name}</label>
                                    </div>
                                ))}
                            </div>
                            <div className={`BrandsFilter ${this.state.filtershow?"filtershoe":""}`}>
                                <p><strong>PRICE</strong></p>
                                {this.props.priceList.map(filter => (
                                    <div className="everyfilter" key={filter.id}>
                                        <input
                                            id={filter.id}
                                            type="checkbox"
                                            checked={priceFilter.includes(filter.value)}
                                            onChange={() => this.onPriceFilterChange(filter.value)}
                                        />
                                        <label htmlFor={filter.id}>{filter.name}</label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="productlist1 ">
                        <div className="productlistfreeshiping">Free Shiping On Orders above Rs.1000</div>
                        {/* <a style={{display: "table-cell"}} href="/" target="_blank">text</a> */}
                        {filteredList.map((shoe) => {
                            return (
                                <Product
                                    id={shoe.id}
                                    key={shoe.id}
                                    pic1={shoe.pic1}
                                    pic2={shoe.pic2}
                                    pic3={shoe.pic3}
                                    pic4={shoe.pic4}
                                    pic5={shoe.pic5}
                                    name={shoe.name}
                                    description={shoe.description}
                                    rating={shoe.rating}
                                    originalprice={shoe.originalprice}
                                    discountedprice={shoe.discountedprice}
                                    discountoffer={shoe.discountoffer}
                                    clicked={this.productclickedHandler}
                                />)
                        })}
                        <Route path={this.props.match.url + '/:id'} exact component={Fullproduct} />
                        <div className="backtotop" onClick={this.scrollToTop1}>
                            <i class="arrow up"></i>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        shoes: state.canvas.shoes,
        brandList: state.filter.brandList,
        colorList: state.filter.colorList,
        priceList: state.filter.priceList,
        brandFilter: state.filter.brandFilter,
        colorFilter: state.filter.colorFilter,
        priceFilter: state.filter.priceFilter,
    }
}
const mapDispatchToState = dispatch => {
    return {
        onFetchShoes: () => { dispatch(actions.shoes()) },
        onbrandfilter: (data) => { dispatch({ type: "BRAND_FILTER_UPDATE", data: data }) },
        oncolorfilter: (data) => { dispatch({ type: "COLOR_FILTER_UPDATE", data: data }) },
        onpricefilter: (data) => { dispatch({ type: "PRICE_FILTER_UPDATE", data: data }) },
        onclearfilter: () => { dispatch({ type: "CLEAR_ALL_FILTER"})},
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToState)(Productlist))


// {
//     "ankleheight": 
//     "Regular",
//     "description": 
//     "Men Blue Frost Idp Sneakers",
//     "color": 
//     "Blue",
//     "discountedprice": 
//     2799,
//     "discountoffer": 
//     1200,
//     "fastening": 
//     "Lace-Ups",
//     "insole": 
//     "Comfort Insole",
//     "materialcare1": 
//     "Mesh",
//     "materialcare2": 
//     "Wipe with a clean, dry cloth to remove dust",
//     "name": 
//     "Puma",
//     "originalprice": 
//     3999,
//     "pattern": 
//     "Solid",
//     "pic1": 
//     "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/10876142/2020/3/13/654ec164-75dc-4dff-a38e-52dc59f682ee1584091387493-Puma-Men-Blue-Frost-Idp-Sneakers-991584091385222-1.jpg",
//     "pic2": 
//     "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/10876142/2020/3/13/a87008be-7356-4dee-a0be-1edede89a18a1584091387446-Puma-Men-Blue-Frost-Idp-Sneakers-991584091385222-2.jpg",
//     "pic3": 
//     "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/10876142/2020/3/13/d49d5245-8cc9-4207-8bdf-4bbbd9c2112b1584091387402-Puma-Men-Blue-Frost-Idp-Sneakers-991584091385222-3.jpg",
//     "pic4": 
//     "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/10876142/2020/3/13/cf228a39-a906-48ea-bd9b-cc71b5fba1fa1584091387353-Puma-Men-Blue-Frost-Idp-Sneakers-991584091385222-4.jpg",
//     "pic5": 
//     "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/10876142/2020/3/13/328a6a82-3653-4c3d-9b4f-be9d1ee566221584091387304-Puma-Men-Blue-Frost-Idp-Sneakers-991584091385222-5.jpg",
//     "productcode": 
//     10876142,
//     "productdetail1": 
//     "A pair of round toe blue sneakers, has regular styling, lace-up detail",
//     "productdetail2": 
//     "Mesh upper",
//     "productdetail3": 
//     "Cushioned footbed",
//     "productdetail4": 
//     "Textured and patterned outsole",
//     "productdetail5": 
//     "Warranty: 3 months",
//     "shoewidth": 
//     "Regular",
//     "soldby": 
//     "Omnitech Retail",
//     "solematerial": 
//     "Rubber",
//     "toeshape": 
//     "Round Toe",
//     "type": 
//     "Sneakers"

//     }