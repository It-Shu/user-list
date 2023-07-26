import React, {useCallback, useEffect, useMemo, useState} from 'react';
import styles from './UsersCards.module.scss';
import {deleteUserAC, getUsersThunk} from '../../redux/reducers/usersReducer';
import {useAppDispatch} from '../../redux/hooks/useAppDispatch';
import UserModal from '../Modal/UserModal';
import {User} from '../../types/UserTypes';
import UserModalContent from '../Modal/UserModalContent';
import Loader from '../Loader/Loader';
import {useAppSelector} from '../../redux/hooks/useAppSelector';
import UserCard from './UserCard/UserCard';

const UsersCards = () => {

    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    const users = useAppSelector((state) => state.users.users)
    const searchData = useAppSelector((state) => state.users.searchData)
    const errorMessage = useAppSelector((state) => state.users.errorMessage)

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getUsersThunk())
    }, [])

    const handleDelete = useCallback((id: number) => {
        dispatch(deleteUserAC(id));
    }, [dispatch]);

    const closeUserModal = () => {
        setSelectedUser(null);
    }

    const matchSearch = (data: string) => {
        return data.toLowerCase().includes(searchData.trim().toLowerCase())
    }

    const usersFilter = useMemo(() => {
        return users.filter(user => matchSearch(user.name) || matchSearch(user.username) || matchSearch(user.email));
    }, [users, searchData]);

    if (errorMessage) {
        return <div className={styles.emptyUsersMessage}>User list request error</div>
    }

    if (users.length === 0 && searchData === '') {
        return <Loader/>
    }

    if (searchData !== '' && usersFilter.length === 0) {
        return <div className={styles.emptyUsersMessage}>No users found</div>
    }

    return (
        <>
            <div className={styles.headers}>
                <div className={styles.headerTitleContainer}>
                    <div className={styles.headerTitle}>Name</div>
                    <div className={styles.headerTitle}>Username</div>
                    <div className={styles.headerTitle}>Email</div>
                </div>
            </div>

            <UserCard usersFilter={usersFilter} setSelectedUser={setSelectedUser} handleDelete={handleDelete}/>

            {selectedUser
            && <UserModal
                content={
                    <UserModalContent
                        user={selectedUser}
                        onDelete={handleDelete}
                        onClose={closeUserModal}
                    />
                } onClose={closeUserModal}/>}
        </>
    );

};

export default UsersCards;
