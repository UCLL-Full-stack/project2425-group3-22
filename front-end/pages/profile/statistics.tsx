import ProfileSidebar from '@components/profile/profileSidebar';
import Head from 'next/head';
import { useRouter } from 'next/router';

const Statistics: React.FC = () => {
    const router = useRouter();

    return (
        <>
            <Head>
                <title>Statistics</title>
            </Head>
            <main>
                <ProfileSidebar />
                <p>Statistics</p>
            </main>
        </>
    );
};

export default Statistics;
