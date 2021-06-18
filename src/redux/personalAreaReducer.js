import {personalAreaAPI} from "../api/api";

const SET_USERS = 'users/SET_USERS';


let initialState = {
    newUsers: []
};


const personalAreaReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USERS:
            return setUsers(state, action.newUsers);
        default:
            return state;
    }
}

const setUsers = (state, newUsers) => {
    return {
        ...state,
        newUsers: [...newUsers]
    }
}



const setUsersAC = (newUsers) => ({type: SET_USERS, newUsers})


export const getNewUsersThunkCreator = () => async (dispatch) => {
    let response = await personalAreaAPI.getNewUsers();
    dispatch(setUsersAC(response.data));
};

export const acceptNewUserThunkCreator = (id) => async (dispatch) => {
    let response = await personalAreaAPI.acceptNewUser(id);
    dispatch(getNewUsersThunkCreator());
};

export const declineNewUserThunkCreator = (id) => async (dispatch) => {
    let response = await personalAreaAPI.declineNewUser(id);
    dispatch(getNewUsersThunkCreator());
};


export default personalAreaReducer;