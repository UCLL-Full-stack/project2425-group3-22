import Link from 'next/link';
import { FormEvent, useState } from 'react';
import styles from '@styles/Register.module.css';
import { useRouter } from 'next/router';
import Helper from 'utils/helper';
import AuthService from '@services/authService';

const RegisterForm: React.FC = () => {
    const router = useRouter();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const register = async (e: FormEvent) => {
        e.preventDefault(); 
        const registerResponse = await AuthService.registerUser({
            username,
            email,
            password
        });

        if (!registerResponse.ok) {
            const errorData = await registerResponse.json();
            setError(errorData.message || "An error occurred. Please try again later.");
        } else {
            const response = await registerResponse.json();
            Helper.login(router, response)
        }
    };
    return (
        <div className={styles.container}>
            <h1>Poopedia</h1>
            <form onSubmit={register} className={styles.registerForm}>
                <h2>Register</h2>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">REGISTER</button>
                {error && <p className={styles.error}>{error}</p>}
                <p>
                    Already have an account? <Link href="/login">Login here</Link>
                </p>
            </form>
        </div>
    );
};

export default RegisterForm;
