import React, { useEffect } from 'react'
// import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import { animateScroll as scroll } from "react-scroll";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoePrints, faUser, faHeart, faShoppingBag } from '@fortawesome/free-solid-svg-icons';
// import theme from 'styled-theming';
import { useTheme } from '../UI/ThemeContext';
import styled, { withTheme } from 'styled-components';
import { backgroundColor, textColor } from '../UI/theme';

import Search from '../UI/Search/Search'
import * as actions from '../../store/actions/index'
import './Toolbar.css'

const Wrapper = styled.div`background: ${backgroundColor};border: 1px solid ${backgroundColor};color: ${textColor};/* rest of properties snipped */`;
const Button = styled.button`background: ${backgroundColor};border: 1px solid ${backgroundColor};color: ${textColor};margin: 0 0 0 16px `;
const Toolbar = props => {
    const { onFetchBag, onFetchWishlist, Bag, wishlist, userid, token } = props
    useEffect(() => {
        onFetchBag(userid, token)
        onFetchWishlist(userid, token)
    }, [Bag.length, wishlist.length, userid, onFetchBag, onFetchWishlist, token])

    const themeToggle = useTheme();
    const logoutclickedHandler = () => {
        props.onLogout()
    }
    const scrollToBottom1 = () => {
        scroll.scrollToBottom();
    }
    let styletext,stylebg
    if(props.theme.mode === 'light'){styletext = {color: "black",}}else{styletext = {color: "white",}}
    if(props.theme.mode === 'light'){stylebg = {backgroundColor: "white",border:"1px solid white"}}else{stylebg = {backgroundColor: "black",border:"1px solid black"}}
    return (
            <Wrapper className="Toolbarcontainer">
                <div className="headertodo">
                    <Link to={'/'} style={styletext} className="toolbarTitle"><FontAwesomeIcon style={{ fontSize: "1.5rem" }} icon={faShoePrints} /> Canvas</Link>
                    <div className="DesktopSearch">
                        <Search /> 
                    </div>
                    {props.Bag ? <div className="profileandbag">
                        <NavLink style={styletext} activeStyle={{ color: '#ff2058' }} to={'/checkout/wishlist'}>
                            <div type="button" data-badge="6" className="eachprofileandbag">
                                <div data-badge={props.wishlist.length} className="badge1">
                                    <FontAwesomeIcon icon={faHeart} />
                                </div>
                                <div>Wishlist</div>
                            </div>
                        </NavLink>
                        <NavLink style={styletext} activeStyle={{ color: '#ff2058' }} to={'/checkout/bag'}>
                            <div type="button" className="eachprofileandbag">
                                <div data-badge={props.Bag.length} className="badge2">
                                    <FontAwesomeIcon icon={faShoppingBag} />
                                </div>
                                <div>Bag</div>
                            </div>
                        </NavLink>
                        <div style={stylebg} className="btn-group eachprofileandbag1">
                            <FontAwesomeIcon icon={faUser} type="button" className="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" />
                            <div style={stylebg}  className="dropdown-menu">
                                <div className="usernamewelcome">
                                    <p style={styletext}><strong>Welcome {props.username}</strong></p>
                                    <button style={styletext}>
                                        {!props.isAuthenticated ?
                                            <Link style={{ backgroundColor: "#ff2058" }} className="dropdown-item" to="/auth">Log In</Link>
                                            :
                                            <Link style={{ backgroundColor: "#ff2058" }} onClick={logoutclickedHandler} className="dropdown-item" to="/logout">Log Out</Link>}
                                    </button>
                                </div>
                                <div className="dropdown-divider"></div>
                                <Link style={styletext} className="dropdown-item" to="/myorders">My Orders</Link>
                                <Link style={styletext} className="dropdown-item" to="/checkout/bag">My Bag</Link>
                                <Link style={styletext} className="dropdown-item" to="/checkout/wishlist">My Wishlist</Link>
                                <div className="dropdown-divider"></div>
                                <Link style={styletext} className="dropdown-item" to="/">Gift cards</Link>
                                <Link style={styletext} className="dropdown-item" to="/">Coupons</Link>
                                <Link style={styletext} className="dropdown-item" to="/" onClick={scrollToBottom1}>Contact Us</Link>
                                <div className="dropdown-divider"></div>
                                <Button
                                    onClick={() => themeToggle.toggle()}
                                >
                                    {props.theme.mode === 'dark'
                                        ? "Switch to Light Mode"
                                        : "Switch to Dark Mode (Beta)"
                                    }
                                </Button>
                            </div>
                            <div type="button" className="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Profile</div>
                        </div>
                    </div> : null}
                </div>
                <div className="mobileSearch">
                        <Search /> 
                </div>
            </Wrapper>
    )
}
const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
        userid: state.auth.userid,
        username: state.auth.username,
        Bag: state.canvas.bag,
        wishlist: state.canvas.wishlist,
        token: state.auth.token
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onFetchBag: (userid, token) => { dispatch(actions.fetchBag(userid, token)) },
        onFetchWishlist: (userid, token) => { dispatch(actions.fetchWishlist(userid, token)) },
        onLogout: () => (dispatch({ type: "LOGOUT" }))
    }
}

export default withTheme(connect(mapStateToProps, mapDispatchToProps)(Toolbar))
