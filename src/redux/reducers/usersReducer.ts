import {User} from '../../types/UserTypes';
import {userApi} from '../../services/user-api';
import {Dispatch} from 'redux';

const SET_USERS = 'USER/SET_USERS';
const DELETE_USER = 'USER/DELETE_USER';
const RESET_USERS_SEARCH = 'USER/RESET_USERS_SEARCH';
const FILTER_USERS = 'USER/FILTER_USERS';
const ERROR_USERS = 'USER/ERROR_USERS';

type SetUsersActionType = ReturnType<typeof setUsersAC>
type SetDeleteUsersActionType = ReturnType<typeof deleteUserAC>
type SetResetUsersSearchActionType = ReturnType<typeof resetUsersAC>
type SetFilterUsersActionType = ReturnType<typeof filterUsersAC>
type SetErrorUsersActionType = ReturnType<typeof usersRequestErrorAC>

export type ActionsType =
    | SetUsersActionType
    | SetDeleteUsersActionType
    | SetResetUsersSearchActionType
    | SetFilterUsersActionType
    | SetErrorUsersActionType

export type InitialStateType = {
    users: User[]
    initialUsers: User[]
    filteredUsers: User[]
    searchData: string
    errorMessage: string
}

const initialState: InitialStateType = {
    users: [],
    initialUsers: [],
    filteredUsers: [],
    searchData: '',
    errorMessage: ''
}

//reducer
export const usersReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case SET_USERS:
            return {...state, users: action.users, initialUsers: action.users};
        case DELETE_USER:
            return {
                ...state,
                users: state.users.filter(user => user.id !== action.id),
                filteredUsers: state.filteredUsers.filter(user => user.id !== action.id)
            };
        case RESET_USERS_SEARCH:
            return {...state, users: state.initialUsers, searchData: ''};
        case FILTER_USERS:
            return {...state, searchData: action.searchData};
        case ERROR_USERS:
            return {...state, errorMessage: action.error}
        default:
            return state
    }
}

//actions
export const setUsersAC = (users: User[]) => ({type: SET_USERS, users} as const);

export const deleteUserAC = (id: number) => ({type: DELETE_USER, id,} as const);

export const resetUsersAC = () => ({type: RESET_USERS_SEARCH} as const);

export const filterUsersAC = (searchData: string) => ({type: FILTER_USERS, searchData} as const)

export const usersRequestErrorAC = (error: string) => ({type: ERROR_USERS, error} as const)

//thunk
export const getUsersThunk = () => (dispatch: Dispatch<ActionsType>) => {
    userApi.getUsers()
        .then(res => {
            dispatch(setUsersAC(res.data));
        })
        .catch((error) => {
            console.log('ERROR', error.message)
            dispatch(usersRequestErrorAC(error.message))
        })

};
