import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import scheduleReducer from "./scheduleReducer";
import authReducer from "./authReducer";
import appReducer from "./appReducer";
import personalAreaReducer from "./personalAreaReducer";


let reducers = combineReducers({
    schedulePage: scheduleReducer,
    personalAreaPage: personalAreaReducer,
    auth: authReducer,
    app: appReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, /* preloadedState, */ composeEnhancers(applyMiddleware(thunkMiddleware)
));

// let store = createStore(reducers, applyMiddleware(thunkMiddleware));


export default store;