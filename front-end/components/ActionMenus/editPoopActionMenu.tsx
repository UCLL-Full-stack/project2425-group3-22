import { useEffect, useRef } from 'react';
import styles from '@styles/actionMenu.module.css';
import PoopService from '@services/poopService';
import Helper from 'utils/helper';
import FriendsService from '@services/friendsService';
import { useTranslation } from 'next-i18next';

type Props = {
    position: { x: number; y: number };
    setShowActionMenu: (show: boolean) => void;
    poopID: number;
    userID: number;
    isOwner: boolean;
};

const EditPoopActionMenu: React.FC<Props> = ({
    position,
    setShowActionMenu,
    poopID,
    userID,
    isOwner,
}: Props) => {
    const { t } = useTranslation();
    const actionMenuRef = useRef<HTMLDivElement | null>(null);

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

    const deletePoop = async () => {
        const isConfirmed = window.confirm('Are you sure you want to delete this poop?');

        if (!isConfirmed) {
            return;
        }

        const response = await PoopService.deletePoop(poopID);

        if (response.ok) {
            window.location.reload();
        } else {
            console.error('Failed to delete poop');
        }
    };

    const removeFriend = async () => {
        const isConfirmed = window.confirm('Are you sure you want to remove this friend?');

        if (!isConfirmed) {
            return;
        }

        const response = await FriendsService.removeFriend(userID);

        if (response.ok) {
            window.location.reload();
        } else {
            console.error('Failed to remove friend');
        }
    };

    return (
        <div
            className={styles.actionMenu}
            ref={actionMenuRef}
            style={{
                left: `${position.x}px`,
                top: `${position.y}px`,
            }}
        >
            {(isOwner || Helper.isModerator()) && <button onClick={deletePoop}>{t('actionMenu.delete')}</button>}
            {!isOwner && <button onClick={removeFriend}>{t('actionMenu.removeFriend')}</button>}
        </div>
    );
};

export default EditPoopActionMenu;
