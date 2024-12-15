import styles from '@styles/Friends.module.css';

type Props = {
    user: { userID: number; username: string };
};

const OutgoingRequestItem: React.FC<Props> = ({ user }: Props) => {
    return (
        <div className={styles.friendItem}>
            {user.username}
            <div className={styles.spacer} />
            <button className={styles.cancelButton}>Cancel</button>
        </div>
    );
};

export default OutgoingRequestItem;
