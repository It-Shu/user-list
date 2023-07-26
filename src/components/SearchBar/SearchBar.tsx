import React, {ChangeEvent} from 'react';
import styles from './SearchBar.module.scss';
import {filterUsersAC, resetUsersAC} from '../../redux/reducers/usersReducer';
import {useAppDispatch} from '../../redux/hooks/useAppDispatch';
import {useAppSelector} from '../../redux/hooks/useAppSelector';

const SearchBar = () => {

    const searchData = useAppSelector((state) => state.users.searchData)
    const dispatch = useAppDispatch()

    const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(filterUsersAC(e.currentTarget.value))
    }

    const resetFilterAndUsers = () => {
        dispatch(resetUsersAC())
    }

    return (
        <div className={styles.searchContainer}>
            <input onChange={onSearch} value={searchData} type='text' className={styles.searchInput}/>
            <button onClick={resetFilterAndUsers} className={styles.resetButton}>Reset</button>
        </div>
    );
};

export default SearchBar;
