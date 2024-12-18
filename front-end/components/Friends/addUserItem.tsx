import FriendsService from '@services/friendsService';
import styles from '@styles/Friends.module.css';

type Props = {
    user: { userID: number; username: string };
};

const AddUserItem: React.FC<Props> = ({ user }: Props) => {

    const addFriend = async () => {
        const response = await FriendsService.addFriend(user.userID);

        if (response.ok) {
            window.location.reload();
        } else {
            console.error('Failed to remove friend');
        }
    };

    return (
        <div className={styles.friendItem}>
            {user.username}
            <div className={styles.spacer} />
            <button className={styles.addButton} onClick={addFriend}>Add</button>
        </div>
    );
};

export default AddUserItem;
