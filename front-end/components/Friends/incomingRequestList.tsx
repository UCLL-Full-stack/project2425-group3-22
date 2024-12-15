import styles from '@styles/Friends.module.css';
import IncomingRequestItem from './incomingRequestItem';

type Props = {
    users: never[];
};

const IncomingRequestList: React.FC<Props> = ({ users }: Props) => {
    return (
        <div className={styles.friendsList}>
            <h2>Incoming requests</h2>
            {users.map((user: any) => (
                <IncomingRequestItem user={user} />
            ))}
        </div>
    );
};

export default IncomingRequestList;
