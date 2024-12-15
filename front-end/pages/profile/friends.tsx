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
import FriendItem from '@components/Friends/friendItem';
import IncomingRequestItem from '@components/Friends/incomingRequestItem';
import OutgoingRequestItem from '@components/Friends/outgoingRequestItem';

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
                        throw new Error('Failed to fetch poops');
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
            <main>
                <Link href="/profile">Back</Link>

                <div>
                    <h2>friends</h2>

                    {friends.length > 0 ? (
                        <div>
                            {friends.map((user: any) => (
                                <FriendItem user={user} />
                            ))}
                        </div>
                    ) : (
                        <p>No friends</p>
                    )}
                </div>

                <div>
                    <h2>incoming</h2>
                    {incoming.length > 0 ? (
                        <div>
                            {incoming.map((user: any) => (
                                <IncomingRequestItem user={user} />
                            ))}
                        </div>
                    ) : (
                        <p>No incoming requests</p>
                    )}
                </div>

                <div>
                    <h2>outgoing</h2>
                    {outgoing.length > 0 ? (
                        <div>
                            {outgoing.map((user: any) => (
                                <OutgoingRequestItem user={user} />
                            ))}
                        </div>
                    ) : (
                        <p>No outgoing requests</p>
                    )}
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
