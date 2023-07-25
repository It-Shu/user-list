import {createStore, applyMiddleware, combineReducers, Action} from 'redux'
import thunkMiddleware, { ThunkAction, ThunkDispatch } from 'redux-thunk'
import {usersReducer} from '../reducers/usersReducer';

const rootReducer = combineReducers({
    users: usersReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export type AppRootStateType = ReturnType<typeof rootReducer>

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, Action<string>>

export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, Action<string>>;
