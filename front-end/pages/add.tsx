import MainNavigation from '@components/mainNavigation';
import SelectPoopColor from '@components/selectPoopColor';
import SelectPoopType from '@components/selectPoopType';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from '@styles/addPoop.module.css';
import Head from 'next/head';
import { useState } from 'react';

const Add: React.FC = () => {
    const [selectedPage, setSelectedPage] = useState<number>(1);

    const handlePrevious = () => {
        if (selectedPage != 1) {
            setSelectedPage(selectedPage - 1);
        }
    };

    const handleNext = () => {
        if (selectedPage != 2) {
            setSelectedPage(selectedPage + 1);
        }
    };

    return (
        <>
            <Head>
                <title>Poopedia | Add poop</title>
            </Head>
            <MainNavigation />
            <main>
                {selectedPage == 1 && <SelectPoopType />}
                {selectedPage == 2 && <SelectPoopColor />}
                <div className={styles.navContainer}>
                    <button onClick={handlePrevious} className={styles.navigationButton}><FontAwesomeIcon icon="angle-left" /></button>
                    <button onClick={handleNext} className={styles.navigationButton}><FontAwesomeIcon icon="angle-right" /></button>
                </div>
            </main>
        </>
    );
};

export default Add;
