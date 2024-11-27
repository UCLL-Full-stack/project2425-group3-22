import Link from 'next/link';
import { FormEvent, useState } from 'react';
import styles from '@styles/Login.module.css';
import { useRouter } from 'next/router';
import Helper from 'utils/helper';
import AuthService from '@services/authService';


const LoginForm: React.FC = () => {
    const router = useRouter();

    const [usernameOrEmail, setUsernameOrEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

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
            Helper.login(router, response)
        }
    };

    return (
        <div>
            <form onSubmit={login} className={styles.loginForm}>
                <h2>Login</h2>
                <input
                    type="text"
                    name="text"
                    placeholder="Username / email"
                    value={usernameOrEmail}
                    onChange={(e) => setUsernameOrEmail(e.target.value)}
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
                <button type="submit">LOGIN</button>
                {error && <p className={styles.error}>{error}</p>}
                <p>
                    Don't have an account? <Link href="/register">Register here</Link>
                </p>
            </form>
        </div>
    );
};

export default LoginForm;
