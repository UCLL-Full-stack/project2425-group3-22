import Head from 'next/head';
import RegisterForm from '@components/registerForm';
import styles from '@styles/Register.module.css';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import LanguageSelector from '@components/languageSelector';
import { useEffect, useState } from 'react';

const Register: React.FC = () => {
    const { t } = useTranslation();
    const [isRendered, setIsRendered] = useState<boolean>(false);

    useEffect(() => {
        setIsRendered(true);
    }, []);

    return (
        <>
            <Head>
                <title>{t('title.register')}</title>
            </Head>
            <main>
                {isRendered && (
                    <div className={styles.languageSelectorContainer}>
                        <LanguageSelector />
                    </div>
                )}
                <RegisterForm />
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

export default Register;
