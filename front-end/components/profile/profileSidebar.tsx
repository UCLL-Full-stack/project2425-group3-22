import Link from 'next/link';
import styles from "@styles/ProfileSidebar.module.css";
import { useRouter } from 'next/router';

const ProfileSidebar: React.FC = () => {
    const router = useRouter();

    return (
        <nav className={styles.sidebar}>
            <Link href="/profile" className={`${styles.sidebarItem} ${router.pathname === '/profile' ? styles.active : ''}`}>Profile</Link>
            <Link href="/profile/activity" className={`${styles.sidebarItem} ${router.pathname === '/profile/activity' ? styles.active : ''}`}>Activity</Link>
            <Link href="/profile/statistics" className={`${styles.sidebarItem} ${router.pathname === '/profile/statistics' ? styles.active : ''}`}>Statistics</Link>
            <Link href="/profile/map" className={`${styles.sidebarItem} ${router.pathname === '/profile/map' ? styles.active : ''}`}>Map</Link>
        </nav>
    );
};

export default ProfileSidebar;
