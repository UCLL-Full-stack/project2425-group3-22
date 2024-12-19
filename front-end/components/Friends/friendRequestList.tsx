import styles from '@styles/Friends.module.css';
import IncomingRequestItem from './incomingRequestItem';
import OutgoingRequestItem from './outgoingRequestItem';
import { useEffect, useState } from 'react';
import AddUserItem from './addUserItem';
import { useTranslation } from 'next-i18next';

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
    const { t } = useTranslation();

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
            <h2>{t('friends.friendRequests')}</h2>
            <input
                type="text"
                placeholder={t('friends.addUser')}
                className={styles.search}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <hr />
            <div className={styles.scrollable}>
                {foundUsers.length > 0 && (
                    <>
                        {foundUsers.map((user: any) => (
                            <AddUserItem key={user.userID} user={user} />
                        ))}
                        <hr />
                    </>
                )}
                {incomingRequests && incomingRequests.length > 0 ? (
                    <>
                        <strong>{t('friends.incomingRequests')}:</strong>
                        {incomingRequests.map((user: any) => (
                            <IncomingRequestItem key={user.userID} user={user} />
                        ))}
                    </>
                ) : (
                    <p>{t('friends.noIncomingRequests')}</p>
                )}
                {outgoingRequests && outgoingRequests.length > 0 && (
                    <>
                        <strong>{t('friends.outgoingRequests')}:</strong>
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
