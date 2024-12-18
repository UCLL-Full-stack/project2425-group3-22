import LanguageActionMenu from '@components/ActionMenus/languageActionMenu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from '@styles/LanguageSelector.module.css';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

const LanguageSelector: React.FC = () => {
    const router = useRouter();
    const { locale } = router;

    const [showLanguageActionMenu, setShowLanguageActionMenu] = useState<boolean>(false);
    const [selectedLanguage, setSelectedLanguage] = useState<string>('en');

    const languageButtonRef = useRef<HTMLButtonElement | null>(null);

    useEffect(() => {
        setSelectedLanguage(locale ?? 'en');
    }, [router.locale]);

    const handleLanguageButtonClick = () => {
        setShowLanguageActionMenu((prev) => !prev);
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
        <>
            <button
                ref={languageButtonRef}
                className={styles.languageButton}
                onClick={handleLanguageButtonClick}
            >
                <span>{selectedLanguage.toUpperCase()}</span>
                <FontAwesomeIcon icon={showLanguageActionMenu ? 'angle-down' : 'angle-up'} />
            </button>
            {showLanguageActionMenu && (
                <LanguageActionMenu
                    languageButtonRef={languageButtonRef}
                    setShowActionMenu={setShowLanguageActionMenu}
                    onLanguageChange={handleLanguageChange}
                />
            )}
        </>
    );
};

export default LanguageSelector;
