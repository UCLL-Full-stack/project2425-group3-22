import { useEffect, useRef } from 'react';
import styles from '@styles/actionMenu.module.css';
import PoopService from '@services/poopService';

type Props = {
    position: { x: number; y: number };
    setShowActionMenu: (show: boolean) => void;
    poopID: number;
};

const EditPoopActionMenu: React.FC<Props> = ({ position, setShowActionMenu, poopID }: Props) => {
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
        try {
            const response = await PoopService.deletePoop(poopID);

            if (!response.ok) {
                throw new Error('Failed to delete poop');
            }

            await response.json();
            window.location.reload();
        } catch (error: any) {
            console.error(error.message);
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
            <button>Edit</button>
            <button onClick={deletePoop}>Delete</button>
            <button>Remove Friend</button>
            <button>Another thing</button>
        </div>
    );
};

export default EditPoopActionMenu;
