import ProfileSidebar from '@components/profile/profileSidebar';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ProfileService from '@services/profileService';
import PoopPanel from '@components/poopPanel';
import styles from '@styles/Home.module.css';
import MainNavigation from '@components/mainNavigation';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Helper from 'utils/helper';
import AddPoopButton from '@components/addPoopButton';
import ScrollToTopButton from '@components/scrollToTopButton';

const Home: React.FC = () => {
    const router = useRouter();
    const [isValidated, setIsValidated] = useState(false);
    const [poops, setPoops] = useState([]);

    useEffect(() => {
        setIsValidated(Helper.authorizeUser(router));
    }, [router]);

    useEffect(() => {
        if (isValidated) {
            const fetchProfilePoopsData = async () => {
                try {
                    const response = await ProfileService.getProfilePoops();

                    if (!response.ok) {
                        throw new Error('Failed to fetch profile poops');
                    }

                    const result = await response.json();
                    setPoops(result);
                } catch (error: any) {
                    console.error(error.message);
                }
            };

            fetchProfilePoopsData();
        }
    }, [isValidated]);

    if (!isValidated) {
        return null;
    }
    
    return (
        <>
            <Head>
                <title>Poopedia | Home</title>
            </Head>
            <MainNavigation />
            <main>
                <div className={styles.poopContainer}>
                    {poops.length > 0 ? (
                        poops.map((poop) => <PoopPanel poop={poop} />)
                    ) : (
                        <p>No poops available.</p>
                    )}
                </div>
            </main>
            <AddPoopButton />
            <ScrollToTopButton />
        </>
    );
};

export default Home;
