import MainNavigation from '@components/mainNavigation';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Helper from 'utils/helper';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import FriendsService from '@services/friendsService';
import styles from '@styles/Friends.module.css';
import FriendList from '@components/Friends/friendList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FriendRequestList from '@components/Friends/friendRequestList';
import useSWR from 'swr';

const getFriends: any = async () => {
    const response = await FriendsService.getFriends()

    if (response.ok) {
        const friends = await response.json();

        return {
            friends: friends.friends,
            incoming: friends.incoming,
            outgoing: friends.outgoing,
        };
    }
};

const Profile: React.FC = () => {
    const router = useRouter();
    const { t } = useTranslation();

    const [isValidated, setIsValidated] = useState(false);
    const [foundUsers, setFoundUsers] = useState([]);

    const { data } = useSWR('friends', getFriends);
    const { friends, incoming, outgoing } = data || {};

    useEffect(() => {
        setIsValidated(Helper.authorizeUser(router));
    }, [router]);

    const searchUsers = async (searchTerm: string) => {
        const response = await FriendsService.searchUsers(searchTerm);

        if (!response.ok) {
            console.error('Failed to search users');
            return;
        }

        const result = await response.json();
        setFoundUsers(result);
    }

    if (!isValidated) {
        return null;
    }

    return (
        <>
            <Head>
                <title>{t('title.profile-friends')}</title>
            </Head>
            <MainNavigation />
            <Link href="/profile" className={styles.backButton}>
                <FontAwesomeIcon icon="angle-left" />
            </Link>
            <main>
                <div className={styles.friendListsContainer}>
                    <FriendList users={friends} />
                    <FriendRequestList incomingRequests={incoming} outgoingRequests={outgoing} searchUsers={searchUsers} foundUserData={foundUsers} />
                </div>
            </main>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { locale } = context;
    return {
        props: {
            ...(await serverSideTranslations(locale ?? 'en', ['common'])),
        },
    };
};

export default Profile;
