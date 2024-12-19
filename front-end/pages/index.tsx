import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import MainNavigation from '@components/mainNavigation';
import Helper from 'utils/helper';
import AddPoopButton from '@components/addPoopButton';
import ScrollToTopButton from '@components/scrollToTopButton';
import { poopItem } from '@types';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { GetServerSideProps } from 'next';
import useSWR from 'swr';
import PoopService from '@services/poopService';
import PoopContainer from '@components/poopContainer';

const getPoops = async () => {
    const response = await PoopService.getPoops();
    if (response.ok) {
        return response.json();
    }
};

const Home: React.FC = () => {
    const { t } = useTranslation();

    const router = useRouter();
    const [isValidated, setIsValidated] = useState(false);
    const { data: poops, isLoading, error } = useSWR<poopItem[]>('poops', getPoops);

    useEffect(() => {
        setIsValidated(Helper.authorizeUser(router));
    }, [router]);

    if (!isValidated) {
        return null;
    }

    return (
        <>
            <Head>
                <title>{t('title.index')}</title>
            </Head>
            <MainNavigation />
            <main>
                <PoopContainer isLoading={isLoading} error={error} poops={poops!} />
                <AddPoopButton />
                <ScrollToTopButton />
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

export default Home;
