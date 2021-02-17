import * as actionTypes from '../actionTypes';
import axios from 'axios';
import baseUrl from '../../shared/baseUrl';
import { header } from '../utils';

const prefix = 'store/'

const cartsLoading = () => ({
    type: actionTypes.CARTS_LOADING
});

const cartsFailed = (error) => ({
    type: actionTypes.CARTS_FAILED,
    payload: error
});

const listCarts = (carts) => ({
    type: actionTypes.LIST_CARTS,
    payload: carts
});

const createCart = (cart) => ({
    type: actionTypes.CREATE_CART,
    payload: cart
});

const modifyCart = (cart) => ({
    type: actionTypes.MODIFY_CART,
    payload: cart
});

const removeCart = (cart_id) => ({
    type: actionTypes.REMOVE_CART,
    payload: cart_id
});

export const getCarts = () => (dispatch) => {
    dispatch(cartsLoading());

    return axios.get(baseUrl + prefix + 'carts/', header())
        .then(res => dispatch(listCarts(res.data)))
        .catch(error => dispatch(cartsFailed(error.message)));
}

export const addCart = (cart) => (dispatch) => {
    dispatch(cartsLoading());

    return axios.post(baseUrl + prefix + 'carts/', cart, header())
        .then(res => dispatch(createCart(res.data)))
        .catch(error => {
            if (error.response) {
                if (error.response.status === 303) {
                    const serverCart = error.response.data.cart;
                    dispatch(updateCart(serverCart.id, serverCart.count + 1));
                }
            } else {
                dispatch(cartsFailed(error.message));
            }
        });
}

export const deleteCart = (cart_id) => (dispatch) => {
    return axios.delete(baseUrl + prefix + `carts/${cart_id}/`, header())
        .then(res => dispatch(removeCart(cart_id)))
        .catch(error => dispatch(cartsFailed(error.message)));
}

export const updateCart = (cart_id, count) => (dispatch) => {
    return axios.patch(baseUrl + prefix + `carts/${cart_id}/`, { count: count }, header())
        .then(res => dispatch(modifyCart(res.data)))
        .catch(error => dispatch(cartsFailed(error.message)));
}

export const deleteCarts = () => {
    return axios.delete(baseUrl + prefix + 'delete-carts/', header());
}