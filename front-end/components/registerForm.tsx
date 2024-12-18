import Link from 'next/link';
import { FormEvent, useState } from 'react';
import styles from '@styles/Register.module.css';
import { useRouter } from 'next/router';
import Helper from 'utils/helper';
import AuthService from '@services/authService';
import { useTranslation } from 'next-i18next';

const RegisterForm: React.FC = () => {
    const { t } = useTranslation();

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
            <h1>{t('poopedia')}</h1>
            <form onSubmit={register} className={styles.registerForm}>
                <h2>{t('register.register')}</h2>
                <input
                    type="text"
                    name="username"
                    placeholder={t('register.username')}
                    value={username}
                    onChange={(e) => setUsername(e.target.value.trim())}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder={t('register.email')}
                    value={email}
                    onChange={(e) => setEmail(e.target.value.trim())}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder={t('register.password')}
                    value={password}
                    onChange={(e) => setPassword(e.target.value.trim())}
                    required
                />
                <button type="submit">{t('register.register').toUpperCase()}</button>
                {error && <p className={styles.error}>{error}</p>}
                <p>
                {t('register.alreadyHaveAccount')} <Link href="/login">{t('register.loginHere')}</Link>
                </p>
            </form>
        </div>
    );
};

export default RegisterForm;
