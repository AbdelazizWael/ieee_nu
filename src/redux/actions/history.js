import * as actionTypes from '../actionTypes';
import axios from 'axios';
import baseUrl from '../../shared/baseUrl';
import { header } from '../utils';

const prefix = 'store/';

const listHistory = (history) => ({
    type: actionTypes.LIST_HISTORY,
    payload: history
});

const historyFailed = (error) => ({
    type: actionTypes.HISTORY_FAILED,
    payload: error
});

const historyLoading = () => ({
    type: actionTypes.HISTORY_LOADING,
});

export const getHistory = () => (dispatch) => {
    dispatch(historyLoading());

    return axios.get(baseUrl + prefix + 'history/', header())
        .then(res => dispatch(listHistory(res.data)))
        .catch(error => dispatch(historyFailed(error.message)));
}