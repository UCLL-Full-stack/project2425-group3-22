import { useEffect, useState } from 'react';
import Head from 'next/head';
import styles from '@styles/Login.module.css';
import { FormEvent } from 'react';
import AuthService from '@services/authService';
import { useRouter } from 'next/router';
import Helper from 'utils/helper';
import LoginForm from '@components/loginForm';

const Login: React.FC = () => {
    const [slogan, setSlogan] = useState('');
    const fullSlogan = "Because every poop tells a story.";

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
                <title>Login</title>
            </Head>
            <main>
                <div className={styles.container}>
                    <div className={styles.titleContainer}>
                        <h1>Poopedia</h1>
                        <h3>{slogan}</h3>
                    </div>
                    <LoginForm />
                </div>
            </main>
        </>
    );
};

export default Login;
