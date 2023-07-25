import React, {ChangeEvent} from 'react';
import styles from './SearchBar.module.scss';
import {filterUsers, resetUsers} from '../../redux/reducers/usersReducer';
import {useAppDispatch} from '../../redux/hooks/dispatch-hook';
import {useSelector} from 'react-redux';
import {AppRootStateType} from '../../redux/store/store';

const SearchBar = () => {

    const searchData = useSelector<AppRootStateType, string>((state) => state.users.searchData)
    const dispatch = useAppDispatch()

    const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(filterUsers(e.currentTarget.value))
    }

    const resetFilter = () => {
        dispatch(resetUsers())
    }
    return (
        <div className={styles['search-container']}>
            <input onChange={onSearch} value={searchData} type='text' className={styles['search-input']}/>
            <button onClick={resetFilter} className={styles['reset-button']}>Reset</button>
        </div>
    );
};

export default SearchBar;
