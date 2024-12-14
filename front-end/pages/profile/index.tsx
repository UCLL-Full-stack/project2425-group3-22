import MainNavigation from '@components/mainNavigation';
import ProfileSidebar from '@components/profile/profileSidebar';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Helper from 'utils/helper';

const Profile: React.FC = () => {
    const router = useRouter();
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
                <title>Poopedia | Profile</title>
            </Head>
            <MainNavigation />
            <main>
                <ProfileSidebar />
                <p>Profile</p>
            </main>
        </>
    );
};

export default Profile;
