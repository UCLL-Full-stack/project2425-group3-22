import Link from 'next/link';
import { useRouter } from 'next/router';
import { forwardRef, useEffect, useRef, useState } from 'react';
import Helper from 'utils/helper';

type Props = {
    setShowPopup: (show: boolean) => void;
    profileButtonRef: React.RefObject<HTMLButtonElement | null>;
};

const ProfileActionMenu: React.FC<Props> = ({ setShowPopup, profileButtonRef }: Props) => {
    const router = useRouter();
    const [popupPosition, setPopupPosition] = useState<{ x: number; y: number } | null>(null);

    const popupRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (profileButtonRef.current) {
            const buttonRect = profileButtonRef.current.getBoundingClientRect();
            const popupRect = popupRef.current?.getBoundingClientRect();

            if (popupRect) {
                setPopupPosition({
                    x: buttonRect.right - popupRect.width,
                    y: buttonRect.bottom + 5,
                });
            }
        }
    }, [profileButtonRef]);

    useEffect(() => {
        // Close popup on scroll or resize
        const handleClosePopup = () => setShowPopup(false);

        // when clicking outside the popup -> close it
        const handleClickOutsidePopup = (event: MouseEvent) => {
            if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
                setShowPopup(false);
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

    const handleLogout = () => Helper.logout(router);

    return (
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
            <button onClick={handleLogout}>Log out</button>
        </div>
    );
};

export default ProfileActionMenu;
