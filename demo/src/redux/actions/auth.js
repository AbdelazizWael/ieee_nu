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
            localStorage.setItem('token', token);
            getUserData();
            isStaff();
            dispatch(authSuccess(token));
        })
        .catch(error => dispatch(authFailed(error.message)));
}

export const logout = () => (dispatch) => {
    localStorage.clear();
    dispatch(authLogout());
    return axios.post(baseUrl + prefix + 'logout/', {}, header());
}

const getUserData = () => {
    return axios.get(baseUrl + prefix + 'user/', header())
        .then(res => {
            const data = res.data;
            localStorage.setItem('email', data.email);
            const full_name = data.first_name + ' ' + data.last_name
            localStorage.setItem('full_name', full_name);
        })
}

const isStaff = () => {
    return axios.get(baseUrl + prefix + 'is-staff/', header())
        .then(res => {
            localStorage.setItem('isStaff', true);
        })
        .catch(error => {
            localStorage.setItem('isStaff', false);
        })
}