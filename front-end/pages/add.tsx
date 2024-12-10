import MainNavigation from '@components/mainNavigation';
import SelectPoopColor from '@components/AddPoop/selectPoopColor';
import SelectPoopType from '@components/AddPoop/selectPoopType';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from '@styles/addPoop.module.css';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Helper from 'utils/helper';
import SelectPoopData from '@components/AddPoop/selectPoopData';
import SelectPoopLocation from '@components/AddPoop/selectPoopLocation';

const Add: React.FC = () => {
    const router = useRouter();

    const pageAmount = 4; // Number of pages

    const [selectedPage, setSelectedPage] = useState<number>(1);
    const [selectedPoopType, setSelectedPoopType] = useState<number | null>(null)
    const [selectedPoopColorID, setSelectedPoopColorID] = useState<number | null>(null);
    const [selectedPoopLocation, setSelectedPoopLocation] = useState<{ lat: number; lng: number } | null>(null);
    const [isValidated, setIsValidated] = useState(false);

    useEffect(() => {
        if (selectedPoopLocation) {
            console.log(selectedPoopLocation);
        }
    }, [selectedPoopLocation]);

    useEffect(() => {
        setIsValidated(Helper.authorizeUser(router));
    }, [router]);

    const handlePrevious = () => {
        if (selectedPage != 1) {
            setSelectedPage(selectedPage - 1);
        }
    };

    const handleNext = () => {
        if (selectedPage != pageAmount) {
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
                {selectedPage == 2 && <SelectPoopColor poopColorChanged={setSelectedPoopColorID} selectedPoopColorID={selectedPoopColorID} />}
                {selectedPage == 3 && <SelectPoopLocation poopLocationChanged={setSelectedPoopLocation} selectedPoopLocation={selectedPoopLocation} />}
                {selectedPage == 4 && <SelectPoopData selectedPoopType={selectedPoopType} selectedPoopColorID={selectedPoopColorID} selectedPoopLocation={selectedPoopLocation} />}
                <div className={styles.navContainer}>
                    <button onClick={handlePrevious} className={styles.navigationButton}><FontAwesomeIcon icon="angle-left" /></button>
                    <button onClick={handleNext} className={styles.navigationButton}><FontAwesomeIcon icon="angle-right" /></button>
                </div>
            </main>
        </>
    );
};

export default Add;
