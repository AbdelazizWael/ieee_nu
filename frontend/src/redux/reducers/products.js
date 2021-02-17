import * as actionTypes from '../actionTypes';

const Products = (state = { isLoading: false, error: null, products: {} }, action) => {
    switch (action.type) {
        case actionTypes.PRODUCTS_LOADING:
            return { ...state, isLoading: true, error: null, products: {} };
        case actionTypes.PRODUCTS_FAILED:
            return { ...state, error: action.payload, isLoading: false, products: {} };
        case actionTypes.LIST_PRODUCTS:
            return { ...state, products: action.payload, isLoading: false, error: null };
        default:
            return state;
    }
}

export default Products;