import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import Auth from './reducers/auth';
import Products from './reducers/products';
import Categories from './reducers/categories';
import Orders from './reducers/orders';
import History from './reducers/history';
import Carts from './reducers/carts';

const ConfigureStore = () => {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(
        combineReducers({
            authState: Auth,
            productState: Products,
            categoryState: Categories,
            orderState: Orders,
            historyState: History,
            cartState: Carts,
        }),
        composeEnhancers(
            applyMiddleware(thunk)
        ));
    return store;
}

export default ConfigureStore;