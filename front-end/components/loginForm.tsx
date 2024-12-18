import Link from 'next/link';
import { FormEvent, useState } from 'react';
import styles from '@styles/Login.module.css';
import { useRouter } from 'next/router';
import Helper from 'utils/helper';
import AuthService from '@services/authService';
import { useTranslation } from 'next-i18next';


const LoginForm: React.FC = () => {
    const { t } = useTranslation();
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
                <h2>{t('login.login')}</h2>
                <input
                    type="text"
                    name="text"
                    placeholder={t('login.usernameOrEmail')}
                    value={usernameOrEmail}
                    onChange={(e) => setUsernameOrEmail(e.target.value.trim())}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder={t('login.password')}
                    value={password}
                    onChange={(e) => setPassword(e.target.value.trim())}
                    required
                />
                <button type="submit">{t('login.login').toUpperCase()}</button>
                {error && <p className={styles.error}>{error}</p>}
                <p>
                {t('login.dontHaveAccount')} <Link href="/register">{t('login.registerHere')}</Link>
                </p>
            </form>
        </div>
    );
};

export default LoginForm;
