import { useEffect, useState } from 'react';
import Head from 'next/head';
import styles from '@styles/Login.module.css';
import LoginForm from '@components/loginForm';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import LoginData from '@components/loginData';
import LanguageSelector from '@components/languageSelector';

const Login: React.FC = () => {
    const { t } = useTranslation();
    const [isRendered, setIsRendered] = useState<boolean>(false);

    const [slogan, setSlogan] = useState('');
    const fullSlogan = t('login.slogan');

    useEffect(() => {
        setIsRendered(true);
    }, []);

    useEffect(() => {
        typeSlogan();

        return () => {
            setSlogan('');
        };
    }, []);

    const typeSlogan = async () => {
        for (let i = 0; i < fullSlogan.length; i++) {
            setSlogan((prev) => prev + fullSlogan.charAt(i));
            await new Promise((resolve) => setTimeout(resolve, 40));
        }
    };

    return (
        <>
            <Head>
                <title>{t('title.login')}</title>
            </Head>
            <main>
                {isRendered && (
                    <div className={styles.languageSelectorContainer}>
                        <LanguageSelector />
                    </div>
                )}
                <div className={styles.container}>
                    <div className={styles.titleContainer}>
                        <h1>{t('poopedia')}</h1>
                        <h3>{slogan}</h3>
                    </div>
                    <LoginForm />
                </div>
                <LoginData />
            </main>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { locale } = context;
    return {
        props: {
            ...(await serverSideTranslations(locale ?? 'en', ['common'])),
        },
    };
};

export default Login;
