import MainNavigation from '@components/mainNavigation';
import PoopSVG from '@components/PoopTypes/poopSVG';
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
            <MainNavigation />
            <main>
                <p>Add</p>
                <PoopSVG />
            </main>
        </>
    );
};

export default Add;
