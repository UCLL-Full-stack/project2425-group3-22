import MainNavigation from '@components/mainNavigation';
import ProfileSidebar from '@components/profile/profileSidebar';
import Head from 'next/head';
import { useRouter } from 'next/router';

const Statistics: React.FC = () => {
    const router = useRouter();

    return (
        <>
            <Head>
                <title>Poopedia | Profile - Statistics</title>
            </Head>
            <MainNavigation />
            <main>
                <ProfileSidebar />
                <p>Statistics</p>
            </main>
        </>
    );
};

export default Statistics;
