import * as actionTypes from '../actionTypes';
import axios from 'axios';
import baseUrl from '../../shared/baseUrl';

const prefix = 'store/';

const listProducts = (products) => ({
    type: actionTypes.LIST_PRODUCTS,
    payload: products
});

const productsFailed = (error) => ({
    type: actionTypes.PRODUCTS_FAILED,
    payload: error
});

const productsLoading = () => ({
    type: actionTypes.PRODUCTS_LOADING,
});

export const getProducts = (qParams = {}) => (dispatch) => {
    dispatch(productsLoading());

    return axios.get(baseUrl + prefix + 'products/', { params: qParams })
        .then(res => dispatch(listProducts(res.data)))
        .catch(error => dispatch(productsFailed(error.message)));
}