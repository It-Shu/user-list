import{ ThunkDispatch } from 'redux-thunk'
import { applyMiddleware, combineReducers, createStore, Action } from "redux"
import thunk from "redux-thunk"
import {usersReducer} from '../reducers/usersReducer'

export type AppRootStateType = ReturnType<typeof rootReducer>

const rootReducer = combineReducers({
    users: usersReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, Action<string>>;
