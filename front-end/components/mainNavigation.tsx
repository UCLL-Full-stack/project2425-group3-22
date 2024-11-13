import { poopItem } from '@types';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '@styles/MainNavigation.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';

type Props = {
    isAdmin: boolean;
};

const MainNavigation: React.FC<Props> = ({ isAdmin }: Props) => {
    const [popupPosition, setPopupPosition] = useState<{ x: number; y: number } | undefined>(
        undefined
    );
    const [showPopup, setShowPopup] = useState(false);

    const profileButtonRef = useRef<HTMLButtonElement | null>(null);
    const popupRef = useRef<HTMLDivElement | null>(null);

    const username = 'Admin'; // TODO: get username instead of hardcoded value
    const firstLetter = username.charAt(0).toUpperCase();

    useEffect(() => {
        // when the popup is shown -> hide it when scrolling or resizing
        const handleClosePopup = () => {
            setShowPopup(false);
        };

        // when clicking outside the popup -> close it
        const handleClickOutsidePopup = (event: MouseEvent) => {
            if (showPopup) {
                if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
                    setShowPopup(false);
                }
            }
        };

        if (showPopup) {
            window.addEventListener('scroll', handleClosePopup);
            window.addEventListener('resize', handleClosePopup);

            setTimeout(() => {
                window.addEventListener('click', handleClickOutsidePopup);
            }, 0);
        }

        return () => {
            window.removeEventListener('scroll', handleClosePopup);
            window.removeEventListener('resize', handleClosePopup);
            window.removeEventListener('click', handleClickOutsidePopup);
        };
    }, [showPopup]);

    const handleProfileButtonClick = (event: React.MouseEvent) => {
        if (profileButtonRef.current) {
            const buttonRect = profileButtonRef.current.getBoundingClientRect();

            setShowPopup(true);

            setTimeout(() => {
                if (popupRef.current) {
                    const popupRect = popupRef.current.getBoundingClientRect();

                    setPopupPosition({
                        x: buttonRect.right - popupRect.width,
                        y: buttonRect.bottom + 5,
                    });
                }
            }, 0);
        }
    };

    return (
        <div className={styles.mainNavigation}>
            <Link className={styles.logo} href="/">
                Poopedia
            </Link>
            <div className={styles.spacer}></div>
            <button
                ref={profileButtonRef}
                className={styles.profileButton}
                onClick={handleProfileButtonClick}
            >
                <p className={styles.userIcon}>{firstLetter}</p>
                <FontAwesomeIcon icon={showPopup ? 'angle-down' : 'angle-up'} />
            </button>

            {showPopup && (
                <div
                    className="popup"
                    ref={popupRef}
                    style={
                        popupPosition
                            ? {
                                  left: `${popupPosition.x}px`,
                                  top: `${popupPosition.y}px`,
                              }
                            : {}
                    }
                >
                    <Link href="/profile" className="popupLink">
                        Profile
                    </Link>
                    <button>Log out</button>
                </div>
            )}
        </div>
    );
};

export default MainNavigation;
