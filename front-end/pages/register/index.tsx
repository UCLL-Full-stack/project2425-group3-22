import Head from 'next/head';
import Link from 'next/link';
import styles from '@styles/Register.module.css';
import { FormEvent, useState } from 'react';
import AuthService from '@services/authService';

const Register: React.FC = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const register = async (e: FormEvent) => {
        e.preventDefault(); 
        const loginResponse = await AuthService.registerUser({
            username,
            email,
            password
        });

        if (!loginResponse.ok) {
            const errorData = await loginResponse.json();
            setError(errorData.message || "An error occurred. Please try again later.");
        } else {
            const response = await loginResponse.json();
            console.log("Succesfully registered");
            console.log(response)
        }
    };

    return (
        <>
            <Head>
                <title>Register</title>
            </Head>
            <main>
                <div className={styles.container}>
                    <h1>Poopedia</h1>
                    <form onSubmit={register} className={styles.registerForm}>
                        <h2>Register</h2>
                        <input type="text" name="username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                        <input type="email" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        <input type="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        <button type="submit">REGISTER</button>
                        {error && <p className={styles.error}>{error}</p>}
                        <p>
                            Already have an account? <Link href="/login">Login here</Link>
                        </p>
                    </form>
                </div>
            </main>
        </>
    );
};

export default Register;
