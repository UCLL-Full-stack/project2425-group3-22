import Link from 'next/link';
import styles from '@styles/MainNavigation.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';
import Helper from 'utils/helper';
import ProfileActionMenu from './ActionMenus/profileActionMenu';

const MainNavigation: React.FC = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [isRendered, setIsRendered] = useState(false);

    const profileButtonRef = useRef<HTMLButtonElement | null>(null);

    useEffect(() => {
        setIsRendered(true);
    }, []);

    const handleProfileButtonClick = () => {
        setShowPopup((prev) => !prev);
    };

    return (
        <div className={styles.mainNavigation}>
            <Link className={styles.logo} href="/">
                Poopedia
            </Link>
            <div className={styles.spacer}></div>
            {isRendered && (
                <button
                    ref={profileButtonRef}
                    className={styles.profileButton}
                    onClick={handleProfileButtonClick}
                >
                    <p className={styles.userIcon}>
                        {Helper.getUsername()?.charAt(0).toUpperCase() || '?'}
                    </p>
                    <FontAwesomeIcon icon={showPopup ? 'angle-down' : 'angle-up'} />
                </button>
            )}

            {showPopup && (
                <ProfileActionMenu
                    profileButtonRef={profileButtonRef}
                    setShowPopup={setShowPopup}
                />
            )}
        </div>
    );
};

export default MainNavigation;
