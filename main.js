import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import userInfoReducer from './src/js/modules/userInfo/reducer';
import errorReducer from './src/js/modules/error/reducer';
import loaderReducer from './src/js/modules/loader/reducer';
import App from './app';

const reducer = combineReducers({
    userInfo: userInfoReducer,
    error: errorReducer,
    loader: loaderReducer,
});

const store = createStore(reducer, applyMiddleware(thunk));
export default function Main() {

    return (
        <Provider store={store}>
            <App />
        </Provider>
    );
}

XMLHttpRequest = GLOBAL.originalXMLHttpRequest ?
  GLOBAL.originalXMLHttpRequest :
  GLOBAL.XMLHttpRequest;

// fetch logger
global._fetch = fetch;
global.fetch = function (uri, options, ...args) {
  return global._fetch(uri, options, ...args).then((response) => {
    console.log('Fetch', { request: { uri, options, ...args }, response });
    return response;
  });
}; 
