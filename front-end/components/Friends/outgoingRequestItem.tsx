import FriendsService from '@services/friendsService';
import styles from '@styles/Friends.module.css';

type Props = {
    user: { userID: number; username: string };
};

const OutgoingRequestItem: React.FC<Props> = ({ user }: Props) => {
    const cancelFriendRequest = async () => {
        const response = await FriendsService.cancelFriendRequest(user.userID);

        if (response.ok) {
            window.location.reload();
        } else {
            console.error('Failed to deny friend request');
        }
    };

    return (
        <div className={styles.friendItem}>
            {user.username}
            <div className={styles.spacer} />
            <button className={styles.cancelButton} onClick={cancelFriendRequest}>Cancel</button>
        </div>
    );
};

export default OutgoingRequestItem;
