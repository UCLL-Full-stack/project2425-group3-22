import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from '@styles/Login.module.css';
import { FormEvent } from 'react';

const Login: React.FC = () => {
    const [slogan, setSlogan] = useState('');
    const fullSlogan = "Because every poop tells a story.";

    useEffect(() => {
        const typeSlogan = async () => {
            for (let i = 0; i < fullSlogan.length; i++) {
                setSlogan((prev) => prev + fullSlogan.charAt(i));
                await new Promise((resolve) => setTimeout(resolve, 40));
            }
        };

        typeSlogan();

        return () => {
            setSlogan('');
        };
    }, []);
    
    const login = (e: FormEvent) => {
        e.preventDefault();
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
                    <div>
                        <form onSubmit={login} className={styles.loginForm}>
                            <h2>Login</h2>
                            <input type="email" name="email" placeholder='Email' required />
                            <input type="password" name="password" placeholder='Password' required />
                            <button type="submit">LOGIN</button>
                            <p>
                                Don't have an account? <Link href="/register">Register here</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </main>
        </>
    );
};

export default Login;