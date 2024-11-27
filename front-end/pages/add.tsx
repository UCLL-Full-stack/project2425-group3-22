import MainNavigation from '@components/mainNavigation';
import SelectPoopType from '@components/selectPoopType';
import Head from 'next/head';
import { useRouter } from 'next/router';

const Add: React.FC = () => {
    const router = useRouter();

    return (
        <>
            <Head>
                <title>Add</title>
            </Head>
            <MainNavigation />
            <main>
                <SelectPoopType />
            </main>
        </>
    );
};

export default Add;
