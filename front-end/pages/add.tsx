import MainNavigation from '@components/mainNavigation';
import SelectPoopColor from '@components/selectPoopColor';
import SelectPoopType from '@components/selectPoopType';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from '@styles/addPoop.module.css';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Helper from 'utils/helper';

const Add: React.FC = () => {
    const router = useRouter();

    const [selectedPage, setSelectedPage] = useState<number>(1);
    const [selectedPoopType, setSelectedPoopType] = useState<number | null>(null)
    const [selectedPoopColor, setSelectedPoopColor] = useState<number | null>(null);
    const [isValidated, setIsValidated] = useState(false);

    useEffect(() => {
        setIsValidated(Helper.authorizeUser(router));
    }, [router]);

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

    if (!isValidated) {
        return null;
    }

    return (
        <>
            <Head>
                <title>Poopedia | Add poop</title>
            </Head>
            <MainNavigation />
            <main>
                {selectedPage == 1 && <SelectPoopType poopTypeChanged={setSelectedPoopType} selectedPoopType={selectedPoopType} />}
                {selectedPage == 2 && <SelectPoopColor poopColorChanged={setSelectedPoopColor} selectedPoopColorID={selectedPoopColor} />}
                <div className={styles.navContainer}>
                    <button onClick={handlePrevious} className={styles.navigationButton}><FontAwesomeIcon icon="angle-left" /></button>
                    <button onClick={handleNext} className={styles.navigationButton}><FontAwesomeIcon icon="angle-right" /></button>
                </div>
            </main>
        </>
    );
};

export default Add;
