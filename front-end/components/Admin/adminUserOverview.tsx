import styles from '@styles/Admin.module.css';
import { userItem } from '@types';

type Props = {
    users: userItem[];
    setSelectedUserID: (UserID: number) => void;
    selectedUserID: number | null;
};

const AdminUserOverview: React.FC<Props> = ({
    users,
    setSelectedUserID,
    selectedUserID,
}: Props) => {
    if (users.length == 0) {
        return <p className={styles.notFound}>No users found</p>;
    }

    return (
        <table className={styles.table}>
            <thead>
                <tr>
                    <th>UserID</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Role</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user: userItem) => (
                    <tr
                        onClick={() => setSelectedUserID(user.userID)}
                        key={user.userID}
                        className={user.userID == selectedUserID ? styles.selected : ''}
                    >
                        <td>{user.userID}</td>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default AdminUserOverview;
