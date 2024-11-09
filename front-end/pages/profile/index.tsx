import ProfileSidebar from '@components/profile/profileSidebar';
import Head from 'next/head';
import { useRouter } from 'next/router';

const Profile: React.FC = () => {
    const router = useRouter();

    return (
        <>
            <Head>
                <title>Profile</title>
            </Head>
            <main>
                <ProfileSidebar />
                <p>Profile</p>
            </main>
        </>
    );
};

export default Profile;