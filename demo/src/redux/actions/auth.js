import * as actionTypes from '../actionTypes';
import axios from 'axios';
import baseUrl from '../../shared/baseUrl';
import { header } from '../utils';

const prefix = 'auth/';

const authStart = () => ({
    type: actionTypes.AUTH_START
});

const authFailed = (error) => ({
    type: actionTypes.AUTH_FAILED,
    payload: error
});

const authSuccess = (token) => ({
    type: actionTypes.AUTH_SUCCESS,
    payload: token
});

const authLogout = () => ({
    type: actionTypes.AUTH_LOGOUT
});

const authMessage = (message) => ({
    type: actionTypes.AUTH_MESSAGE,
    payload: message
});

export const register = (credentials) => (dispatch) => {
    dispatch(authStart());

    return axios.post(baseUrl + prefix + 'register/', credentials)
        .then(res => dispatch(authMessage(res.data.detail)))
        .catch(error => dispatch(authFailed(error.message)));
}

export const login = (credentials) => (dispatch) => {
    dispatch(authStart());

    return axios.post(baseUrl + prefix + 'login/', credentials)
        .then(res => {
            const token = res.data.key;
            sessionStorage.setItem('token', token);
            getUserData();
            dispatch(authSuccess(token));
        })
        .catch(error => dispatch(authFailed(error.message)));
}

export const logout = () => (dispatch) => {
    sessionStorage.clear();
    dispatch(authLogout());
    return axios.post(baseUrl + prefix + 'logout/', {}, header());
}

const getUserData = () => {
    return axios.get(baseUrl + prefix + 'profile/', header())
        .then(res => {
            const data = res.data;
            sessionStorage.setItem('email', data.email);
            sessionStorage.setItem('full_name', data.full_name);
            sessionStorage.setItem('isStaff', data.is_staff);
        })
}