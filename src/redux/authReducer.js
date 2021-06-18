import {authAPI} from "../api/api";

const SET_AUTH_USER_DATA = 'social-network/auth/SET_AUTH_USER_DATA';
const PUSH_LOGIN_ERROR = 'PUSH_LOGIN_ERROR';




let initialState = {
    firstName: null,
    surname: null,
    email: null,
    role: null,
    isAuth: false,
    isAdmin: false,

    loginError: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTH_USER_DATA:
            return setAuthUserData(state, action);

        case PUSH_LOGIN_ERROR:
            return pushLoginError(state, action.message);
        default:
            return state;
    }
}

const setAuthUserData = (state, action) => {
    return {
        ...state,
        ...action.payload,
    };
};

const pushLoginError = (state, message) => {
    return {
        ...state,
        loginError: message,
    }
}

const pushLoginErrorAC = (message) => ({type: PUSH_LOGIN_ERROR, message});

const setAuthUserDataAC = (firstName, surname, email, role, isAdmin, isAuth) => ({
    type: SET_AUTH_USER_DATA,
    payload: {firstName, surname, email, role, isAdmin, isAuth}
});


export const getAuthUserDataThunkCreator = () => async (dispatch) => {
    let response = await authAPI.authMe();
    if (response.data.resultCode === 0) {
        let {firstName, surname, email, role} = response.data;
        if (response.data.isAdmin) {
            dispatch(setAuthUserDataAC(firstName, surname, email, role, true, true));
        } else {
            dispatch(setAuthUserDataAC(firstName, surname, email, role, false, true));
        }
    }
}

export const loginThunkCreator = (email, password) => async (dispatch) => {
    let response = await authAPI.login(email, password);
    if (response.data.resultCode === 0) {
        dispatch(getAuthUserDataThunkCreator());
    } else {
       if (response.data.message) {
           dispatch(pushLoginErrorAC(response.data.message));
       }
    }
}

export const logoutThunkCreator = () => async (dispatch) => {
    let response = await authAPI.logout();
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserDataAC(null, null, null, null, false, false));
    }
}

export const registrationThunkCreator = (formData) => (dispatch) => {
    debugger
    authAPI.registration(formData);
}

export default authReducer;