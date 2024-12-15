import styles from '@styles/Friends.module.css';
import OutgoingRequestItem from './outgoingRequestItem';

type Props = {
    users: never[];
};

const OutgoingRequestList: React.FC<Props> = ({ users }: Props) => {
    return (
        <div className={styles.friendsList}>
            <h2>Outgoing requests</h2>
            {users.map((user: any) => (
                <OutgoingRequestItem user={user} />
            ))}
        </div>
    );
};

export default OutgoingRequestList;
