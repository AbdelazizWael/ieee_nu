import * as actionTypes from '../actionTypes';
import axios from 'axios';
import baseUrl from '../../shared/baseUrl';

const productsLoading = () => ({
    type: actionTypes.PRODUCTS_LOADING
});

const productsFailed = (error) => ({
    type: actionTypes.PRODUCTS_FAILED,
    payload: error
});

const listProducts = (products) => ({
    type: actionTypes.LIST_PRODUCTS,
    payload: products
});

export const getProducts = () => (dispatch) => {
    dispatch(productsLoading());

    return axios.get(baseUrl + 'store/products/')
        .then(res => dispatch(listProducts(res.data)))
        .catch(error => dispatch(productsFailed(error.message)));
}