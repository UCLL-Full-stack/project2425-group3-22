import ProfileSidebar from '@components/profile/profileSidebar';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ProfileService from '@services/profileService';
import PoopPanel from '@components/poopPanel';
import styles from '@styles/Home.module.css';
import MainNavigation from '@components/mainNavigation';
import Link from 'next/link';

const Home: React.FC = () => {
    const router = useRouter();
    const [userID, setUserID] = useState<number | null>(null);
    const [isValidated, setIsValidated] = useState(false);
    const [poops, setPoops] = useState([]);
    const [isAtTop, setIsAtTop] = useState(true);

    useEffect(() => {
        const storedUserID = sessionStorage.getItem('userID')?.toString() || '';
        setUserID(parseInt(storedUserID));

        if (!storedUserID) {
            router.replace('/login');
        } else {
            setIsValidated(true);
        }
    }, [router]);

    useEffect(() => {
        if (userID) {
            const fetchProfilePoopsData = async () => {
                try {
                    const response = await ProfileService.getProfilePoops(userID);

                    if (!response.ok) {
                        throw new Error('Failed to fetch profile poops');
                    }

                    const result = await response.json();
                    console.log(result);
                    setPoops(result);
                } catch (error: any) {
                    console.error(error.message);
                }
            };

            fetchProfilePoopsData();
        }
    }, [userID]);

    useEffect(() => {
        const handleScroll = () => {
            setIsAtTop(window.scrollY === 0);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (!isValidated) {
        return null;
    } else
        return (
            <>
                <Head>
                    <title>Home</title>
                </Head>
                <MainNavigation isAdmin={false} />
                <main>
                    <div className={styles.poopContainer}>
                        {poops.length > 0 ? (
                            poops.map((poop, index) => <PoopPanel key={index} poop={poop} />)
                        ) : (
                            <p>No poops available.</p>
                        )}
                    </div>
                </main>
                <Link href="/add" className={styles.addPoopButton}>
                    +
                </Link>
                <button
                    className={`${styles.scrollToTop} ${isAtTop ? styles.hidden : ''}`}
                    onClick={scrollToTop}
                >
                    ^
                </button>
            </>
        );
};

export default Home;
