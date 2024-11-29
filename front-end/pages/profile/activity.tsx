import MainNavigation from '@components/mainNavigation';
import ProfileSidebar from '@components/profile/profileSidebar';
import Head from 'next/head';
import styles from '@styles/Home.module.css';
import { useEffect, useState } from 'react';
import ProfileService from '@services/profileService';
import PoopPanel from '@components/poopPanel';
import AddPoopButton from '@components/addPoopButton';
import ScrollToTopButton from '@components/scrollToTopButton';

const Activity: React.FC = () => {
    const [poops, setPoops] = useState([]);

    useEffect(() => {
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
    }, []);

    return (
        <>
            <Head>
                <title>Poopedia | Profile - Activity</title>
            </Head>
            <MainNavigation />
            <main>
                <ProfileSidebar />
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

export default Activity;
