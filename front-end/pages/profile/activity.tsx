import MainNavigation from '@components/mainNavigation';
import ProfileSidebar from '@components/profile/profileSidebar';
import Head from 'next/head';
import { useRouter } from 'next/router';

const Activity: React.FC = () => {
    const router = useRouter();

    return (
        <>
            <Head>
                <title>Activity</title>
            </Head>
            <MainNavigation />
            <main>
                <ProfileSidebar />
                <p>Activity</p>
            </main>
        </>
    );
};

export default Activity;
