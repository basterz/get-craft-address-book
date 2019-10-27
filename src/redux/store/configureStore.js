import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import rootReducer from "../reducers/reducers";
import {createContext} from "react";

const loggerMiddleware = createLogger()

export default function configureStore(preloadedState) {
    return createStore(
        rootReducer,
        preloadedState,
        applyMiddleware(thunkMiddleware, loggerMiddleware)
    )
}

