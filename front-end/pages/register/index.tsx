import Head from 'next/head';
import Link from 'next/link';
import styles from '@styles/Register.module.css';
import { FormEvent } from 'react';

const Register: React.FC = () => {
    const register = (e: FormEvent) => {
        e.preventDefault();
        // Add your login logic here
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
                        <input type="text" name="username" placeholder="Username" required />
                        <input type="email" name="email" placeholder="Email" required />
                        <input type="password" name="password" placeholder="Password" required />
                        <button type="submit">REGISTER</button>
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
