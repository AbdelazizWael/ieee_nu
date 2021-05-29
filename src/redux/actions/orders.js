import * as actionTypes from '../actionTypes';
import axios from 'axios';
import baseUrl from '../../shared/baseUrl';
import { header } from '../utils';

const prefix = 'store/';

const listOrders = (orders) => ({
    type: actionTypes.LIST_ORDERS,
    payload: orders
});

const ordersFailed = (error) => ({
    type: actionTypes.ORDERS_FAILED,
    payload: error
});

const ordersLoading = () => ({
    type: actionTypes.ORDERS_LOADING,
});

export const getOrders = () => (dispatch) => {
    dispatch(ordersLoading());

    return axios.get(baseUrl + prefix + 'orders/', header())
        .then(res => dispatch(listOrders(res.data)))
        .catch(error => dispatch(ordersFailed(error.message)));
}

export const placeOrder = () => (dispatch) => {
    return axios.post(baseUrl + prefix + 'place-order/', {}, header())
        .catch(error => dispatch(ordersFailed(error.message)));
}