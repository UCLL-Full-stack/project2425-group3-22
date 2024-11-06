import ProfileSidebar from '@components/profile/profileSidebar';
import Head from 'next/head';
import { useRouter } from 'next/router';

const Map: React.FC = () => {
    const router = useRouter();

    return (
        <>
            <Head>
                <title>Map</title>
            </Head>
            <main>
                <ProfileSidebar />
                <p>Map</p>
            </main>
        </>
    );
};

export default Map;
