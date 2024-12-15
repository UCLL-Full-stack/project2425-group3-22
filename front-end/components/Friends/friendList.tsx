import styles from '@styles/Friends.module.css';
import FriendItem from './friendItem';

type Props = {
    users: never[];
};

const FriendList: React.FC<Props> = ({ users }: Props) => {
    return (
        <div className={styles.friendsList}>
            <h2>friends</h2>
            <input type="text" placeholder="Search ..." className={styles.search} />
            <hr />
            {users.length > 0 ? (
                users.map((user: any) => <FriendItem key={user.id} user={user} />)
            ) : (
                <p>No friends found.</p>
            )}
        </div>
    );
};

export default FriendList;
