import MainNavigation from '@components/mainNavigation';
import ProfileSidebar from '@components/profile/profileSidebar';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Helper from 'utils/helper';

const Profile: React.FC = () => {
    const router = useRouter();
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
                <title>Poopedia | Admin</title>
            </Head>
            <MainNavigation />
            <main>
                <p>admin</p>
            </main>
        </>
    );
};

export default Profile;
