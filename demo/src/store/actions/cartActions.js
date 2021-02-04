import * as actionTypes from '../actionTypes';
import { header } from '../utils';
import axios from 'axios';
import baseUrl from '../../shared/baseUrl';

const listCarts = (carts) => ({
    type: actionTypes.LIST_CARTS,
    payload: carts
});

const addCart = (cart) => ({
    type: actionTypes.ADD_CART,
    payload: cart
});

const cartsLoading = () => ({
    type: actionTypes.CARTS_LOADING
});

const cartsFailed = (error) => ({
    type: actionTypes.CARTS_FAILED,
    payload: error
});

const updateCart = (cart) => ({
    type: actionTypes.UPDATE_CART,
    payload: cart
});

const destroyCart = (cart_id) => ({
    type: actionTypes.DELETE_CART,
    payload: cart_id
});

export const getCarts = () => (dispatch) => {
    dispatch(cartsLoading());

    return axios.get(baseUrl + 'store/cart/', header())
        .then(res => dispatch(listCarts(res.data)))
        .catch(error => dispatch(cartsFailed(error.message)));
}

export const postCart = (cart) => (dispatch) => {
    dispatch(cartsLoading());

    return axios.post(baseUrl + 'store/cart/', cart, header())
        .then(res => dispatch(addCart(res.data)))
        .catch(error => dispatch(cartsFailed(error.message)));
}

export const deleteCart = (cart_id) => (dispatch) => {
    return axios.delete(baseUrl + `store/cart/${cart_id}/`, header())
        .then(() => dispatch(destroyCart(cart_id)))
        .catch(error => dispatch(cartsFailed(error.message)));
}

export const putCart = (cart) => (dispatch) => {
    const cartData = {
        product_id: cart.product_id,
        count: cart.count,
        verified: cart.verified,
    };

    return axios.put(baseUrl + `store/cart/${cart.id}/`, cartData, header())
        .then(res => dispatch(updateCart(res.data)))
        .catch(error => dispatch(cartsFailed(error.response.data.details)));
}