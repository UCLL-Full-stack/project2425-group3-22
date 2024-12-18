import styles from '@styles/Login.module.css';
import { useTranslation } from 'next-i18next';

const LoginData: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div className={styles.loginData}>
            <table>
                <thead>
                    <tr>
                        <th>{t('login.username')}</th>
                        <th>{t('login.password')}</th>
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
    );
};

export default LoginData;
