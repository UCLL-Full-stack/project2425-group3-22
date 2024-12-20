import FriendsService from '@services/friendsService';
import styles from '@styles/Friends.module.css';
import { useTranslation } from 'next-i18next';

type Props = {
    user: { userID: number; username: string };
};

const IncomingRequestItem: React.FC<Props> = ({ user }: Props) => {
    const { t } = useTranslation();
    
    const acceptFriendRequest = async () => {
        const response = await FriendsService.acceptFriendRequest(user.userID);

        if (response.ok) {
            window.location.reload();
        } else {
            console.error('Failed to accept friend');
        }
    };

    const refuseFriendRequest = async () => {
        const isConfirmed = window.confirm("Are you sure you want to deny this friend request?");

        if (!isConfirmed) {
            return;
        }

        const response = await FriendsService.refuseFriendRequest(user.userID);

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
            <button className={styles.acceptButton} onClick={acceptFriendRequest}>{t('friends.accept')}</button>
            <button className={styles.denyButton} onClick={refuseFriendRequest}>{t('friends.deny')}</button>
        </div>
    );
};

export default IncomingRequestItem;
