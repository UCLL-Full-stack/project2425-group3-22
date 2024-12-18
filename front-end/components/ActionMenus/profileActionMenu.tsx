import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import styles from '@styles/actionMenu.module.css';
import Helper from 'utils/helper';

type Props = {
    setShowActionMenu: (show: boolean) => void;
    profileButtonRef: React.RefObject<HTMLButtonElement | null>;
};

const ProfileActionMenu: React.FC<Props> = ({ setShowActionMenu, profileButtonRef }: Props) => {
    const router = useRouter();
    const [position, setPosition] = useState<{ x: number; y: number } | null>(null);

    const actionMenuRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (profileButtonRef.current) {
            const buttonRect = profileButtonRef.current.getBoundingClientRect();
            const actionMenuRect = actionMenuRef.current?.getBoundingClientRect();

            if (actionMenuRect) {
                setPosition({
                    x: buttonRect.right - actionMenuRect.width,
                    y: buttonRect.bottom + 5,
                });
            }
        }
    }, [profileButtonRef]);

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

    const handleLogout = () => Helper.logout(router);

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
            {Helper.isAdmin() && (
                <Link href="/admin" className={styles.actionMenuLink}>
                    Admin
                </Link>
            )}
            <Link href="/profile" className={styles.actionMenuLink}>
                Profile
            </Link>
            <button onClick={handleLogout}>Log out</button>
        </div>
    );
};

export default ProfileActionMenu;
