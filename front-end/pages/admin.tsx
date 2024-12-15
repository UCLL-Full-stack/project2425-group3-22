import MainNavigation from '@components/mainNavigation';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Helper from 'utils/helper';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

const Profile: React.FC = () => {
    const router = useRouter();
    const { t } = useTranslation(); 

    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        setIsAdmin(Helper.authorizeAdmin(router));
    }, [router]);

    if (!isAdmin) {
        return null;
    }

    return (
        <>
            <Head>
                <title>{t("title.admin")}</title>
            </Head>
            <MainNavigation />
            <main>
                <p>admin</p>
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
