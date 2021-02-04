import * as actionTypes from '../actionTypes';

const Products = (state = { isLoading: false, error: null, products: [] }, action) => {
    switch (action.type) {
        case actionTypes.PRODUCTS_LOADING:
            return { ...state, isLoading: true, error: null, products: [] };
        case actionTypes.PRODUCTS_FAILED:
            return { ...state, isLoading: false, error: action.payload, products: [] };
        case actionTypes.LIST_PRODUCTS:
            return { ...state, isLoading: false, error: null, products: action.payload }
        default:
            return state;
    }
}

export default Products;