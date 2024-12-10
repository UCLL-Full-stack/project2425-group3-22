import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import styles from '@styles/actionMenu.module.css';
import Helper from 'utils/helper';

type Props = {
    setShowActionMenu: (show: boolean) => void;
    languageButtonRef: React.RefObject<HTMLButtonElement | null>;
};

const LanguageActionMenu: React.FC<Props> = ({ setShowActionMenu, languageButtonRef }: Props) => {
    const router = useRouter();
    const [position, setPosition] = useState<{ x: number; y: number } | null>(null);

    const actionMenuRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (languageButtonRef.current) {
            const buttonRect = languageButtonRef.current.getBoundingClientRect();
            const actionMenuRect = actionMenuRef.current?.getBoundingClientRect();

            if (actionMenuRect) {
                setPosition({
                    x: buttonRect.right - actionMenuRect.width,
                    y: buttonRect.bottom + 5,
                });
            }
        }
    }, [languageButtonRef]);

    useEffect(() => {
        // Close action menu on scroll or resize
        const handleClose = () => setShowActionMenu(false);

        // when clicking outside the action menu -> close it
        const handleClickOutside = (event: MouseEvent) => {
            if (actionMenuRef.current && !actionMenuRef.current.contains(event.target as Node)) {
                handleClose();
            }
        };

        // Close action menu if clicking outside of it
        window.addEventListener('scroll', handleClose);
        window.addEventListener('resize', handleClose);

        // Add click event listener to handle closing action menu
        setTimeout(() => {
            window.addEventListener('click', handleClickOutside);
        }, 0);

        return () => {
            window.removeEventListener('scroll', handleClose);
            window.removeEventListener('resize', handleClose);
            window.removeEventListener('click', handleClickOutside);
        };
    }, [setShowActionMenu]);

    return (
        <div
            className={styles.actionMenu}
            ref={actionMenuRef}
            style={
                position
                    ? {
                          left: `${position.x}px`,
                          top: `${position.y}px`,
                      }
                    : {}
            }
        >
            <button>NL</button>
            <button>EN</button>
        </div>
    );
};

export default LanguageActionMenu;
