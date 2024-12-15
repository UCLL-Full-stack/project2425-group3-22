import styles from '@styles/Friends.module.css';

type Props = {
    user: { userID: number; username: string };
};

const IncomingRequestItem: React.FC<Props> = ({ user }: Props) => {
    return (
        <div className={styles.friendItem}>
            {user.username}
            <div className={styles.spacer} />
            <button className={styles.acceptButton}>Accept</button>
            <button className={styles.denyButton}>Deny</button>
        </div>
    );
};

export default IncomingRequestItem;
