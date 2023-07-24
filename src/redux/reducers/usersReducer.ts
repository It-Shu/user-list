import {User, userApi} from '../../services/user-api';
import {AppThunk} from '../store/store';

const SET_USERS = 'USER/SET_USERS';
const DELETE_USER = 'USER/DELETE_USER';
const RESET_USERS_SEARCH = 'USER/RESET_USERS_SEARCH';
const FILTER_USERS = 'USER/FILTER_USERS';


export type SetUsersActionType = ReturnType<typeof setUsers>
export type SetDeleteUsersActionType = ReturnType<typeof deleteUser>
export type SetResetUsersSearchActionType = ReturnType<typeof resetUsers>
export type SetFilterUsersActionType = ReturnType<typeof filterUsers>

export type ActionsType =
    | SetUsersActionType
    | SetDeleteUsersActionType
    | SetResetUsersSearchActionType
    | SetFilterUsersActionType

export type InitialStateType = {
    users: User[]
    initialUsers: User[]
    filteredUsers: User[]
    searchData: string
}

const initialState: InitialStateType = {
    users: [],
    initialUsers: [],
    filteredUsers: [],
    searchData: '',
}
//reducer
export const usersReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case SET_USERS:
            return {...state, users: action.users, initialUsers: action.users};
        case DELETE_USER:
            return {...state, users: state.users.filter(user => user.id !== action.id), filteredUsers: state.filteredUsers.filter(user => user.id !== action.id)};
        case RESET_USERS_SEARCH:
            return {...state, users: state.initialUsers, searchData: ''};
        case FILTER_USERS:
            const filteredUsers = state.users.filter(user =>
                user.name.toLowerCase().includes(action.searchData.toLowerCase()) ||
                user.username.toLowerCase().includes(action.searchData.toLowerCase()) ||
                user.email.toLowerCase().includes(action.searchData.toLowerCase())
            );
            return {...state, searchData: action.searchData, filteredUsers: filteredUsers};
        default:
            return state
    }
}

//action'
export const setUsers = (users: User[]) => ({type: SET_USERS, users} as const);

export const deleteUser = (id: number) => ({type: DELETE_USER, id,} as const);

export const resetUsers = () => ({type: RESET_USERS_SEARCH} as const);

export const filterUsers = (searchData: string) => ({type: FILTER_USERS, searchData} as const);

//thunk
export const getUsersThunk = (): AppThunk => async (dispatch) => {
    try {
        const users = await userApi.getUsers();
        dispatch(setUsers(users.data));
    } catch (error) {
        console.error(error);
    }
};
