import Link from 'next/link';
import styles from '@styles/ProfileOverview.module.css';
import Helper from 'utils/helper';
import { Roles } from '@types';
import { useTranslation } from 'next-i18next';

const ProfileOverview: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div className={styles.profileOverviewContainer}>
            <div className={styles.userData}>
                <div className={styles.userIcon}>
                    {Helper.getUsername()?.charAt(0).toUpperCase() || '?'}
                </div>
                <p className={styles.username}>
                    <span>@</span>
                    {Helper.getUsername()}
                </p>
            </div>
            {Helper.getRole() != Roles.USER && <p className={styles.role}>{t('profile.role')}: {Helper.getRole()?.toLowerCase()}</p>}
            <div className={styles.friendsContainer}>
                <Link href="/profile/friends" className={styles.friendsButton}>
                    <p>{t('profile.friends')}:</p>
                    <p>15</p>
                </Link>
                <button>{t('profile.newRequests')}</button>
            </div>
        </div>
    );
};

export default ProfileOverview;
