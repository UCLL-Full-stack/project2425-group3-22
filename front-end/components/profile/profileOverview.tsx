import Link from 'next/link';
import styles from '@styles/ProfileOverview.module.css';
import { useRouter } from 'next/router';
import Helper from 'utils/helper';
import { useState } from 'react';
import { Roles } from '@types';

const ProfileOverview: React.FC = () => {
    const router = useRouter();

    const [username, setUsername] = useState<string>(Helper.getUsername() ?? '');
    const [role, setRole] = useState<string>(Helper.getRole() ?? '');

    return (
        <div className={styles.profileOverviewContainer}>
            <div className={styles.userData}>
                <div className={styles.userIcon}>
                    {Helper.getUsername()?.charAt(0).toUpperCase() || '?'}
                </div>
                <p className={styles.username}>
                    <span>@</span>
                    {username}
                </p>
                <button>Edit account</button>
            </div>
            {role != Roles.USER && <p className={styles.role}>Role: {role.toLowerCase()}</p>}
            <div className={styles.friendsContainer}>
                <Link href="/profile/friends">
                    <p>Friends:</p>
                    <p>15</p>
                </Link>
                <button>New Request(s)</button>
            </div>
        </div>
    );
};

export default ProfileOverview;
