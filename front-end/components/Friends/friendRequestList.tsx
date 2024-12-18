import styles from '@styles/Friends.module.css';
import IncomingRequestItem from './incomingRequestItem';
import OutgoingRequestItem from './outgoingRequestItem';
import { useEffect, useState } from 'react';
import FriendsService from '@services/friendsService';
import AddUserItem from './addUserItem';

type Props = {
    incomingRequests: any[];
    outgoingRequests: any[];
    searchUsers: (value: string) => void;
    foundUserData: any[];
};

const FriendRequestList: React.FC<Props> = ({
    incomingRequests,
    outgoingRequests,
    searchUsers,
    foundUserData,
}: Props) => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [foundUsers, setFoundUsers] = useState<any[]>(foundUserData);

    useEffect(() => {
        if (searchTerm == '') {
            setFoundUsers([]);
            return;
        }

        const handler = setTimeout(() => {
            if (searchTerm != '') {
                searchUsers(searchTerm);
            }
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [searchTerm]);

    useEffect(() => {
        setFoundUsers(foundUserData);
    }, [foundUserData]);

    return (
        <div className={styles.friendsList}>
            <h2>Friend Requests</h2>
            <input
                type="text"
                placeholder="Add user ..."
                className={styles.search}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <hr />
            <div className={styles.scrollable}>
                {foundUsers.length > 0 && (
                    <>
                        {foundUsers.map((user: any) => (
                            <AddUserItem key={user.userID} user={user}/>
                        ))}
                        <hr />
                    </>
                )}
                {incomingRequests.length > 0 ? (
                    <>
                        <strong>Incoming requests:</strong>
                        {incomingRequests.map((user: any) => (
                            <IncomingRequestItem key={user.userID} user={user} />
                        ))}
                    </>
                ) : (
                    <p>No incoming friend requests.</p>
                )}
                {outgoingRequests.length > 0 && (
                    <>
                        <strong>Sent requests:</strong>
                        {outgoingRequests.map((user: any) => (
                            <OutgoingRequestItem key={user.userID} user={user} />
                        ))}
                    </>
                )}
            </div>
        </div>
    );
};

export default FriendRequestList;
