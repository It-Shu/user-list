import React, {ChangeEvent, useEffect, useState} from 'react';
import './styles/App.scss';
import styles from './components/UserList/UserList.module.scss';
import {User, userApi} from './services/user-api';

function App() {

  const [users, setUsers] = useState<User[]>([])
  const [searchData, setSearchData] = useState('')

  useEffect(() => {
    const getUserData = async () => {
      const response = await userApi.getUsers()
      setUsers(response.data)
    }
    getUserData()
  }, [])

  const handleDelete = (id: number) => {
    return alert(`user ${id} deleted`)
  }

  const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchData(e.currentTarget.value)
  }

  return (
      <div className={styles['users-container']}>
        <div className={styles['search-container']}>
          <input onChange={onSearch} type="text" className={styles['search-input']}/>
          <button className={styles['reset-button']}>reset</button>
        </div>

        {users.map(({id, name, username, email}) => (
            <div className={styles['user-list']} key={id}>
              <div>name: {name}</div>
              <div>username: {username}</div>
              <div>email: {email}</div>
              <button className={styles['delete-button']} onClick={() => handleDelete(id)}>Delete</button>
            </div>
        ))}
      </div>
  );
}

export default App;
