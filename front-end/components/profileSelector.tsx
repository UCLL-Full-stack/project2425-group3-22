import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef, useState } from 'react';
import styles from '@styles/ProfileSelector.module.css';
import ProfileActionMenu from './ActionMenus/profileActionMenu';
import Helper from 'utils/helper';

const ProfileSelector: React.FC = () => {
    const [showProfileActionMenu, setShowProfileActionMenu] = useState<boolean>(false);    
    const profileButtonRef = useRef<HTMLButtonElement | null>(null);

    const handleProfileButtonClick = () => {
        setShowProfileActionMenu((prev) => !prev);
    };

    return (
        <>
            <button
                ref={profileButtonRef}
                className={styles.profileButton}
                onClick={handleProfileButtonClick}
            >
                <p className={styles.userIcon}>
                    {Helper.getUsername()?.charAt(0).toUpperCase() || '?'}
                </p>
                <FontAwesomeIcon icon={showProfileActionMenu ? 'angle-down' : 'angle-up'} />
            </button>
            {showProfileActionMenu && (
                <ProfileActionMenu
                    profileButtonRef={profileButtonRef}
                    setShowActionMenu={setShowProfileActionMenu}
                />
            )}
        </>
    );
};

export default ProfileSelector;
