import {User} from '../../types/UserTypes';
import {userApi} from '../../services/user-api';
import {Dispatch} from 'redux';

const SET_USERS = 'USER/SET_USERS';
const DELETE_USER = 'USER/DELETE_USER';
const RESET_USERS_SEARCH = 'USER/RESET_USERS_SEARCH';
const FILTER_USERS = 'USER/FILTER_USERS';
const ERROR_USERS = 'USER/ERROR_USERS';

export type SetUsersActionType = ReturnType<typeof setUsers>
export type SetDeleteUsersActionType = ReturnType<typeof deleteUser>
export type SetResetUsersSearchActionType = ReturnType<typeof resetUsers>
export type SetFilterUsersActionType = ReturnType<typeof filterUsers>
export type SetErrorUsersActionType = ReturnType<typeof usersRequestError>

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
            const filteredUsers = state.users.filter(user => {
                const matchSearch = (data: string) => {
                    return data.toLowerCase().includes(action.searchData.trim().toLowerCase())
                }
                return matchSearch(user.name) ||
                    matchSearch(user.username) ||
                    matchSearch(user.email)
            });
            return {...state, searchData: action.searchData, filteredUsers: filteredUsers};
        case ERROR_USERS:
            return {...state, errorMessage: action.error}
        default:
            return state
    }
}

//actions
export const setUsers = (users: User[]) => ({type: SET_USERS, users} as const);

export const deleteUser = (id: number) => ({type: DELETE_USER, id,} as const);

export const resetUsers = () => ({type: RESET_USERS_SEARCH} as const);

export const filterUsers = (searchData: string) => ({type: FILTER_USERS, searchData} as const)

export const usersRequestError = (error: string) => ({type: ERROR_USERS, error} as const)

//thunk
export const getUsersThunk = () => (dispatch: Dispatch<ActionsType>) => {
    userApi.getUsers()
        .then(res => {
            dispatch(setUsers(res.data));
        })
        .catch((error) => {
            console.log('ERROR',error.message)
            dispatch(usersRequestError(error.message))
        })

};
