import React, {FC, ReactNode} from 'react';
import styles from './UserModal.module.scss';


interface UserModalProps {
    onClose: () => void
    content: ReactNode
}

const UserModal: FC<UserModalProps> = (props) => {
    const {onClose, content} = props

    return (
        <div className={styles.modalContainer} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                {content}
            </div>
        </div>
    );
};

export default UserModal;
