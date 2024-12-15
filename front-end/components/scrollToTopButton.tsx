import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import styles from '@styles/ScrollToTopButton.module.css';

const ScrollToTopButton: React.FC = () => {
    const [isAtTop, setIsAtTop] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            setIsAtTop(window.scrollY === 0);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <button
            className={`${styles.scrollToTopButton} ${isAtTop ? styles.hidden : ''}`}
            onClick={scrollToTop}
        >
            <FontAwesomeIcon icon="angle-up" />
        </button>
    );
};

export default ScrollToTopButton;
