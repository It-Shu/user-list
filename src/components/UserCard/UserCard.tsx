import React, {useEffect, useState} from 'react';
import styles from './UserCard.module.scss';
import {useSelector} from 'react-redux';
import {AppRootStateType} from '../../redux/store/store';
import {deleteUser, getUsersThunk} from '../../redux/reducers/usersReducer';
import {useAppDispatch} from '../../redux/hooks/dispatch-hook';
import UserModal from '../Modal/UserModal';
import {User} from '../../types/UserTypes';
import {textHighLighting} from '../../utils/textHighLighting';
import UserModalContent from '../Modal/UserModalContent';
import Loader from '../loader/Loader';

const UserCard = () => {

    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getUsersThunk())
    }, [])

    const users = useSelector<AppRootStateType, User[]>((state) => state.users.users)
    const filteredUsers = useSelector<AppRootStateType, User[]>((state) => state.users.filteredUsers)
    const searchData = useSelector<AppRootStateType, string>((state) => state.users.searchData)
    const errorMessage = useSelector<AppRootStateType, string>((state) => state.users.errorMessage)

    const handleDelete = (id: number) => {
        dispatch(deleteUser(id))
    }

    const closeUserModal = () => {
        setSelectedUser(null);
    };

    const userToDisplay = searchData === '' ? users : filteredUsers

    if (errorMessage) {
        return <div className={styles.emptyUsersMessage}>User list request error</div>
    }
    if (userToDisplay.length === 0 && searchData === '') {
        return <Loader/>
    }
    if (searchData !== '' && filteredUsers.length === 0) {
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

            {userToDisplay.map((user) => (
                <div className={styles.userCard} key={user.id} onClick={() => setSelectedUser(user)}>
                    <div className={styles.userCardTitleContainer}>
                        <div className={styles.userCardTitle}>
                            <strong className={styles.mobileTitle}>Name:</strong>
                            {textHighLighting(user.name, searchData)}
                        </div>
                        <div className={styles.userCardTitle}>
                            <strong className={styles.mobileTitle}>Username:</strong>
                            {textHighLighting(user.username, searchData)}
                        </div>
                        <div className={styles.userCardTitle}>
                            <strong className={styles.mobileTitle}>Email:</strong>
                            <div className={styles.userCardEmailTitle}>
                                {textHighLighting(user.email, searchData)}
                            </div>
                        </div>
                    </div>
                    <button className={styles.deleteButton} onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(user.id);
                    }}>Del
                    </button>
                </div>
            ))}

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

export default UserCard;
