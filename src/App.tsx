import React, {ChangeEvent, useEffect} from 'react';
import './styles/App.scss';
import styles from './components/UserList/UserList.module.scss';
import {User} from './services/user-api';
import {deleteUser, filterUsers, getUsersThunk, resetUsers} from './redux/reducers/usersReducer';
import {AppRootStateType} from './redux/store/store';
import { useSelector } from 'react-redux';
import {useAppDispatch} from './redux/hooks/dispatch-hook';


function App() {

  const users = useSelector<AppRootStateType, User[]>((state) => state.users.users)
  const filteredUsers = useSelector<AppRootStateType, User[]>((state) => state.users.filteredUsers)
  const searchData = useSelector<AppRootStateType, string>((state) => state.users.searchData)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getUsersThunk())

  }, [dispatch])

  const handleDelete = (id: number) => {
    dispatch(deleteUser(id))
  }

  const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(filterUsers(e.currentTarget.value))
  }

  const resetFilter = () => {
    dispatch(resetUsers())
  }

  const highlightText = (text: string, highlight: string) => {
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return <span> {parts.map((part, i) =>
        <span key={i} className={part.toLowerCase() === highlight.toLowerCase() ? styles['highlight'] : undefined }>
      {part}
    </span>)
    } </span>;
  }

  const userToDisplay = searchData === '' ? users : filteredUsers

  return (
      <div className={styles['users-container']}>
        <div className={styles['search-container']}>
          <input onChange={onSearch} value={searchData} type="text" className={styles['search-input']}/>
          <button onClick={resetFilter} className={styles['reset-button']}>reset</button>
        </div>

        {userToDisplay.length === 0
            ? <div className={styles['empty-users-message']}>No users found</div>
            : userToDisplay.map(({id, name, username, email}) => (
            <div className={styles['user-list']} key={id}>
              <div>{highlightText(`name: ${name}`, searchData)}</div>
              <div>{highlightText(`username: ${username}`, searchData)}</div>
              <div>{highlightText(`email: ${email}`, searchData)}</div>
              <button className={styles['delete-button']} onClick={() => handleDelete(id)}>Delete</button>
            </div>
        ))}
      </div>
  );
}

export default App;
