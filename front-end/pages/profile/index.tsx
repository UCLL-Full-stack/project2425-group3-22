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
import ProfileService from '@services/profileService';
import AchievementOverview from '@components/profile/achievementOverview';
import { achievementItem } from '@types';

const Profile: React.FC = () => {
    const router = useRouter();
    const { t } = useTranslation();

    const [isValidated, setIsValidated] = useState(false);
    const [friendCount, setFriendCount] = useState(0);
    const [newRequestCount, setNewRequestCount] = useState(0);
    const [achievements, setAchievements] = useState<achievementItem[]>([]);

    useEffect(() => {
        setIsValidated(Helper.authorizeUser(router));
    }, [router]);

    useEffect(() => {
        if (isValidated) {
            const fetchFriendCounts = async () => {
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

            fetchFriendCounts();
        }
    }, [isValidated]);

    useEffect(() => {
        if (isValidated) {
            const fetchProfileAchievementData = async () => {
                try {
                    const response = await ProfileService.getProfileAchievements();

                    if (!response.ok) {
                        throw new Error('Failed to fetch friends');
                    }

                    const result = await response.json();
                    setAchievements(result);
                } catch (error: any) {
                    console.error(error.message);
                }
            };

            fetchProfileAchievementData();
        }
    }, [isValidated]);

    if (!isValidated) {
        return null;
    }

    return (
        <>
            <Head>
                <title>{t('title.profile')}</title>
            </Head>
            <MainNavigation />
            <main>
                <ProfileSidebar />
                <div style={{width: "100%"}}>
                    <ProfileOverview friendCount={friendCount} newRequestCount={newRequestCount} />
                    <AchievementOverview Achievements={achievements} />
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
