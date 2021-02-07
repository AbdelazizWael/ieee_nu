import * as actionTypes from '../actionTypes';

const Categories = (state = { isLoading: false, error: null, categories: [] }, action) => {
    switch (action.type) {
        case actionTypes.CATEGORIES_LOADING:
            return { ...state, isLoading: true, error: null, categories: [] };
        case actionTypes.CATEGORIES_FAILED:
            return { ...state, error: action.payload, isLoading: false, categories: [] };
        case actionTypes.LIST_CATEGORIES:
            return { ...state, categories: action.payload, isLoading: false, error: null };
        default:
            return state;
    }
}

export default Categories;