import Link from 'next/link';
import styles from "@styles/ProfileSidebar.module.css";
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

const ProfileSidebar: React.FC = () => {
    const { t } = useTranslation();
    const router = useRouter();

    return (
        <nav className={styles.sidebar}>
            <Link href="/profile" className={`${styles.sidebarItem} ${router.pathname === '/profile' ? styles.active : ''}`}>{t('profile.profile')}</Link>
            <Link href="/profile/activity" className={`${styles.sidebarItem} ${router.pathname === '/profile/activity' ? styles.active : ''}`}>{t('profile.activity')}</Link>
            <Link href="/profile/map" className={`${styles.sidebarItem} ${router.pathname === '/profile/map' ? styles.active : ''}`}>{t('profile.map')}</Link>
        </nav>
    );
};

export default ProfileSidebar;
