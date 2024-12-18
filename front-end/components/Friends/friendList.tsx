import styles from '@styles/Friends.module.css';
import FriendItem from './friendItem';
import { useEffect, useState } from 'react';

type Props = {
    users: any[];
};

const FriendList: React.FC<Props> = ({ users }: Props) => {
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
            <h2>friends</h2>
            <input
                type="text"
                placeholder="Search friend ..."
                className={styles.search}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <hr />
            <div className={styles.scrollable}>
                {filteredUsers.length > 0 ? (
                    filteredUsers.map((user: any) => <FriendItem key={user.userID} user={user} />)
                ) : (
                    <p>No friends found.</p>
                )}
            </div>
        </div>
    );
};

export default FriendList;
