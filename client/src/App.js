import React, { Component, Suspense } from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import { connect } from 'react-redux'

import Canvas from './containers/Canvas/Canvas'
import Auth from './containers/Auth/Auth'
import Bag from './containers/Checkout/Bag/Bag'
import Wishlist from './containers/Checkout/Wishlist/Wishlist'
// import Contactdata from './containers/Checkout/Contactdata/Contactdata'
// import Checkout from './containers/Checkout/Checkout'
// import ProductList from './components/productlist/productlist'
// import Fullproduct from './components/fullproduct/fullproduct'
import Toast from './components/UI/Toasts/Toast'
import Toolbar from './components/Toolbar/Toolbar'
import Logout from './containers/Auth/Logout/Logout'
import Spinner from './components/UI/LoadingIndicator/LoadingIndicator'
import * as actions from './store/actions/index'

const Contactdata = React.lazy(() => import('./containers/Checkout/Contactdata/Contactdata'))
const Checkout = React.lazy(() => import('./containers/Checkout/Checkout'))
const ProductList = React.lazy(() => import('./components/productlist/productlist'))
const Fullproduct = React.lazy(() => import('./components/fullproduct/fullproduct'))

class App extends Component {
  componentDidMount() {
    this.props.onAutoSignUp()
    console.log(process.env.REACT_APP_BACKEND_URL)
  }
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Suspense fallback={<div className="centerLoading"><Spinner /></div>}>
            <Toast />
            <Route path="/" exact >
              <Toolbar />
              <Canvas />
            </Route>
            <Route path="/auth" exact >
              <Auth />
            </Route>
            <Route path="/shoes" exact >
              <Toolbar />
              <ProductList />
            </Route>
            <Route path="/shoes/:id" exact component={(props) => <div>
              <Fullproduct {...props} /><Toolbar />
            </div>} />
            <Route path="/checkout/bag" exact >
              <Toolbar />
              <Bag />
            </Route>
            <Route path="/checkout/wishlist" exact >
              <Toolbar />
              <Wishlist />
            </Route>
            <Route path="/checkout/address" exact >
              <Toolbar />
              <Contactdata />
            </Route>
            <Route path="/logout" exact >
              <Logout />
            </Route>
            <Route path="/myorders" exact >
              <Toolbar />
              <Checkout />
            </Route>
          </Suspense>
        </BrowserRouter>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onAutoSignUp: () => dispatch(actions.authCheckState()),
    onFetchBag: () => { dispatch(actions.fetchBag()) },
    onFetchWishlist: () => { dispatch(actions.fetchWishlist()) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

