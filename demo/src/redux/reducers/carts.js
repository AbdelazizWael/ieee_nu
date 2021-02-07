import * as actionTypes from '../actionTypes';
import { managePaginatedState } from '../utils';

const Carts = (state = { isLoading: false, error: null, carts: {} }, action) => {
    switch (action.type) {
        case actionTypes.CARTS_LOADING:
            return { ...state, isLoading: true, error: null };

        case actionTypes.CARTS_FAILED:
            return { ...state, isLoading: false, error: action.payload, carts: [] };

        case actionTypes.LIST_CARTS:
            return { ...state, isLoading: false, error: null, carts: action.payload };

        case actionTypes.MODIFY_CART:
            var newCarts = managePaginatedState('update', state.carts, action.payload);
            return { ...state, isLoading: false, error: null, carts: newCarts };

        case actionTypes.CREATE_CART:
            newCarts = managePaginatedState('create', state.carts, action.payload);
            return { ...state, isLoading: false, error: null, carts: newCarts };

        case actionTypes.REMOVE_CART:
            newCarts = managePaginatedState('delete', state.carts, action.payload);
            return { ...state, isLoading: false, error: null, carts: newCarts };

        default:
            return state;
    }
}

export default Carts;