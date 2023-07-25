import React, {useEffect, useState} from 'react';
import styles from './UserCard.module.scss';
import {useSelector} from 'react-redux';
import {AppRootStateType} from '../../redux/store/store';
import {deleteUser, getUsersThunk} from '../../redux/reducers/usersReducer';
import {useAppDispatch} from '../../redux/hooks/dispatch-hook';
import UserModal from "../Modal/UserModal";
import {User} from "../../types/UserTypes";
import {textHighLighting} from "../../utils/textHighLighting";

const UserCard = () => {

    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getUsersThunk())
    }, [dispatch])

    const users = useSelector<AppRootStateType, User[]>((state) => state.users.users)
    const filteredUsers = useSelector<AppRootStateType, User[]>((state) => state.users.filteredUsers)
    const searchData = useSelector<AppRootStateType, string>((state) => state.users.searchData)

    const handleDelete = (id: number) => {
        dispatch(deleteUser(id))
    }

    const openUserModal = (user: User) => {
        setSelectedUser(user);
    };

    const userToDisplay = searchData === '' ? users : filteredUsers

    return (
        <>
            {userToDisplay.length === 0
                ? <div className={styles['empty-users-message']}>No users found</div>
                : userToDisplay.map((user) => (
                    <div className={styles['user-card']} key={user.id} onClick={() => openUserModal(user)}>
                        <div className={styles['user-card-title']}><strong>Name:</strong>{textHighLighting(`${user.name}`, searchData)}</div>
                        <div className={styles['user-card-title']}><strong>Username:</strong>{textHighLighting(`${user.username}`, searchData)}</div>
                        <div className={styles['user-card-title']}><strong>Email:</strong>{textHighLighting(`${user.email}`, searchData)}</div>
                        <button className={styles['delete-button']} onClick={(e) => {e.stopPropagation(); handleDelete(user.id);}}>Delete</button>
                    </div>
                ))}
            {selectedUser && <UserModal user={selectedUser} onClose={() => setSelectedUser(null)} onDelete={handleDelete}/>}
        </>
    );

};

export default UserCard;
