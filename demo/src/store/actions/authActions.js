import * as actionTypes from '../actionTypes';
import baseUrl from '../../shared/baseUrl'
import axios from 'axios';

const authStart = () => ({
    type: actionTypes.AUTH_START
});

const authSuccess = (token, email) => ({
    type: actionTypes.AUTH_SUCCESS,
    payload: {
        token: token,
        email: email
    }
});

const authFailed = error => ({
    type: actionTypes.AUTH_FAILED,
    payload: error
});

const authLogout = () => ({
    type: actionTypes.AUTH_LOGOUT
});

export const login = (email, password) => (dispatch) => {
    dispatch(authStart());

    return axios.post(baseUrl + 'auth/login/', {
        email: email,
        password: password
    })
        .then(res => handleRes(res, dispatch, email))
        .catch(error => dispatch(authFailed(error.message)));
}

export const register = (first_name, last_name, email, password1, password2) => (dispatch) => {
    dispatch(authStart());

    return axios.post(baseUrl + 'auth/register/', {
        first_name: first_name,
        last_name: last_name,
        email: email,
        password1: password1,
        password2: password2
    })
        .catch(error => dispatch(authFailed(error.message)));
}

export const logout = () => (dispatch) => {
    localStorage.clear();
    dispatch(authLogout());
    return axios.post(baseUrl + 'auth/logout/');
}

const handleRes = (res, dispatch, email) => {
    const token = res.data.key;
    localStorage.setItem('token', token);
    localStorage.setItem('email', email);
    dispatch(authSuccess(token, email));
}