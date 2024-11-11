import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from '@styles/Login.module.css';
import { FormEvent } from 'react';
import AuthService from '@services/authService';
import { useRouter } from 'next/router';

const Login: React.FC = () => {
    const router = useRouter();

    const [slogan, setSlogan] = useState('');
    const [usernameOrEmail, setUsernameOrEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

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
    
    const login = async (e: FormEvent) => {
        e.preventDefault(); 
        const loginResponse = await AuthService.loginUser({
            usernameOrEmail,
            password
        });

        if (!loginResponse.ok) {
            const errorData = await loginResponse.json();
            setError(errorData.message || "An error occurred. Please try again later.");
        } else {
            const response = await loginResponse.json();
            console.log("Succesfully logged in");
            sessionStorage.setItem('userID', response);
            router.push('/');

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
                    <div>
                        <form onSubmit={login} className={styles.loginForm}>
                            <h2>Login</h2>
                            <input type="text" name="text" placeholder='Username / email' value={usernameOrEmail} onChange={(e) => setUsernameOrEmail(e.target.value)} required />
                            <input type="password" name="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required />
                            <button type="submit">LOGIN</button>
                            {error && <p className={styles.error}>{error}</p>}
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
