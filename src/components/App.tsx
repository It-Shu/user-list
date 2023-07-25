import React from 'react';
import styles from './App.module.scss';
import SearchBar from "./SearchBar/SearchBar";
import UserCard from "./UserCard/UserCard";


function App() {

    return (
        <div className={styles['users-container']}>
            <SearchBar/>
            <UserCard/>
        </div>
    );
}

export default App;
