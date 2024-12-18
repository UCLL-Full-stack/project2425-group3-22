import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';

const Slogan: React.FC = () => {
    const router = useRouter();

    const { t } = useTranslation();

    const [slogan, setSlogan] = useState('');
    const [fullSlogan, setFullSlogan] = useState(t('login.slogan'));

    useEffect(() => {
        const handleRouteChange = (url: string) => {
            setFullSlogan(t('login.slogan'));
        };

        router.events.on('routeChangeComplete', handleRouteChange);

        return () => {
            router.events.off('routeChangeComplete', handleRouteChange);
        };
    }, [router.events]);

    useEffect(() => {
        const typeSlogan = async () => {
            for (let i = 0; i < fullSlogan.length; i++) {
                setSlogan((prev) => prev + fullSlogan.charAt(i));
                await new Promise((resolve) => setTimeout(resolve, 30));
            }
        };

        typeSlogan();

        return () => {
            setSlogan('');
        };
    }, [fullSlogan]);

    return <h3>{slogan}</h3>;
};

export default Slogan;
