import styles from '@styles/Login.module.css';

const LoginData: React.FC = () => {
    return (
        <div className={styles.loginData}>
            <table>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Password</th>
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
