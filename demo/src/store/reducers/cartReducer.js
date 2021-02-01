import * as actionTypes from '../actionTypes';

const list = (state, action) => {
    var carts = [];
    action.payload.forEach(cart => {
        if (cart.verified === false) {
            carts.push(cart);
        }
    });
    return { ...state, isLoading: false, error: null, carts: carts }
};

const create = (state, action) => {
    return { ...state, isLoading: false, error: null, carts: [...state.carts, action.payload] }
};

const update = (state, action) => {
    var carts = [];
    state.carts.forEach(cart => {
        if (cart.pk === action.payload.pk) {
            carts.push(action.payload);
        } else {
            carts.push(cart);
        }
    });
    return { ...state, isLoading: false, error: null, carts: carts };
}

const del = (state, action) => {
    var carts = [];
    state.carts.forEach(cart => {
        if (cart.pk !== action.payload) {
            carts.push(cart);
        }
    });
    return { ...state, isLoading: false, error: null, carts: carts };
}

const Carts = (state = { isLoading: false, error: null, carts: [] }, action) => {
    switch (action.type) {
        case actionTypes.CARTS_LOADING:
            return { ...state, isLoading: true, error: null };
        case actionTypes.CARTS_FAILED:
            return { ...state, isLoading: false, error: action.payload, carts: [] };
        case actionTypes.LIST_CARTS:
            return list(state, action);
        case actionTypes.UPDATE_CART:
            return update(state, action);
        case actionTypes.ADD_CART:
            return create(state, action);
        case actionTypes.DELETE_CART:
            return del(state, action);
        default:
            return state;
    }
}

export default Carts;