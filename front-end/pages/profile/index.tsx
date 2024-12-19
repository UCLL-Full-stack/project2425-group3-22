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
import useSWR from 'swr';

const getData: any = async () => {
    const response = await Promise.all([
        ProfileService.getProfileAchievements(),
        FriendsService.getFriends(),
    ]);

    const [achievementsResponse, friendsResponse] = response;

    if (achievementsResponse.ok && friendsResponse.ok) {
        const achievements = await achievementsResponse.json();
        const friends = await friendsResponse.json();

        return {
            achievements,
            friendCount: friends.friends.length,
            newRequestCount: friends.incoming.length,
        };
    }
};

const Profile: React.FC = () => {
    const router = useRouter();
    const { t } = useTranslation();

    const [isValidated, setIsValidated] = useState(false);
    const { data } = useSWR('data', getData);
    const { achievements, friendCount, newRequestCount } = data || {};

    useEffect(() => {
        setIsValidated(Helper.authorizeUser(router));
    }, [router]);

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
                <div style={{ width: '100%' }}>
                    <ProfileOverview friendCount={friendCount} newRequestCount={newRequestCount} />
                    {achievements && <AchievementOverview Achievements={achievements} />}
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
