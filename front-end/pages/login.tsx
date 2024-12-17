import { useEffect, useState } from 'react';
import Head from 'next/head';
import styles from '@styles/Login.module.css';
import LoginForm from '@components/loginForm';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

const Login: React.FC = () => {
    const { t } = useTranslation();

    const [slogan, setSlogan] = useState('');
    const fullSlogan = 'Because every poop tells a story.';

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
                <div className={styles.container}>
                    <div className={styles.titleContainer}>
                        <h1>Poopedia</h1>
                        <h3>{slogan}</h3>
                    </div>
                    <LoginForm />
                </div>
                <div className={styles.loginData}>
                    <table>
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Password</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Admin</td>
                                <td>Admin!123</td>
                            </tr>
                            <tr>
                                <td>Moderator</td>
                                <td>Moderator!123</td>
                            </tr>
                            <tr>
                                <td>User1</td>
                                <td>User1!123</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
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
