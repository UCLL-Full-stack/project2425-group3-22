import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import PoopPanel from '@components/poopPanel';
import styles from '@styles/Home.module.css';
import MainNavigation from '@components/mainNavigation';
import Helper from 'utils/helper';
import AddPoopButton from '@components/addPoopButton';
import ScrollToTopButton from '@components/scrollToTopButton';
import { poopItem } from '@types';
import PoopService from '@services/poopService';
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from 'next-i18next';
import { GetServerSideProps } from 'next';

const Home: React.FC = () => {
    const { t } = useTranslation(); 

    const router = useRouter();
    const [isValidated, setIsValidated] = useState(false);
    const [poops, setPoops] = useState([]);

    useEffect(() => {
        setIsValidated(Helper.authorizeUser(router));
    }, [router]);

    useEffect(() => {
        if (isValidated) {
            const fetchProfilePoopsData = async () => {
                try {
                    const response = await PoopService.getPoops();

                    if (!response.ok) {
                        throw new Error('Failed to fetch poops');
                    }

                    const result = await response.json();
                    setPoops(result);
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
                <title>{t("title.index")}</title>
            </Head>
            <MainNavigation />
            <main>
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

export default Home;
