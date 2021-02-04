import * as actionTypes from '../actionTypes';
import axios from 'axios';
import baseUrl from '../../shared/baseUrl';
import { header } from '../utils';

const historyLoading = () => ({
    type: actionTypes.HISTORY_LOADING
});

const historyFailed = (error) => ({
    type: actionTypes.HISTORY_FAILED,
    payload: error
});

const listHistory = (history) => ({
    type: actionTypes.LIST_HISTORY,
    payload: history
});

export const getHistory = () => (dispatch) => {
    dispatch(historyLoading());

    return axios.get(baseUrl + 'store/purchases/', header())
        .then(res => dispatch(listHistory(res.data)))
        .catch(error => dispatch(historyFailed(error.message)));
}