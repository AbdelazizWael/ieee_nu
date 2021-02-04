import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import Auth from './reducers/authReducers';
import Products from './reducers/productsReducers'
import Cart from './reducers/cartReducer';
import History from './reducers/historyReducers';

const ConfigureStore = () => {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(
        combineReducers({
            auth: Auth,
            productState: Products,
            cartState: Cart,
            historyState: History
        }),
        composeEnhancers(
            applyMiddleware(thunk)
        ));
    return store;
}

export default ConfigureStore;