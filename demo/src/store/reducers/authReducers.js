import * as actionTypes from '../actionTypes';

const Auth = (state = { token: null, error: null, isLoading: false, email: null, isAuthenticated: false }, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return { ...state, token: null, error: null, isLoading: true, email: null, isAuthenticated: false };
        case actionTypes.AUTH_SUCCESS:
            return { ...state, token: action.payload.token, error: null, isLoading: false, email: action.payload.email, isAuthenticated: true };
        case actionTypes.AUTH_FAILED:
            return { ...state, token: null, error: action.payload, isLoading: false, email: null, isAuthenticated: false };
        case actionTypes.AUTH_LOGOUT:
            return { ...state, token: null, error: null, isLoading: false, email: null, isAuthenticated: false };
        default:
            const token = localStorage.getItem('token') || null;
            const email = localStorage.getItem('email') || null;
            const isAuthenticated = token !== null;
            return { ...state, token: token, email: email, isAuthenticated: isAuthenticated };
    }
}

export default Auth;