import React, {useEffect} from 'react';
import styles from './styles/UserList.module.scss';
import {getUsersThunk} from './redux/reducers/usersReducer';
import {useAppDispatch} from './redux/hooks/dispatch-hook';
import SearchBar from "./components/SearchBar/SearchBar";
import UserCard from "./components/UserCard/UserCard";


function App() {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getUsersThunk())
    }, [dispatch])


    return (
        <div className={styles['users-container']}>
            <SearchBar/>
            <UserCard/>
        </div>
    );
}

export default App;
