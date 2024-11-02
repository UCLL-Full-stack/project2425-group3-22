import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Home: React.FC = () => {
    const router = useRouter();

    useEffect(() => {
        router.replace('/login');
    }, [router]);

    return null;
};

export default Home;
