import MainNavigation from '@components/mainNavigation';
import ProfileSidebar from '@components/profile/profileSidebar';
import Head from 'next/head';
import styles from '@styles/Home.module.css';
import { useEffect, useState } from 'react';
import ProfileService from '@services/profileService';
import PoopPanel from '@components/poopPanel';
import AddPoopButton from '@components/addPoopButton';
import ScrollToTopButton from '@components/scrollToTopButton';
import { poopItem } from '@types';
import Helper from 'utils/helper';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import useSWR from 'swr';
import PoopContainer from '@components/poopContainer';

const getProfilePoops = async () => {
    const response = await ProfileService.getProfilePoops();
    if (response.ok) {
        return response.json();
    }
};

const Activity: React.FC = () => {
    const router = useRouter();
    const { t } = useTranslation();

    const { data: poops, isLoading, error } = useSWR<poopItem[]>('profilePoops', getProfilePoops);
    const [isValidated, setIsValidated] = useState(false);

    useEffect(() => {
        setIsValidated(Helper.authorizeUser(router));
    }, [router]);

    if (!isValidated) {
        return null;
    }

    return (
        <>
            <Head>
                <title>{t('title.profile-activity')}</title>
            </Head>
            <MainNavigation />
            <main>
                <ProfileSidebar />
                <PoopContainer isLoading={isLoading} error={error} poops={poops!} />
            </main>
            <AddPoopButton />
            <ScrollToTopButton />
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

export default Activity;
