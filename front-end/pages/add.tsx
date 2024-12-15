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
import PoopService from '@services/poopService';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

const Add: React.FC = () => {
    const router = useRouter();
    const { t } = useTranslation(); 

    const pageAmount = 4; // Number of pages

    const [selectedPage, setSelectedPage] = useState<number>(1);
    const [selectedPoopType, setSelectedPoopType] = useState<number>(0);
    const [selectedPoopColorID, setSelectedPoopColorID] = useState<number | null>(null);
    const [selectedPoopLocation, setSelectedPoopLocation] = useState<{
        lat: number;
        lng: number;
    } | null>(null);
    const [selectedPoopTitle, setSelectedPoopTitle] = useState<string>('');
    const [selectedPoopRating, setSelectedPoopRating] = useState<number>(0);
    const [selectedPoopSize, setSelectedPoopSize] = useState<number>(50);
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
        if (selectedPage != pageAmount) {
            setSelectedPage(selectedPage + 1);
        }
    };

    const saveHandler = async () => {
        const response = await PoopService.createPoop({
            type: selectedPoopType,
            colorID: selectedPoopColorID,
            latitude: selectedPoopLocation?.lat ?? null,
            longitude: selectedPoopLocation?.lng ?? null,
            title: selectedPoopTitle,
            rating: selectedPoopRating,
            size: selectedPoopSize,
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            console.error('Failed to create poop:', errorMessage);
        } else {
            const responseData = await response.json();
            console.log('Poop created successfully:', responseData);
            router.replace('/');
        }
    };

    if (!isValidated) {
        return null;
    }

    return (
        <>
            <Head>
                <title>{t("title.add")}</title>
            </Head>
            <MainNavigation />
            <main>
                {selectedPage == 1 && (
                    <SelectPoopType
                        poopTypeChanged={setSelectedPoopType}
                        selectedPoopType={selectedPoopType}
                    />
                )}
                {selectedPage == 2 && (
                    <SelectPoopColor
                        poopColorChanged={setSelectedPoopColorID}
                        selectedPoopColorID={selectedPoopColorID}
                    />
                )}
                {selectedPage == 3 && (
                    <SelectPoopLocation
                        poopLocationChanged={setSelectedPoopLocation}
                        selectedPoopLocation={selectedPoopLocation}
                    />
                )}
                {selectedPage == 4 && (
                    <SelectPoopData
                        selectedPoopType={selectedPoopType}
                        selectedPoopColorID={selectedPoopColorID}
                        selectedPoopLocation={selectedPoopLocation}
                        selectedPoopTitle={selectedPoopTitle}
                        onTitleChange={setSelectedPoopTitle}
                        selectedPoopRating={selectedPoopRating}
                        onRatingChange={setSelectedPoopRating}
                        selectedPoopSize={selectedPoopSize}
                        onSizeChange={setSelectedPoopSize}
                        onSave={saveHandler}
                    />
                )}
                <div className={styles.navContainer}>
                    <button onClick={handlePrevious} className={styles.navigationButton}>
                        <FontAwesomeIcon icon="angle-left" />
                    </button>
                    <button onClick={handleNext} className={styles.navigationButton}>
                        <FontAwesomeIcon icon="angle-right" />
                    </button>
                </div>
            </main>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { locale } = context;
    return {
        props: {
            ...(await serverSideTranslations(locale ?? "en", ["common"])),
        },
    };
};

export default Add;
