import * as actionTypes from '../actionTypes';

const setState = () => {
    const token = sessionStorage.getItem('token') || null;
    const isAuthenticated = token !== null;
    var user = null;
    user = {
        email: sessionStorage.getItem('email'),
        full_name: sessionStorage.getItem('full_name'),
        isStaff: sessionStorage.getItem('isStaff'),
    };

    const state = {
        isLoading: false,
        error: null,
        message: null,
        token: token,
        isAuthenticated: isAuthenticated,
        user: user
    };

    return state;
}

const Auth = (state = {}, action) => {
    const nulled_state = {
        isLoading: false,
        error: null,
        message: null,
        token: null,
        isAuthenticated: false,
        user: null
    }

    switch (action.type) {
        case actionTypes.AUTH_START:
            return { ...nulled_state, isLoading: true };
        case actionTypes.AUTH_FAILED:
            return { ...nulled_state, error: action.payload };
        case actionTypes.AUTH_MESSAGE:
            return { ...nulled_state, message: action.payload };
        case actionTypes.AUTH_SUCCESS:
            return setState();
        case actionTypes.AUTH_LOGOUT:
            return nulled_state;
        default:
            return setState();
    }
}

export default Auth;