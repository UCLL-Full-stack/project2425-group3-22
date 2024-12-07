import { useEffect, useRef } from 'react';

type Props = {
    popupPosition: { x: number; y: number };
    setShowPopup: (show: boolean) => void;
};

const EditPoopActionMenu: React.FC<Props> = ({ popupPosition, setShowPopup }: Props) => {
    const popupRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        // Close popup on scroll or resize
        const handleClosePopup = () => setShowPopup(false);

        // when clicking outside the popup -> close it
        const handleClickOutsidePopup = (event: MouseEvent) => {
            if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
                handleClosePopup();
            }
        };

        // Close popup if clicking outside of it
        window.addEventListener('scroll', handleClosePopup);
        window.addEventListener('resize', handleClosePopup);

        // Add click event listener to handle closing popup
        setTimeout(() => {
            window.addEventListener('click', handleClickOutsidePopup);
        }, 0);

        return () => {
            window.removeEventListener('scroll', handleClosePopup);
            window.removeEventListener('resize', handleClosePopup);
            window.removeEventListener('click', handleClickOutsidePopup);
        };
    }, [setShowPopup]);

    return (
        <div
            className="popup"
            ref={popupRef}
            style={{
                left: `${popupPosition.x}px`,
                top: `${popupPosition.y}px`,
            }}
        >
            <button>Edit</button>
            <button>Delete</button>
            <button>Remove Friend</button>
            <button>Another thing</button>
        </div>
    );
};

export default EditPoopActionMenu;
