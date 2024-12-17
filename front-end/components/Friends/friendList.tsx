import styles from '@styles/Friends.module.css';
import FriendItem from './friendItem';

type Props = {
    users: never[];
};

const FriendList: React.FC<Props> = ({ users }: Props) => {
    return (
        <div className={styles.friendsList}>
            <h2>friends</h2>
            <input type="text" placeholder="Search friend ..." className={styles.search} />
            <hr />
            <div className={styles.scrollable}>
                {users.length > 0 ? (
                    users.map((user: any) => <FriendItem key={user.userID} user={user} />)
                ) : (
                    <p>No friends found.</p>
                )}
            </div>
        </div>
    );
};

export default FriendList;
