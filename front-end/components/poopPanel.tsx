import { poopItem } from '@types';
import Link from 'next/link';
import styles from '@styles/poopPanel.module.css';
import { useRouter } from 'next/router';
import mapboxgl from 'mapbox-gl';
import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type Props = {
    poop: poopItem;
};

const PoopPanel: React.FC<Props> = ({ poop }: Props) => {
    const [popupPosition, setPopupPosition] = useState<{ x: number; y: number } | null>(null);
    const [showPopup, setShowPopup] = useState(false);

    const mapContainerRef = useRef<HTMLDivElement | null>(null);
    const popupRef = useRef<HTMLDivElement | null>(null);

    const firstLetter = poop.user.username.charAt(0).toUpperCase();

    useEffect(() => {
        mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOXGL_ACCESS_TOKEN ?? '';

        if (!mapboxgl.accessToken) {
            console.error('Mapbox access token not set');
            return;
        }

        if (mapContainerRef.current) {
            const map = new mapboxgl.Map({
                container: mapContainerRef.current,
                style: 'mapbox://styles/landeriscool/cltul3bhu00fr01p7h0e70gbc',
                center: [poop.longitude, poop.latitude],
                zoom: 10,
                attributionControl: false,
            });

            const marker = new mapboxgl.Marker({ color: 'brown' })
                .setLngLat([poop.longitude, poop.latitude])
                .addTo(map);

            return () => map.remove();
        }
    }, []);

    useEffect(() => {
        // when the popup is shown -> hide it when scrolling or resizing
        const handleClosePopup = () => {
            setShowPopup(false);
        };

        // when clicking outside the popup -> close it
        const handleClickOutsidePopup = (event: MouseEvent) => {
            if (showPopup) {
                if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
                    setShowPopup(false);
                }
            }
        };

        if (showPopup) {
            window.addEventListener('scroll', handleClosePopup);
            window.addEventListener('resize', handleClosePopup);

            // set timeout to prevent the click event from closing the popup immediately
            setTimeout(() => {
                window.addEventListener('click', handleClickOutsidePopup);
            }, 0);
        }

        return () => {
            window.removeEventListener('scroll', handleClosePopup);
            window.removeEventListener('resize', handleClosePopup);
            window.removeEventListener('click', handleClickOutsidePopup);
        };
    }, [showPopup]);

    const handleOptionsClick = (event: React.MouseEvent) => {
        const { clientX, clientY } = event;
        setPopupPosition({ x: clientX, y: clientY });
        setShowPopup(true);
    };

    return (
        <div className={styles.poopItem}>
            <div className={styles.nameContainer}>
                <div className={styles.userIcon}>{firstLetter}</div>
                <div>
                    <p>{poop.user.username}</p>
                    <p>
                        {new Date(poop.dateTime).toLocaleString('en-GB', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                        })}
                    </p>
                </div>
                <button className={styles.optionsButton} onClick={handleOptionsClick}>
                    <FontAwesomeIcon icon="ellipsis-vertical" />
                </button>
            </div>
            <h2>{poop.title}</h2>
            <p>rating: {poop.rating}</p>
            <p>size: {poop.size}</p>
            <p>colorID: {poop.colorID}</p>
            <p>type: {poop.type}</p>
            <div ref={mapContainerRef} className={styles.map}></div>
            {showPopup && popupPosition && (
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
            )}
        </div>
    );
};

export default PoopPanel;
