import MainNavigation from '@components/mainNavigation';
import ProfileSidebar from '@components/profile/profileSidebar';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Helper from 'utils/helper';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import ProfileOverview from '@components/profile/profileOverview';
import FriendsService from '@services/friendsService';

const Profile: React.FC = () => {
    const router = useRouter();
    const { t } = useTranslation(); 
    
    const [isValidated, setIsValidated] = useState(false);
    const [friendCount, setFriendCount] = useState(0);
    const [newRequestCount, setNewRequestCount] = useState(0);

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
                    setFriendCount(result.friends.length);
                    setNewRequestCount(result.incoming.length);
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
                <title>{t("title.profile")}</title>
            </Head>
            <MainNavigation />
            <main>
                <ProfileSidebar />
                <ProfileOverview friendCount={friendCount} newRequestCount={newRequestCount} />
            </main>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { locale } = context;
    return {
        props: {
            ...(await serverSideTranslations(locale ?? "en", ["common"])),
        },
    };
};

export default Profile;
