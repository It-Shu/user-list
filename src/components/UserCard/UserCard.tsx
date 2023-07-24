import React from 'react';
import styles from './UserCard.module.scss';
import {useSelector} from 'react-redux';
import {AppRootStateType} from '../../redux/store/store';
import {User} from '../../services/user-api';
import {deleteUser} from '../../redux/reducers/usersReducer';
import {useAppDispatch} from '../../redux/hooks/dispatch-hook';

const UserCard = () => {

    const dispatch = useAppDispatch()

    const users = useSelector<AppRootStateType, User[]>((state) => state.users.users)
    const filteredUsers = useSelector<AppRootStateType, User[]>((state) => state.users.filteredUsers)
    const searchData = useSelector<AppRootStateType, string>((state) => state.users.searchData)

    const highlightText = (text: string, highlight: string) => {
        const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
        return <span> {parts.map((part, i) =>
            <span key={i} className={part.toLowerCase() === highlight.toLowerCase() ? styles['highlight'] : undefined}>
      {part}
    </span>)
        } </span>;
    }

    const handleDelete = (id: number) => {
        dispatch(deleteUser(id))
    }

    const userToDisplay = searchData === '' ? users : filteredUsers

    return (
        <>
            {userToDisplay.length === 0
                ? <div className={styles['empty-users-message']}>No users found</div>
                : userToDisplay.map(({id, name, username, email}) => (
                    <div className={styles['user-card']} key={id}>
                        <div className={styles['user-card-title']}>{highlightText(`name: ${name}`, searchData)}</div>
                        <div className={styles['user-card-title']}>{highlightText(`username: ${username}`, searchData)}</div>
                        <div className={styles['user-card-title']}>{highlightText(`email: ${email}`, searchData)}</div>
                        <button className={styles['delete-button']} onClick={() => handleDelete(id)}>Delete</button>
                    </div>
                ))}
        </>
    );
};

export default UserCard;
