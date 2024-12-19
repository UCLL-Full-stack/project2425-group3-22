import styles from '@styles/Friends.module.css';
import FriendItem from './friendItem';
import { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';

type Props = {
    users: any[];
};

const FriendList: React.FC<Props> = ({ users }: Props) => {
    const { t } = useTranslation();
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filteredUsers, setFilteredUsers] = useState<any[]>(users);

    useEffect(() => {
        if (searchTerm != '') {
            setFilteredUsers(
                users.filter((user) =>
                    user.username.toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
        } else {
            setFilteredUsers(users);
        }
    }, [searchTerm, users]);

    return (
        <div className={styles.friendsList}>
            <h2>{t('friends.friends')}</h2>
            <input
                type="text"
                placeholder={t('friends.searchFriend')}
                className={styles.search}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <hr />
            <div className={styles.scrollable}>
                {filteredUsers && filteredUsers.length > 0 ? (
                    filteredUsers.map((user: any) => <FriendItem key={user.userID} user={user} />)
                ) : (
                    <p>{t('friends.noFriends')}</p>
                )}
            </div>
        </div>
    );
};

export default FriendList;
