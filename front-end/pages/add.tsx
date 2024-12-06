import MainNavigation from '@components/mainNavigation';
import SelectPoopColor from '@components/selectPoopColor';
import SelectPoopType from '@components/selectPoopType';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';

const Add: React.FC = () => {
    const router = useRouter();

    const [selectedPage, setSelectedPage] = useState<number>(1);

    const handlePrevious = () => {
        if (selectedPage != 1) {
            setSelectedPage(selectedPage - 1);
        }
    }

    const handleNext = () => {
        if (selectedPage != 2) {
        setSelectedPage(selectedPage + 1);
        }
    }

    return (
        <>
            <Head>
                <title>Poopedia | Add poop</title>
            </Head>
            <MainNavigation />
            <main>
                {selectedPage == 1 &&<SelectPoopType />}
                {selectedPage == 2 &&<SelectPoopColor />}
                <button onClick={handlePrevious}>previous</button>
                <button onClick={handleNext}>next</button>
            </main>
        </>
    );
};

export default Add;
