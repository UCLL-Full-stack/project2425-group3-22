import styles from '@styles/Friends.module.css';
import IncomingRequestItem from './incomingRequestItem';
import OutgoingRequestItem from './outgoingRequestItem';

type Props = {
    incomingRequests: never[];
    outgoingRequests: never[];
};

const FriendRequestList: React.FC<Props> = ({ incomingRequests, outgoingRequests }: Props) => {
    return (
        <div className={styles.friendsList}>
            <h2>Friend Requests</h2>
            <input type="text" placeholder="Add user ..." className={styles.search} />
            <hr />
            <div>
                {incomingRequests.length > 0 ? (
                    <div className={styles.scrollable}>
                        <strong>Incoming requests:</strong>
                        {incomingRequests.map((user: any) => (
                            <IncomingRequestItem key={user.userID} user={user} />
                        ))}
                    </div>
                ) : (
                    <p>No incoming friend requests.</p>
                )}
                {outgoingRequests.length > 0 && (
                    <div className={styles.scrollable}>
                        <strong>Sent requests:</strong>
                        {outgoingRequests.map((user: any) => (
                            <OutgoingRequestItem key={user.userID} user={user} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default FriendRequestList;
