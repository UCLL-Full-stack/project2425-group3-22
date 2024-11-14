import MainNavigation from '@components/mainNavigation';
import ProfileSidebar from '@components/profile/profileSidebar';
import Head from 'next/head';
import { useRouter } from 'next/router';

const Add: React.FC = () => {
    const router = useRouter();

    return (
        <>
            <Head>
                <title>Add</title>
            </Head>
            <MainNavigation isAdmin={false} />
            <main>
                <p>Add</p>
            </main>
        </>
    );
};

export default Add;
