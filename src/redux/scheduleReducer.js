import {scheduleAPI} from "../api/api";

const SET_SCHEDULE = 'schedule/SET_SCHEDULE';

// const SET_HOMEWORK = 'schedule/SET_HOMEWORK';
// const SET_SUBJECT = 'schedule/SET_SUBJECT';
// const SET_MARKS = 'schedule/SET_MARKS';
// const ADDITION_HOMEWORK = 'schedule/ADDITION_HOMEWORK';


let initialState = {
    schedule: []
};


const scheduleReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SCHEDULE:
            return setSchedule(state, action.schedule);
        default:
            return state;
    }
}

const setSchedule = (state, schedule) => {
    return {
        ...state,
        schedule: [...schedule]
    }
}



const setScheduleAC = (schedule) => ({type: SET_SCHEDULE, schedule})
// const setSubjectAC = (day, subjectID, newSubjectName) => ({type: SET_SUBJECT, data: {day, subjectID, newSubjectName}})


export const getScheduleThunkCreator = () => async (dispatch) => {
    let response = await scheduleAPI.getSchedule();
    dispatch(setScheduleAC(response.data));
};

export const setScheduleFieldThunkCreator = (day, subjectID, field, value) => async (dispatch) => {
    let response = await scheduleAPI.updateSchedule(day, subjectID, field, value);
    if (response.data.resultCode === 0) {
        dispatch(getScheduleThunkCreator());
    }
};


export default scheduleReducer;