import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { Provider } from "react-redux";
import thunk from 'redux-thunk'

import './index.css';
import App from './App';
import authreducer from './store/reducers/Auth'
import canvasreducer from './store/reducers/Canvas'
import orderreducer from './store/reducers/Order'
import filterreducer from './store/reducers/filter'
import * as serviceWorker from './serviceWorker';
import { MyThemeProvider } from "./components/UI/ThemeContext";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducer = combineReducers({
  auth: authreducer,
  canvas: canvasreducer,
  order: orderreducer,
  filter: filterreducer
})
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <MyThemeProvider>
        <App />
      </MyThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
// REACT_APP_BACKEND_URL=http://localhost:5000