import React from 'react';
import styles from './App.module.scss';
import SearchBar from './SearchBar/SearchBar';
import UsersCards from './UsersCards/UsersCards';


function App() {

    return (
        <div className={styles.usersContainer}>
            <SearchBar/>
            <UsersCards/>
        </div>
    );
}

export default App;
