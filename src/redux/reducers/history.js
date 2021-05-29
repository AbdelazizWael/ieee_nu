import * as actionTypes from '../actionTypes';

const History = (state = { isLoading: false, error: null, history: {} }, action) => {
    switch (action.type) {
        case actionTypes.HISTORY_LOADING:
            return { ...state, isLoading: true, error: null, history: {} };
        case actionTypes.HISTORY_FAILED:
            return { ...state, error: action.payload, isLoading: false, history: {} };
        case actionTypes.LIST_HISTORY:
            return { ...state, history: action.payload, isLoading: false, error: null };
        default:
            return state;
    }
}

export default History;