import FriendsService from '@services/friendsService';
import styles from '@styles/Friends.module.css';
import { useTranslation } from 'next-i18next';

type Props = {
    user: { userID: number; username: string };
};

const AddUserItem: React.FC<Props> = ({ user }: Props) => {
    const { t } = useTranslation();

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
            <button className={styles.addButton} onClick={addFriend}>{t('friends.add')}</button>
        </div>
    );
};

export default AddUserItem;
