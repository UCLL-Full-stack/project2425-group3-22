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

const Profile: React.FC = () => {
    const router = useRouter();
    const { t } = useTranslation();

    const [isValidated, setIsValidated] = useState(false);
    const [friends, setFriends] = useState([]);
    const [incoming, setIncoming] = useState([]);
    const [outgoing, setOutgoing] = useState([]);

    useEffect(() => {
        setIsValidated(Helper.authorizeUser(router));
    }, [router]);

    useEffect(() => {
        if (isValidated) {
            const fetchProfilePoopsData = async () => {
                try {
                    const response = await FriendsService.getFriends();

                    if (!response.ok) {
                        throw new Error('Failed to fetch friends');
                    }

                    const result = await response.json();
                    console.log(result);
                    setFriends(result.friends);
                    setIncoming(result.incoming);
                    setOutgoing(result.outgoing);
                } catch (error: any) {
                    console.error(error.message);
                }
            };

            fetchProfilePoopsData();
        }
    }, [isValidated]);

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
                    <FriendRequestList incomingRequests={incoming} outgoingRequests={outgoing} />
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
