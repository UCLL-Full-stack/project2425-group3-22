import Link from 'next/link';
import styles from '@styles/MainNavigation.module.css';
import { useEffect, useRef, useState } from 'react';
import LanguageSelector from './languageSelector';
import ProfileSelector from './profileSelector';

const MainNavigation: React.FC = () => {
    const [isRendered, setIsRendered] = useState<boolean>(false);

    useEffect(() => {
        setIsRendered(true);
    }, []);

    return (
        <div className={styles.mainNavigation}>
            <Link className={styles.logo} href="/">
                Poopedia
            </Link>
            <div className={styles.spacer}></div>
            {isRendered && (
                <div className={styles.buttonsContainer}>
                    <LanguageSelector />
                    <ProfileSelector />
                </div>
            )}
        </div>
    );
};

export default MainNavigation;
