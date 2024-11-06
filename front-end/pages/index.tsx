import ProfileSidebar from '@components/profile/profileSidebar';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Home: React.FC = () => {
    const router = useRouter();
    const [userID, setUserID] = useState('');

    useEffect(() => {
        const storedUserID = sessionStorage.getItem('userID')?.toString() || '';
        setUserID(storedUserID);

        if (!storedUserID) {
            router.replace('/login');
        }
    }, [router]);

    return (
        <>
            <Head>
                <title>Home</title>
            </Head>
            <main>
                <ProfileSidebar />
                <p>test</p>
                {userID && (
                    <p>
                        homepage <br />
                        userID: {userID}
                    </p>
                )}
            </main>
        </>
    );
};

export default Home;
