import React, {FC} from 'react';
import styles from './UserModalContent.module.scss';
import {User} from '../../types/UserTypes';

interface UserModalContentProps {
    user: User
    onDelete: (id: number) => void
    onClose: () => void
}

const UserModalContent: FC<UserModalContentProps> = (props) => {

    const {user, onDelete, onClose} = props

    const deleteSelectedUser = () => {
        onDelete(user.id)
        onClose()
    }

    return (
        <>
            <div className={styles.modalTitles}>
                <div className={styles.ModalUserName}><strong>{user.name}</strong></div>
                <div className={styles.modalTitleContainer}>
                    <div className={styles.modalTitle}> <strong>Company:</strong></div>
                    <div className={styles.modalTitle}>{user.company.name}</div>
                </div>
                <div className={styles.modalTitleContainer}>
                    <div className={styles.modalTitle}> <strong>Address:</strong></div>
                    <div className={styles.modalTitle}>{user.address.street}, {user.address.city}, {user.address.suite}</div>
                </div>
            </div>
            <div className={styles.buttonsContainer}>
                <button className={styles.closeButton} onClick={onClose}>Close</button>
                <button className={styles.deleteButton} onClick={deleteSelectedUser}>Delete</button>
            </div>
        </>
    );
};

export default UserModalContent;
