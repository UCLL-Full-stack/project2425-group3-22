import MainNavigation from '@components/mainNavigation';
import ProfileSidebar from '@components/profile/profileSidebar';
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
                <title>{t("title.profile")}</title>
            </Head>
            <MainNavigation />
            <main>
                <ProfileSidebar />
                <p>Profile</p>
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
