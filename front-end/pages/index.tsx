import ProfileSidebar from '@components/profile/profileSidebar';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Home: React.FC = () => {
    const router = useRouter();
    const [userID, setUserID] = useState('');
    const [isValidated, setIsValidated] = useState(false);

    useEffect(() => {
        const storedUserID = sessionStorage.getItem('userID')?.toString() || '';
        setUserID(storedUserID);

        if (!storedUserID) {
            router.replace('/login');
        }
        else {
            setIsValidated(true);
        }
    }, [router]);


    if (!isValidated) {
        return null;
    }

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
