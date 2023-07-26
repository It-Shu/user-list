import React, {FC} from 'react';
import styles from './UserCard.module.scss';
import {HighLighting} from '../../HighLighting/HighLighting';
import {User} from '../../../types/UserTypes';
import {useAppSelector} from '../../../redux/hooks/useAppSelector';

interface UserCardProps {
    usersFilter: User[]
    setSelectedUser: (user: User) => void
    handleDelete: (id: number) => void
}

const UserCard: FC<UserCardProps> = React.memo((props) => {

    const {usersFilter, setSelectedUser, handleDelete} = props

    const searchData = useAppSelector((state) => state.users.searchData)

    return (
        <>
            {usersFilter.map((user) => (
                <div className={styles.userCard} key={user.id} onClick={() => setSelectedUser(user)}>
                    <div className={styles.userCardTitleContainer}>
                        <div className={styles.userCardTitle}>
                            <strong className={styles.mobileTitle}>Name:</strong>
                            {HighLighting(user.name, searchData)}
                        </div>
                        <div className={styles.userCardTitle}>
                            <strong className={styles.mobileTitle}>Username:</strong>
                            {HighLighting(user.username, searchData)}
                        </div>
                        <div className={styles.userCardTitle}>
                            <strong className={styles.mobileTitle}>Email:</strong>
                            <div className={styles.userCardEmailTitle}>
                                {HighLighting(user.email, searchData)}
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
        </>
    );
});

export default UserCard;
