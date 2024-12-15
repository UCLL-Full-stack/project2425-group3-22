import Link from 'next/link';
import styles from '@styles/MainNavigation.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';
import Helper from 'utils/helper';
import ProfileActionMenu from './ActionMenus/profileActionMenu';
import LanguageActionMenu from './ActionMenus/languageActionMenu';
import { useRouter } from 'next/router';

const MainNavigation: React.FC = () => {
    const router = useRouter();
    const { locale } = router;

    const [showLanguageActionMenu, setShowLanguageActionMenu] = useState<boolean>(false);
    const [showProfileActionMenu, setShowProfileActionMenu] = useState<boolean>(false);
    const [selectedLanguage, setSelectedLanguage] = useState<string>('en');
    const [isRendered, setIsRendered] = useState<boolean>(false);

    const languageButtonRef = useRef<HTMLButtonElement | null>(null);
    const profileButtonRef = useRef<HTMLButtonElement | null>(null);

    useEffect(() => {
        setIsRendered(true);
    }, []);

    useEffect(() => {
        setSelectedLanguage(locale ?? 'en');
    }, [router.locale]);

    const handleLanguageButtonClick = () => {
        setShowLanguageActionMenu((prev) => !prev);
    };

    const handleProfileButtonClick = () => {
        setShowProfileActionMenu((prev) => !prev);
    };

    const handleLanguageChange = (language: string) => {
        const { asPath, pathname, query } = router;
        
        router.push(
            {
                pathname,
                query,
            },
            asPath,
            { locale: language }
        );

        setSelectedLanguage(language);
        setShowLanguageActionMenu(false);
    };

    return (
        <div className={styles.mainNavigation}>
            <Link className={styles.logo} href="/">
                Poopedia
            </Link>
            <div className={styles.spacer}></div>
            {isRendered && (
                <div className={styles.buttonsContainer}>
                    <button
                        ref={languageButtonRef}
                        className={styles.languageButton}
                        onClick={handleLanguageButtonClick}
                    >
                        <span>{selectedLanguage.toUpperCase()}</span>
                        <FontAwesomeIcon
                            icon={showLanguageActionMenu ? 'angle-down' : 'angle-up'}
                        />
                    </button>
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
                </div>
            )}
            {showLanguageActionMenu && (
                <LanguageActionMenu
                    languageButtonRef={languageButtonRef}
                    setShowActionMenu={setShowLanguageActionMenu}
                    onLanguageChange={handleLanguageChange}
                />
            )}
            {showProfileActionMenu && (
                <ProfileActionMenu
                    profileButtonRef={profileButtonRef}
                    setShowActionMenu={setShowProfileActionMenu}
                />
            )}
        </div>
    );
};

export default MainNavigation;
