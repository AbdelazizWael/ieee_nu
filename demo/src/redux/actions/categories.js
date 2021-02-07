import * as actionTypes from '../actionTypes';
import axios from 'axios';
import baseUrl from '../../shared/baseUrl';

const prefix = 'store/';

const listCategories = (categories) => ({
    type: actionTypes.LIST_CATEGORIES,
    payload: categories
});

const categoriesFailed = (error) => ({
    type: actionTypes.CATEGORIES_FAILED,
    payload: error
});

const categoriesLoading = () => ({
    type: actionTypes.CATEGORIES_LOADING,
});

export const getCategories = () => (dispatch) => {
    dispatch(categoriesLoading());

    return axios.get(baseUrl + prefix + 'categories/')
        .then(res => dispatch(listCategories(res.data)))
        .catch(error => dispatch(categoriesFailed(error.message)));
}