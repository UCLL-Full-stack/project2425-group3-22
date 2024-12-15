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

const Activity: React.FC = () => {
    const router = useRouter();
    const { t } = useTranslation(); 

    const [poops, setPoops] = useState([]);
    const [isValidated, setIsValidated] = useState(false);

    useEffect(() => {
        setIsValidated(Helper.authorizeUser(router));
    }, [router]);

    useEffect(() => {
        const fetchProfilePoopsData = async () => {
            try {
                const response = await ProfileService.getProfilePoops();

                if (!response.ok) {
                    throw new Error('Failed to fetch profile poops');
                }

                const result = await response.json();
                setPoops(result);
            } catch (error: any) {
                console.error(error.message);
            }
        };

        fetchProfilePoopsData();
    }, []);

    if (!isValidated) {
        return null;
    }

    return (
        <>
            <Head>
                <title>{t("title.profile-activity")}</title>
            </Head>
            <MainNavigation />
            <main>
                <ProfileSidebar />
                <div className={styles.poopContainer}>
                    {poops.length > 0 ? (
                        poops.map((poop: poopItem) => <PoopPanel key={poop.poopID} poop={poop} />)
                    ) : (
                        <p>No poops available.</p>
                    )}
                </div>
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
            ...(await serverSideTranslations(locale ?? "en", ["common"])),
        },
    };
};

export default Activity;
