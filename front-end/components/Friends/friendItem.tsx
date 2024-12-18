import FriendsService from '@services/friendsService';
import styles from '@styles/Friends.module.css';
import { useTranslation } from 'next-i18next';

type Props = {
    user: { userID: number; username: string };
};

const FriendItem: React.FC<Props> = ({ user }: Props) => {
    const { t } = useTranslation();

    const removeFriend = async () => {
        const isConfirmed = window.confirm("Are you sure you want to remove this friend?");

        if (!isConfirmed) {
            return;
        }

        const response = await FriendsService.removeFriend(user.userID);

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
            <button className={styles.removeButton} onClick={removeFriend}>{t('friends.remove')}</button>
        </div>
    );
};

export default FriendItem;
