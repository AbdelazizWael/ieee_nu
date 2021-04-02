import * as actionTypes from '../actionTypes';

const Orders = (state = { isLoading: false, error: null, orders: {} }, action) => {
    switch (action.type) {
        case actionTypes.ORDERS_LOADING:
            return { ...state, isLoading: true, error: null, orders: {} };
        case actionTypes.ORDERS_FAILED:
            return { ...state, error: action.payload, isLoading: false, orders: {} };
        case actionTypes.LIST_ORDERS:
            return { ...state, orders: action.payload, isLoading: false, error: null };
        default:
            return state;
    }
}

export default Orders;