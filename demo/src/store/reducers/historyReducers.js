import * as actionTypes from '../actionTypes';

const History = (state = { isLoading: false, error: null, history: [] }, action) => {
    switch (action.type) {
        case actionTypes.HISTORY_LOADING:
            return { ...state, isLoading: true, error: null, history: [] };
        case actionTypes.HISTORY_FAILED:
            return { ...state, isLoading: false, error: action.payload, history: [] };
        case actionTypes.LIST_HISTORY:
            return { ...state, isLoading: false, error: null, history: action.payload }
        default:
            return state;
    }
}

export default History;