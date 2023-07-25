import React, {FC} from 'react';
import styles from './UserModal.module.scss';
import {User} from "../../types/UserTypes";


interface UserModalProps {
    user: User
    onClose: () => void
    onDelete: (id: number) => void
}

const UserModal: FC<UserModalProps> = (props) => {
    const {user, onClose, onDelete} = props

    const deleteSelectedUser = () => {
        onDelete(user.id)
        onClose()
    }

    return (
        <div className={styles['modal-container']} onClick={onClose}>
            <div className={styles['modal-content']} onClick={(e) => e.stopPropagation()}>
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Company:</strong> {user.company.name}</p>
                <p><strong>Address:</strong> {user.address.street}, {user.address.city}</p>
                <div className={styles['buttons-container']}>
                    <button className={styles['close-button']} onClick={onClose}>Close</button>
                    <button className={styles['delete-button']} onClick={deleteSelectedUser}>Delete</button>
                </div>
            </div>
        </div>
    );
};

export default UserModal;
